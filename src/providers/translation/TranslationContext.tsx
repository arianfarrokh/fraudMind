'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { loadNamespace } from './loadTranslation';
import { LangType, NamespaceType, TranslationContextType } from './types';
import { setCookie } from 'cookies-next';

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

type TranslationStore = {
  [lang in LangType]?: {
    [namespace: string]: Record<string, string>;
  };
};

export const TranslationProvider = ({
  children,
  initialLocale = 'fa',
}: {
  children: ReactNode;
  initialLocale?: LangType;
}) => {
  const [locale, setLocale] = useState<LangType>(initialLocale);
  const [translations, setTranslations] = useState<TranslationStore>({});

  const loadNamespaces = useCallback(async (namespaces: NamespaceType[]) => {
    const current = translations[locale] || {};
    const loaded: Record<string, Record<string, string>> = {};

    for (const ns of namespaces) {
      if (!current[ns]) {
        loaded[ns] = await loadNamespace(locale, ns);
      }
    } 

    if (Object.keys(loaded).length > 0) {
      setTranslations((prev) => ({
        ...prev,
        [locale]: {
          ...prev[locale],
          ...loaded,
        },
      }));
    }
  }, [locale, translations]);

  const hasNamespace = useCallback(
    (namespace: NamespaceType) => {
      return !!translations?.[locale]?.[namespace];
    },
    [locale, translations]
  );
  const t = useCallback(
    (namespace: NamespaceType, key: string, vars?: Record<string, unknown>) => {
      const translation = translations?.[locale]?.[namespace]?.[key] || key;

      if (!vars) return translation;

      return Object.keys(vars).reduce(
        (str, k) => str.replace(`{${k}}`, String(vars[k])),
        translation
      );
    },
    [locale, translations]
  );

  useEffect(() => {
    const storedLocale = typeof window !== 'undefined' ? localStorage.getItem('locale') : null;
    if (storedLocale === 'fa' || storedLocale === 'en') {
      setLocale(storedLocale);
    }
  }, []);

  const changeLocale = useCallback((lang: LangType) => {
    setLocale(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', lang);
    }
    setCookie('locale', lang);
  }, []);

  const value = useMemo(() => ({
    locale,
    t,
    changeLocale,
    loadNamespaces,
    hasNamespace,
  }), [locale, t, changeLocale, loadNamespaces, hasNamespace]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

 const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error('useTranslation must be used within a TranslationProvider');
  return context;
};
export default useTranslationContext