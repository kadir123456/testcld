// src/hooks/useLanguage.ts
import { useState, useEffect, createContext, useContext } from 'react';
import { detectUserLanguage, getTranslation, setDocumentLanguage } from '../utils/languages';
import { languageService } from '../services/languageService';
import { auth } from '../config/firebase';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'tr',
  setLanguage: () => {},
  t: (key: string) => key
});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useLanguageProvider = () => {
  const [language, setLanguageState] = useState(() => {
    const detectedLang = detectUserLanguage();
    setDocumentLanguage(detectedLang);
    return detectedLang;
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeLanguage = async () => {
      const user = auth.currentUser;

      if (user) {
        const savedLang = await languageService.getUserLanguagePreference(user.uid);

        if (savedLang) {
          setLanguageState(savedLang);
          localStorage.setItem('language', savedLang);
          setDocumentLanguage(savedLang);
        } else {
          const browserLang = languageService.detectBrowserLanguage();
          const country = await languageService.detectCountry();

          await languageService.saveUserLanguagePreference(
            user.uid,
            browserLang,
            country || undefined,
            navigator.language
          );

          setLanguageState(browserLang);
          localStorage.setItem('language', browserLang);
          setDocumentLanguage(browserLang);
        }
      } else {
        const browserLang = detectUserLanguage();
        setLanguageState(browserLang);
        localStorage.setItem('language', browserLang);
        setDocumentLanguage(browserLang);
      }

      setIsInitialized(true);
    };

    initializeLanguage();
  }, []);

  const setLanguage = async (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    setDocumentLanguage(lang);

    const user = auth.currentUser;
    if (user) {
      await languageService.updateUserLanguage(user.uid, lang);
    }
  };

  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  useEffect(() => {
    setDocumentLanguage(language);
  }, [language]);

  return {
    language,
    setLanguage,
    t
  };
};