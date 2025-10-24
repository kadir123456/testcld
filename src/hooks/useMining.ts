// src/hooks/useMining.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { ref, set, get, onValue, push, update } from 'firebase/database';
import { database } from '../config/firebase';
import { MiningSession, Coin, Package } from '../types';
import { useAuth } from './useAuth';
import { calculateMiningEarnings, calculateHashRate, canUserMine } from '../utils/miningCalculations';
import toast from 'react-hot-toast';

// Paket tanımlamaları
const packages: Record<string, Package> = {
  starter: {
    id: 'starter',
    name: 'Başlangıç',
    price: 49,
    duration: 90,
    hashRate: 61920, // 61.92 TH/s
    dailyEarning: 1.75,
    weeklyWithdrawal: true,
    description: 'Yeni başlayanlar için'
  },
  professional: {
    id: 'professional',
    name: 'Profesyonel',
    price: 199,
    duration: 90,
    hashRate: 187010, // 187.01 TH/s
    dailyEarning: 7.13,
    weeklyWithdrawal: true,
    description: 'Ciddi madenciler için',
    popular: true
  },
  enterprise: {
    id: 'enterprise',
    name: 'Kurumsal',
    price: 299,
    duration: 90,
    hashRate: 312100, // 312.10 TH/s
    dailyEarning: 10.71,
    weeklyWithdrawal: true,
    description: 'Maksimum kazanç'
  }
};

export const useMining = () => {
  const { user, updateUserData } = useAuth();
  const [activeSessions, setActiveSessions] = useState<MiningSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const earningsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const lastBalanceRef = useRef<number>(0);

  const coins: Coin[] = [
    { 
      id: 'btc', 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      icon: '₿', 
      baseHashRate: 1000, 
      baseEarning: 0.01157, // Trial için saatlik kazanç (90 günde $25: $25÷90÷24 = $0.01157/saat)
      color: '#F7931A',
      description: 'The first and most valuable cryptocurrency',
      marketCap: '$1.2T',
      dailyVolume: '$15B'
    },
    { 
      id: 'eth', 
      name: 'Ethereum', 
      symbol: 'ETH', 
      icon: 'Ξ', 
      baseHashRate: 1000, 
      baseEarning: 0.01157, // 90 günde $25
      color: '#627EEA',
      description: 'Smart contract platform and DeFi leader',
      marketCap: '$400B',
      dailyVolume: '$8B'
    },
    { 
      id: 'doge', 
      name: 'Dogecoin', 
      symbol: 'DOGE', 
      icon: 'Ð', 
      baseHashRate: 1000, 
      baseEarning: 0.01157, // 90 günde $25
      color: '#C2A633',
      description: 'The meme coin that became mainstream',
      marketCap: '$25B',
      dailyVolume: '$800M'
    },
    { 
      id: 'ltc', 
      name: 'Litecoin', 
      symbol: 'LTC', 
      icon: 'Ł', 
      baseHashRate: 1000, 
      baseEarning: 0.01157, // 90 günde $25
      color: '#BFBBBB',
      description: 'Digital silver to Bitcoin\'s gold',
      marketCap: '$8B',
      dailyVolume: '$400M'
    },
    {
      id: 'ada',
      name: 'Cardano',
      symbol: 'ADA',
      icon: '₳',
      baseHashRate: 1000,
      baseEarning: 0.01157, // 90 günde $25
      color: '#0033AD',
      description: 'Sustainable blockchain platform',
      marketCap: '$15B',
      dailyVolume: '$300M'
    },
    {
      id: 'dot',
      name: 'Polkadot',
      symbol: 'DOT',
      icon: '●',
      baseHashRate: 1000,
      baseEarning: 0.01157, // 90 günde $25
      color: '#E6007A',
      description: 'Multi-chain interoperability protocol',
      marketCap: '$12B',
      dailyVolume: '$250M'
    },
    {
      id: 'sol',
      name: 'Solana',
      symbol: 'SOL',
      icon: '◎',
      baseHashRate: 1000,
      baseEarning: 0.01157, // 90 günde $25
      color: '#9945FF',
      description: 'High-performance blockchain',
      marketCap: '$45B',
      dailyVolume: '$1.2B'
    },
    {
      id: 'matic',
      name: 'Polygon',
      symbol: 'MATIC',
      icon: '⬟',
      baseHashRate: 1000,
      baseEarning: 0.01157, // 90 günde $25
      color: '#8247E5',
      description: 'Ethereum scaling solution',
      marketCap: '$8B',
      dailyVolume: '$200M'
    }
  ];

  // Load mining sessions
  useEffect(() => {
    if (!user) return;

    const sessionsRef = ref(database, `miningSessions/${user.uid}`);
    const unsubscribe = onValue(sessionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const sessions = Object.entries(snapshot.val()).map(([key, value]: [string, any]) => ({
          id: key,
          ...value
        }));
        const activeSessions = sessions.filter(s => s.isActive);
        
        // Birden fazla aktif session varsa sadece en yeniyi bırak
        if (activeSessions.length > 1) {
          const sortedSessions = activeSessions.sort((a, b) => 
            new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
          );
          
          // En yeni hariç diğerlerini kapat
          for (let i = 1; i < sortedSessions.length; i++) {
            const session = sortedSessions[i];
            set(ref(database, `miningSessions/${user.uid}/${session.id}`), {
              ...session,
              isActive: false,
              endTime: new Date().toISOString(),
              autoStopped: true,
              stopReason: 'Duplicate session'
            });
          }
          
          setActiveSessions([sortedSessions[0]]);
        } else {
          setActiveSessions(activeSessions);
        }
      } else {
        setActiveSessions([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Kazanç güncelleme mantığı - 24 SAAT LİMİTİ KALDIRILDI
  useEffect(() => {
    if (!user || activeSessions.length === 0) {
      if (earningsIntervalRef.current) {
        clearInterval(earningsIntervalRef.current);
        earningsIntervalRef.current = null;
      }
      return;
    }

    // Kullanıcının mevcut bakiyesini kaydet
    lastBalanceRef.current = user.balance || 0;

    const updateEarnings = async () => {
      const activeSession = activeSessions[0];
      if (!activeSession || !activeSession.isActive) return;

      const now = Date.now();
      
      // Son güncelleme kontrolü - minimum 5 saniye
      if (lastUpdateTimeRef.current > 0 && (now - lastUpdateTimeRef.current) < 5000) {
        return;
      }

      try {
        const coin = coins.find(c => c.id === activeSession.coin);
        if (!coin) return;

        const sessionStartTime = new Date(activeSession.startTime).getTime();
        const elapsedSeconds = (now - sessionStartTime) / 1000;
        const elapsedHours = elapsedSeconds / 3600;

        // ❌ 24 SAAT KONTROLÜ KALDIRILDI - Sınırsız madencilik!
        // Artık madencilik sadece kullanıcı durdurduğunda veya trial/paket limitlerine ulaşıldığında duracak

        // Saatlik kazanç hesaplama
        let hourlyEarning = coin.baseEarning; // Varsayılan trial kazancı
        
        if (user.activePackage && packages[user.activePackage]) {
          const userPackage = packages[user.activePackage];
          // Paket günlük kazancını saatlik kazanca çevir
          hourlyEarning = userPackage.dailyEarning / 24;
        }

        // Toplam kazanç = saatlik kazanç * geçen saat
        const totalEarnings = parseFloat((hourlyEarning * elapsedHours).toFixed(6));
        
        // Session'daki önceki kazançtan düşük olamaz
        if (totalEarnings < activeSession.totalEarned) {
          console.warn('Earnings cannot decrease');
          return;
        }

        // Yeni kazanç miktarı
        const earningsDifference = totalEarnings - activeSession.totalEarned;

        // Trial kontrolü
        if (!user.activePackage) {
          const currentTrialEarnings = user.totalTrialEarnings || 0;
          const newTrialTotal = currentTrialEarnings + earningsDifference;
          
          // Trial limiti kontrolü
          if (newTrialTotal >= 25) {
            // Tam 25'e tamamla ve durdur
            const remainingEarning = 25 - currentTrialEarnings;
            
            if (remainingEarning > 0) {
              // Son kazancı ekle - freeTrialBalance'a
              await update(ref(database, `users/${user.uid}`), {
                freeTrialBalance: (user.freeTrialBalance || 0) + remainingEarning,
                totalTrialEarnings: 25,
                balance: (user.balance || 0) + remainingEarning
              });
              
              // Session'ı güncelle
              await update(ref(database, `miningSessions/${user.uid}/${activeSession.id}`), {
                totalEarned: activeSession.totalEarned + remainingEarning,
                lastUpdated: new Date().toISOString()
              });
            }
            
            // Madenciliği durdur
            await stopMining(activeSession.id, 'Trial limit reached');
            toast.error('Trial earning limit ($25) reached! Please upgrade to continue.');
            return;
          }
          
          // Trial süresi kontrolü
          if (user.trialEndDate && now > new Date(user.trialEndDate).getTime()) {
            await stopMining(activeSession.id, 'Trial period expired');
            toast.error('Trial period expired! Please upgrade to continue.');
            return;
          }
        }

        // Paket süresi kontrolü
        if (user.activePackage && user.packageExpiresAt) {
          if (now > new Date(user.packageExpiresAt).getTime()) {
            await stopMining(activeSession.id, 'Package expired');
            toast.error('Package expired! Please renew to continue mining.');
            return;
          }
        }

        // Kazanç güncellemesi yap
        if (earningsDifference > 0.000001) { // Çok küçük değişiklikleri yoksay
          // Session'ı güncelle
          await update(ref(database, `miningSessions/${user.uid}/${activeSession.id}`), {
            totalEarned: totalEarnings,
            lastUpdated: new Date().toISOString()
          });

          // Kullanıcı bakiyesini güncelle - DOĞRU BAKİYEYE EKLE
          const updates: any = {};

          // Trial ise freeTrialBalance'a ekle
          if (!user.activePackage) {
            updates.freeTrialBalance = (user.freeTrialBalance || 0) + earningsDifference;
            updates.totalTrialEarnings = (user.totalTrialEarnings || 0) + earningsDifference;
            // Eski balance alanını da güncelle (geriye dönük uyumluluk için)
            updates.balance = (user.balance || 0) + earningsDifference;
          } 
          // Paket varsa purchasedBalance'a ekle
          else {
            updates.purchasedBalance = (user.purchasedBalance || 0) + earningsDifference;
            // Eski balance alanını da güncelle (geriye dönük uyumluluk için)
            updates.balance = (user.balance || 0) + earningsDifference;
          }

          await update(ref(database, `users/${user.uid}`), updates);
          
          // Local state güncelle
          lastBalanceRef.current = updates.balance;
          lastUpdateTimeRef.current = now;
        }
      } catch (error) {
        console.error('Error updating earnings:', error);
      }
    };

    // İlk güncelleme 3 saniye sonra
    setTimeout(updateEarnings, 3000);
    
    // Sonraki güncellemeler 15 saniyede bir
    earningsIntervalRef.current = setInterval(updateEarnings, 15000);

    return () => {
      if (earningsIntervalRef.current) {
        clearInterval(earningsIntervalRef.current);
        earningsIntervalRef.current = null;
      }
    };
  }, [user, activeSessions]);

  const startMining = useCallback(async (coinId: string) => {
    if (!user || isLoading) return;

    // Ban kontrolü
    if (user.isBanned) {
      toast.error(`Account banned. Reason: ${user.banReason || 'Security violation'}`);
      return;
    }

    if (!canUserMine(user)) {
      toast.error('Mining not available. Please check your trial status or upgrade.');
      return;
    }
    
    setIsLoading(true);
    try {
      // Mevcut aktif session'ları kapat
      for (const session of activeSessions) {
        await set(ref(database, `miningSessions/${user.uid}/${session.id}`), {
          ...session,
          isActive: false,
          endTime: new Date().toISOString()
        });
      }

      const coin = coins.find(c => c.id === coinId);
      if (!coin) {
        toast.error('Invalid coin selected');
        setIsLoading(false);
        return;
      }

      // Hash rate hesaplama
      let hashRate = coin.baseHashRate;
      if (user.activePackage && packages[user.activePackage]) {
        const userPackage = packages[user.activePackage];
        hashRate = userPackage.hashRate;
      }

      // Yeni session oluştur
      const newSession: Omit<MiningSession, 'id'> = {
        userId: user.uid,
        coin: coinId,
        startTime: new Date().toISOString(),
        hashRate,
        totalEarned: 0,
        isActive: true,
        packageId: user.activePackage || null,
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      const sessionsRef = ref(database, `miningSessions/${user.uid}`);
      await push(sessionsRef, newSession);
      
      toast.success(`${coin.name} mining started! Will continue until you stop it.`);
      lastUpdateTimeRef.current = Date.now();
    } catch (error) {
      console.error('Error starting mining:', error);
      toast.error('Failed to start mining');
    }
    setIsLoading(false);
  }, [user, activeSessions, isLoading]);

  const stopMining = useCallback(async (sessionId: string, reason?: string) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const session = activeSessions.find(s => s.id === sessionId);
      if (!session) {
        setIsLoading(false);
        return;
      }

      const coin = coins.find(c => c.id === session.coin);
      
      await set(ref(database, `miningSessions/${user.uid}/${sessionId}`), {
        ...session,
        isActive: false,
        endTime: new Date().toISOString(),
        autoStopped: !!reason,
        stopReason: reason || 'Manual stop'
      });
      
      if (!reason) {
        toast.success(`${coin?.name || 'Mining'} stopped!`);
      }
    } catch (error) {
      console.error('Error stopping mining:', error);
      toast.error('Failed to stop mining');
    }
    setIsLoading(false);
  }, [user, activeSessions]);

  return {
    coins,
    activeSessions,
    isLoading,
    startMining,
    stopMining,
    canMine: canUserMine(user)
  };
};
