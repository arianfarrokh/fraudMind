export type LangType = 'fa' | 'en';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const localePaths = {
  fa: {
    common: () => import("@/locales/fa/common.json"),
    error: () => import("@/locales/fa/error.json"),
    form: () => import("@/locales/fa/form.json"),
    enum: () => import("@/locales/fa/enum.json"),
  },
  en: {
    common: () => import("@/locales/en/common.json"),
    error: () => import("@/locales/en/error.json"),
    form: () => import("@/locales/en/form.json"),
    enum: () => import("@/locales/en/enum.json"),
  },
} as const ;

  // build NamespaceType automatically
  export type NamespaceType = keyof typeof localePaths['fa']; 

// build TranslationKeysMap automatically
export type TranslationKeysMap = {
  [NS in NamespaceType]: keyof Awaited<ReturnType<typeof localePaths['fa'][NS]>>;
};


// translation context type
export type TranslationContextType = {
  locale: LangType;
  t: <NS extends NamespaceType>(
    namespace: NS,
    key: TranslationKeysMap[NS],
    vars?: Record<string, unknown>
  ) => string;
  changeLocale: (lang: LangType) => void;
  loadNamespaces: (namespaces: NamespaceType[]) => Promise<void>;
  hasNamespace: (namespace: NamespaceType) => boolean;
};
