import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, type Language, type TranslationKeys } from '../locales/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, unknown>, path: string[]): unknown {
  let current: unknown = obj;
  for (const key of path) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return current;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: TranslationKeys): string => {
    const keys = key.split('.');

    // Try active language first
    const activeValue = getNestedValue(translations[language] as unknown as Record<string, unknown>, keys);
    if (typeof activeValue === 'string') return activeValue;

    // Fallback to English
    const fallbackValue = getNestedValue(translations.en as unknown as Record<string, unknown>, keys);
    if (typeof fallbackValue === 'string') return fallbackValue;

    // Last resort: return the key itself
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
