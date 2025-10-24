// src/hooks/useAuth.ts - TAMAMEN DÜZELTİLMİŞ VERSİYON
import { useState, useEffect } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, set, get, onValue, update } from 'firebase/database';
import { auth, database } from '../config/firebase';
import { User } from '../types';
import { generateReferralCode, generateDeviceFingerprint } from '../utils/miningCalculations';
import { detectUserLanguage } from '../utils/languages';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Firebase yoksa hemen loading'i kapat
    if (!auth) {
      console.error('Firebase Auth not initialized');
      setLoading(false);
      setInitialized(true);
      return;
    }

    let userDataUnsubscribe: (() => void) | null = null;
    let isMounted = true;
    let hasSetLoading = false;

    // Maksimum 5 saniye loading
    const forceTimeout = setTimeout(() => {
      if (!hasSetLoading && isMounted) {
        console.warn('⏰ Auth timeout - forcing loading to false');
        setLoading(false);
        setInitialized(true);
        hasSetLoading = true;
      }
    }, 5000);

    const authUnsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (!isMounted) return;

        try {
          if (firebaseUser) {
            console.log('✅ Firebase user authenticated:', firebaseUser.uid);
            
            // ✅ ÖNCE: Geçici user objesi oluştur ve HEMEN set et
            const tempUser: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || '',
              createdAt: new Date().toISOString(),
              trialStartDate: new Date().toISOString(),
              trialEndDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
              totalTrialEarnings: 0,
              freeTrialBalance: 0,
              purchasedBalance: 0,
              referralBalance: 0,
              balance: 0,
              isAdmin: firebaseUser.email === 'admin@cryptocloudmining.com',
              referralCode: '',
              referralEarnings: 0,
              totalReferrals: 0,
              purchasedReferrals: 0,
              isBanned: false
            };
            
            // ✅ HEMEN kullanıcıyı set et - böylece giriş yapılabilir
            setUser(tempUser);
            
            // ✅ Loading'i kapat - kullanıcı siteye girebilir
            if (!hasSetLoading) {
              setLoading(false);
              setInitialized(true);
              hasSetLoading = true;
              console.log('✅ User set, loading complete');
            }

            // ✅ SONRA: Database verilerini arka planda yükle
            const userRef = ref(database, `users/${firebaseUser.uid}`);
            
            // Database işlemlerini non-blocking yap
            setTimeout(async () => {
              try {
                const snapshot = await Promise.race([
                  get(userRef),
                  new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Database timeout')), 3000)
                  )
                ]) as any;
                
                if (!isMounted) return;
                
                if (snapshot && snapshot.exists && snapshot.exists()) {
                  console.log('✅ User data found in database');
                  
                  // Mevcut kullanıcı - gerçek verileri yükle
                  const userData = snapshot.val();
                  
                  // MIGRATION LOGIC: Eski balance sistemini yeni sisteme taşı
                  if (userData.balance !== undefined && 
                      (userData.freeTrialBalance === undefined || 
                       userData.purchasedBalance === undefined || 
                       userData.referralBalance === undefined)) {
                    
                    console.log('🔄 Migrating user balance to new system...');
                    
                    // Eski balance'ı purchasedBalance'a taşı (paket satın almış olabilir)
                    const migratedData = {
                      ...userData,
                      freeTrialBalance: 0,
                      purchasedBalance: userData.balance || 0,
                      referralBalance: userData.referralEarnings || 0,
                      purchasedReferrals: 0
                    };
                    
                    // Eğer referralEarnings varsa, onu referralBalance'a taşı
                    if (userData.referralEarnings && userData.referralEarnings > 0) {
                      migratedData.referralBalance = userData.referralEarnings;
                    }
                    
                    // Migration'ı kaydet
                    set(userRef, migratedData).then(() => {
                      console.log('✅ Migration completed successfully');
                    }).catch(err => {
                      console.error('Migration failed:', err);
                    });
                    
                    setUser(migratedData);
                  } else {
                    setUser(userData);
                  }
                  
                  // Referral code yoksa oluştur
                  if (!userData.referralCode) {
                    const referralCode = generateReferralCode(firebaseUser.uid);
                    update(userRef, { referralCode }).catch(err => 
                      console.error('Failed to update referral code:', err)
                    );
                  }
                  
                  // purchasedReferrals yoksa ekle
                  if (userData.purchasedReferrals === undefined) {
                    update(userRef, { purchasedReferrals: 0 }).catch(err => 
                      console.error('Failed to update purchasedReferrals:', err)
                    );
                  }
                  
                  // Real-time listener kur
                  userDataUnsubscribe = onValue(
                    userRef,
                    (userSnapshot) => {
                      if (!isMounted) return;
                      if (userSnapshot.exists()) {
                        setUser(userSnapshot.val());
                      }
                    },
                    (error) => {
                      console.error('User data listener error:', error);
                    }
                  );
                } else {
                  console.log('📝 Creating new user profile...');
                  
                  // Yeni kullanıcı - profil oluştur
                  await createNewUserProfile(firebaseUser, userRef, isMounted);
                  
                  if (!isMounted) return;
                  
                  // Yeni kullanıcı için listener kur
                  userDataUnsubscribe = onValue(
                    userRef,
                    (userSnapshot) => {
                      if (!isMounted) return;
                      if (userSnapshot.exists()) {
                        setUser(userSnapshot.val());
                        console.log('✅ New user profile loaded');
                      }
                    },
                    (error) => {
                      console.error('New user listener error:', error);
                    }
                  );
                }
              } catch (error) {
                console.error('Database error (non-critical):', error);
                // Database hatası olsa bile user zaten set edildi, giriş yapılabilir
              }
            }, 0);
            
          } else {
            // Kullanıcı çıkış yaptı veya giriş yapmamış
            console.log('👋 No user authenticated');
            
            if (userDataUnsubscribe) {
              userDataUnsubscribe();
              userDataUnsubscribe = null;
            }
            
            setUser(null);
            
            if (!hasSetLoading && isMounted) {
              setLoading(false);
              setInitialized(true);
              hasSetLoading = true;
            }
          }
        } catch (error) {
          console.error('Auth state change error:', error);
          
          if (!hasSetLoading && isMounted) {
            setUser(null);
            setLoading(false);
            setInitialized(true);
            hasSetLoading = true;
          }
        }
      },
      (error) => {
        console.error('Auth observer error:', error);
        
        if (!hasSetLoading && isMounted) {
          setLoading(false);
          setInitialized(true);
          hasSetLoading = true;
        }
      }
    );

    return () => {
      isMounted = false;
      clearTimeout(forceTimeout);
      authUnsubscribe();
      if (userDataUnsubscribe) {
        userDataUnsubscribe();
      }
    };
  }, []);

  // Helper function to create new user profile
  const createNewUserProfile = async (
    firebaseUser: FirebaseUser,
    userRef: any,
    isMounted: boolean
  ) => {
    try {
      const deviceFingerprint = await generateDeviceFingerprint().catch(() => 'unknown');
      const referralCode = generateReferralCode(firebaseUser.uid);
      const userLanguage = detectUserLanguage();
      const userIP = await getUserIP();
      const userCountry = await getUserCountry();

      if (!isMounted) return;

      const newUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || '',
        createdAt: new Date().toISOString(),
        trialStartDate: new Date().toISOString(),
        trialEndDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        totalTrialEarnings: 0,
        freeTrialBalance: 0,
        purchasedBalance: 0,
        referralBalance: 0,
        balance: 0,
        isAdmin: firebaseUser.email === 'admin@cryptocloudmining.com',
        referralCode,
        referralEarnings: 0,
        totalReferrals: 0,
        purchasedReferrals: 0,
        isBanned: false,
        deviceFingerprint,
        language: userLanguage,
        lastLoginIP: userIP,
        country: userCountry
      };

      await set(userRef, newUser);
      setUser(newUser);
      console.log('✅ New user profile created');
    } catch (error) {
      console.error('Create user profile error:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login successful');
      return result;
    } catch (error: any) {
      let errorMessage = 'Login failed';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          break;
        default:
          errorMessage = error.message || 'Login failed';
      }
      
      console.error('Login error:', error);
      throw new Error(errorMessage);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ Registration successful');
      return result;
    } catch (error: any) {
      let errorMessage = 'Registration failed';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Use at least 6 characters';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        default:
          errorMessage = error.message || 'Registration failed';
      }
      
      console.error('Registration error:', error);
      throw new Error(errorMessage);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      if (!email) {
        throw new Error('Email is required');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }
      
      await sendPasswordResetEmail(auth, email);
      console.log('✅ Password reset email sent');
      return { success: true };
    } catch (error: any) {
      let errorMessage = 'Password reset failed';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later';
          break;
        default:
          errorMessage = error.message || 'Password reset failed';
      }
      
      console.error('Password reset error:', error);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('✅ Logout successful');
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error('Logout failed');
    }
  };

  const updateUserLanguage = async (language: string) => {
    if (!user) return;
    
    try {
      const userRef = ref(database, `users/${user.uid}`);
      await update(userRef, { language });
      console.log('✅ User language updated');
    } catch (error) {
      console.error('Failed to update user language:', error);
      throw new Error('Failed to update language preference');
    }
  };

  const updateUserData = async (updates: Partial<User>) => {
    if (!user) {
      throw new Error('No user logged in');
    }
    
    try {
      const userRef = ref(database, `users/${user.uid}`);
      const updatedData = { ...user, ...updates };
      await set(userRef, updatedData);
      console.log('✅ User data updated');
    } catch (error) {
      console.error('Failed to update user data:', error);
      throw new Error('Failed to update user data');
    }
  };

  const getUserIP = async (): Promise<string> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch('https://api.ipify.org?format=json', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  };

  const getUserCountry = async (): Promise<string> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch('https://ipapi.co/json/', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      const data = await response.json();
      return data.country_code || 'unknown';
    } catch (error) {
      return 'unknown';
    }
  };

  return {
    user,
    loading,
    login,
    register,
    resetPassword,
    logout,
    updateUserData,
    updateUserLanguage
  };
};
