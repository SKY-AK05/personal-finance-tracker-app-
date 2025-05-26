import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en } from '@/localization/en';
import { ta } from '@/localization/ta';

type Language = 'english' | 'tamil';

type TranslationContextType = {
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
};

const TranslationContext = createContext<TranslationContextType>({
  t: (key: string) => key,
  language: 'english',
  setLanguage: async () => {},
});

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('english');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage && (savedLanguage === 'english' || savedLanguage === 'tamil')) {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    const translations = language === 'english' ? en : ta;
    return translations[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {!isLoading && children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);