import { database } from '../config/firebase';
import { ref, get, set } from 'firebase/database';

export interface UserLanguagePreference {
  user_id: string;
  language: string;
  country?: string;
  browser_language?: string;
  created_at?: string;
  updated_at?: string;
}

export const languageService = {
  async getUserLanguagePreference(userId: string): Promise<string | null> {
    try {
      const userRef = ref(database, `user_preferences/${userId}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        return snapshot.val().language || null;
      }

      return null;
    } catch (error) {
      return null;
    }
  },

  async saveUserLanguagePreference(
    userId: string,
    language: string,
    country?: string,
    browserLanguage?: string
  ): Promise<boolean> {
    try {
      const userRef = ref(database, `user_preferences/${userId}`);
      await set(userRef, {
        user_id: userId,
        language,
        country,
        browser_language: browserLanguage,
        updated_at: new Date().toISOString()
      });

      return true;
    } catch (error) {
      return false;
    }
  },

  async updateUserLanguage(userId: string, language: string): Promise<boolean> {
    try {
      const userRef = ref(database, `user_preferences/${userId}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const currentData = snapshot.val();
        await set(userRef, {
          ...currentData,
          language,
          updated_at: new Date().toISOString()
        });
      } else {
        await set(userRef, {
          user_id: userId,
          language,
          updated_at: new Date().toISOString()
        });
      }

      return true;
    } catch (error) {
      return false;
    }
  },

  detectBrowserLanguage(): string {
    const browserLang = navigator.language.split('-')[0];
    const supportedLanguages = ['tr', 'en', 'de', 'ru', 'ar', 'zh'];

    if (supportedLanguages.includes(browserLang)) {
      return browserLang;
    }

    return 'en';
  },

  async detectCountry(): Promise<string | null> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return data.country_code || null;
    } catch (error) {
      return null;
    }
  }
};
