import type { RawLocale } from "../types/locale-types";
import type { FallbackLocalesMap, LocaleNamespaceMessages } from "intor-types";

/**
 * Resolve a prioritized list of locales to attempt based on a primary locale.
 *
 * The result array always starts with the primary locale, followed by fallback locales
 * as defined in the `fallbackLocales` map. Any fallback locale identical to the primary
 * locale will be excluded to avoid duplication.
 *
 * @template Messages - The type describing supported locales and their message namespaces.
 *
 * @param locale - The primary locale to use.
 * @param fallbackLocales - Optional map specifying fallback locales for each primary locale.
 * @returns An array of locales to try, with the primary locale first, followed by filtered fallbacks.
 */
export const resolveLocalesToTry = <Messages extends LocaleNamespaceMessages>(
  locale: RawLocale<Messages>,
  fallbackLocales?: FallbackLocalesMap,
): RawLocale<Messages>[] => {
  const fallbacks = fallbackLocales?.[locale] || [];
  return [
    locale,
    ...(fallbacks.filter((l) => l !== locale) as RawLocale<Messages>[]),
  ];
};
