'use client';

import { useEffect } from 'react';
import { NamespaceType } from './types';
import useTranslationContext from './TranslationContext';

export default function useTranslation(...namespaces: NamespaceType[]) {
  const context = useTranslationContext();
  const { loadNamespaces, hasNamespace, locale } = context;

  if(!namespaces || namespaces.length === 0) namespaces.push('common')

  useEffect(() => {
    const toLoad = namespaces.filter((ns) => !hasNamespace(ns));
    if (toLoad.length > 0) {
      loadNamespaces(toLoad);
    }
  }, [locale, hasNamespace, loadNamespaces, namespaces]);

  return {
    ...context,
  };
}

