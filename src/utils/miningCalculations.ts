// src/utils/miningCalculations.ts
export interface MiningCalculation {
  hashRateMultiplier: number;
  earningMultiplier: number;
  dailyEarningBonus: number;
}

export interface User {
  uid: string;
  isBanned?: boolean;
  activePackage?: string;
  packageExpiresAt?: string;
  trialEndDate?: string | Date;
  totalTrialEarnings?: number;
  freeTrialBalance?: number;
  purchasedBalance?: number;
  referralBalance?: number;
  balance?: number; // Migration için
}

// Paket tanımlamaları - useMining.ts ile senkron
export const PACKAGES = {
  starter: {
    hashRate: 61920, // 61.92 TH/s
    dailyEarning: 1.7,
    hourlyEarning: 1.7 / 24
  },
  professional: {
    hashRate: 187010, // 187.01 TH/s  
    dailyEarning: 7.1,
    hourlyEarning: 7.1 / 24
  },
  enterprise: {
    hashRate: 312100, // 312.10 TH/s
    dailyEarning: 10.1,
    hourlyEarning: 10.1 / 24
  }
};

export const getPackageMultipliers = (packageId?: string): MiningCalculation => {
  // Bu fonksiyon artık kullanılmıyor, direkt paket değerleri kullanılıyor
  const multipliers: Record<string, MiningCalculation> = {
    starter: {
      hashRateMultiplier: 61.92,
      earningMultiplier: 1.7 / 0.278, // Günlük kazanç / trial günlük kazanç
      dailyEarningBonus: 1.7
    },
    professional: {
      hashRateMultiplier: 187.01,
      earningMultiplier: 7.1 / 0.278,
      dailyEarningBonus: 7.1
    },
    enterprise: {
      hashRateMultiplier: 312.10,
      earningMultiplier: 10.1 / 0.278,
      dailyEarningBonus: 10.1
    }
  };

  return multipliers[packageId || ''] || {
    hashRateMultiplier: 1.0,
    earningMultiplier: 1.0,
    dailyEarningBonus: 0
  };
};

export const calculateMiningEarnings = (
  baseEarning: number,
  hashRate: number,
  baseHashRate: number,
  elapsedHours: number,
  packageId?: string
): number => {
  // Güvenlik kontrolleri
  if (baseEarning < 0 || hashRate < 0 || baseHashRate <= 0 || elapsedHours < 0) {
    console.warn('Invalid parameters for mining calculation');
    return 0;
  }
  
  // Maksimum süre kontrolü (24 saat)
  const clampedElapsedHours = Math.min(elapsedHours, 24);
  
  // DÜZELTME: Paket varsa direkt paket kazancını kullan
  if (packageId && PACKAGES[packageId as keyof typeof PACKAGES]) {
    const packageData = PACKAGES[packageId as keyof typeof PACKAGES];
    const hourlyEarning = packageData.hourlyEarning;
    const totalEarnings = hourlyEarning * clampedElapsedHours;
    
    // Makul olmayan kazanç kontrolü
    const maxReasonableEarning = packageData.dailyEarning * 2; // Günlük kazancın 2 katından fazla olamaz
    if (totalEarnings > maxReasonableEarning) {
      console.warn('Calculated earnings exceed reasonable limits');
      return maxReasonableEarning;
    }
    
    return Math.max(0, totalEarnings);
  }
  
  // Trial kullanıcılar için standart hesaplama
  const hourlyEarning = baseEarning;
  const totalEarnings = hourlyEarning * clampedElapsedHours;
  
  // Trial için maksimum kazanç kontrolü
  const maxTrialEarning = baseEarning * 10 * clampedElapsedHours;
  if (totalEarnings > maxTrialEarning) {
    console.warn('Trial earnings exceed limits');
    return maxTrialEarning;
  }
  
  return Math.max(0, totalEarnings);
};

export const calculateHashRate = (baseHashRate: number, packageId?: string): number => {
  if (baseHashRate <= 0) {
    console.warn('Invalid base hash rate');
    return 1000; // Default hash rate
  }
  
  // DÜZELTME: Paket varsa paket hash rate'ini kullan
  if (packageId && PACKAGES[packageId as keyof typeof PACKAGES]) {
    const packageData = PACKAGES[packageId as keyof typeof PACKAGES];
    return packageData.hashRate;
  }
  
  // Paket yoksa base hash rate döndür
  return baseHashRate;
};

export const canUserMine = (user: User | null | undefined): boolean => {
  if (!user) return false;
  
  // Ban kontrolü
  if (user.isBanned) return false;
  
  // Paket kontrolü
  if (user.activePackage) {
    // Paket süresi kontrolü
    if (user.packageExpiresAt) {
      const packageExpiry = new Date(user.packageExpiresAt);
      const now = new Date();
      if (now > packageExpiry) {
        return false; // Paket süresi dolmuş
      }
    }
    return true; // Aktif paketi var ve süresi dolmamış
  }
  
  // Trial kontrolü
  const trialEndDate = user.trialEndDate ? new Date(user.trialEndDate) : null;
  const now = new Date();
  const trialActive = trialEndDate && now < trialEndDate;
  const earningsWithinLimit = (user.totalTrialEarnings || 0) < 25.0;
  
  return !!(trialActive && earningsWithinLimit);
};

export const formatHashRate = (hashRate: number): string => {
  if (hashRate <= 0) return '0 H/s';
  
  // TH/s cinsinden gösterim için
  if (hashRate >= 1000000000000) {
    return `${(hashRate / 1000000000000).toFixed(2)} TH/s`;
  } else if (hashRate >= 1000000000) {
    return `${(hashRate / 1000000000).toFixed(2)} GH/s`;
  } else if (hashRate >= 1000000) {
    return `${(hashRate / 1000000).toFixed(2)} MH/s`;
  } else if (hashRate >= 1000) {
    return `${(hashRate / 1000).toFixed(2)} KH/s`;
  }
  return `${hashRate} H/s`;
};

// Yardımcı fonksiyonlar
export const validateMiningParameters = (
  baseEarning: number,
  hashRate: number,
  baseHashRate: number,
  elapsedHours: number
): boolean => {
  return baseEarning >= 0 && 
         hashRate >= 0 && 
         baseHashRate > 0 && 
         elapsedHours >= 0;
};

export const getMaxTrialEarnings = (): number => {
  return 25;
};

export const getMaxDailyHours = (): number => {
  return 24;
};

export const getPackageDailyEarning = (packageId: string): number => {
  const packageData = PACKAGES[packageId as keyof typeof PACKAGES];
  return packageData ? packageData.dailyEarning : 0;
};

export const getPackageHashRate = (packageId: string): number => {
  const packageData = PACKAGES[packageId as keyof typeof PACKAGES];
  return packageData ? packageData.hashRate : 1000;
};

export const generateDeviceFingerprint = async (): Promise<string> => {
  // Cihaz parmak izi oluşturma
  let canvasFingerprint = '';
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Device fingerprint', 2, 2);
      canvasFingerprint = canvas.toDataURL();
    }
  } catch (error) {
    console.warn('Canvas fingerprinting failed:', error);
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvasFingerprint,
    navigator.hardwareConcurrency || 0,
    navigator.deviceMemory || 0
  ].join('|');
  
  // Basit hash fonksiyonu
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bit integer'a çevir
  }
  
  return Math.abs(hash).toString(16);
};

export const generateReferralCode = (userId: string): string => {
  // Kullanıcı ID'sinden referans kodu oluştur
  const timestamp = Date.now().toString().slice(-6); // Son 6 hane
  const userIdHash = userId.slice(-6); // User ID'nin son 6 hanesi
  const combined = userIdHash + timestamp;
  
  // Basit hash fonksiyonu
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bit integer'a çevir
  }
  
  // 6 karakterlik referans kodu oluştur
  const code = Math.abs(hash).toString(36).toUpperCase().substring(0, 6);
  return code.padStart(6, '0');
};

export const calculateReferralBonus = (amount: number): number => {
  // %10 referans bonusu hesapla
  return amount * 0.1;
};

// Toplam bakiye hesaplama
export const getTotalBalance = (user: User | null): number => {
  if (!user) return 0;
  const freeTrialBalance = user.freeTrialBalance || 0;
  const purchasedBalance = user.purchasedBalance || 0;
  const referralBalance = user.referralBalance || 0;
  return freeTrialBalance + purchasedBalance + referralBalance;
};

// Çekilebilir bakiye hesaplama
export const getWithdrawableBalance = (user: User | null): number => {
  if (!user) return 0;
  const purchasedBalance = user.purchasedBalance || 0;
  const referralBalance = user.referralBalance || 0;
  
  // Referans bakiyesi 25 USD'den az ise çekilemez
  const withdrawableReferralBalance = referralBalance >= 25 ? referralBalance : 0;
  
  return purchasedBalance + withdrawableReferralBalance;
};
