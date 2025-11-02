import { LangType, NamespaceType } from "./types";

export async function loadNamespace(locale: LangType, namespace: NamespaceType): Promise<Record<string, string>> {
  try {
    const translation = await import(`@/locales/${locale}/${namespace}.json`);
    return translation.default;
  } catch (e) {
    console.error(`⚠️ Could not load ${namespace} for locale ${locale}`, e);
    return {};
  }
}
