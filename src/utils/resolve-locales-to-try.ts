import type {
  FallbackLocalesMap,
  LocaleNamespaceMessages,
  LocaleKey,
} from "@/types";

/**
 * Resolve a prioritized list of locales to attempt based on a primary locale.
 *
 * @example
 * const fallbackMap = {
 *   "zh-TW": ["zh", "en"],
 *   "en": ["zh-TW"]
 * };
 *
 * resolveLocalesToTry("zh-TW", fallbackMap);
 * // => ["zh-TW", "zh", "en"]
 *
 * resolveLocalesToTry("en", fallbackMap);
 * // => ["en", "zh-TW"]
 *
 * resolveLocalesToTry("zh-TW");
 * // => ["zh-TW"]
 */
export const resolveLocalesToTry = <M extends LocaleNamespaceMessages>(
  locale: LocaleKey<M>,
  fallbackLocales?: FallbackLocalesMap<LocaleKey<M>>,
): LocaleKey<M>[] => {
  const fallbacks = fallbackLocales?.[locale] || [];
  const filteredFallbacks = fallbacks.filter((l) => l !== locale);
  return [locale, ...filteredFallbacks];
};
