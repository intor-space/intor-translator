import type { Locale, NamespaceMessages } from "intor-types";
import { getMessageKeyCache } from "intor-cache";

/**
 * Retrieves a nested value from locale messages by a dot-separated key string.
 *
 * This function supports optional caching to optimize repeated key lookups.
 * When the locale changes, the cache will be cleared automatically.
 *
 * @param locale - The current locale identifier (e.g., "en", "zh-TW").
 * @param messages - The message object containing nested keys and values for the locale.
 * @param key - The dot-separated key path to access the desired message value (e.g., "home.welcome.title").
 * @param useCache - Whether to enable caching for this lookup. Defaults to `true`.
 * @returns The value found at the given key path, or `undefined` if the key does not exist.
 *
 * @example
 * ```ts
 * const title = getValueByKey("en", messages, "home.welcome.title");
 * ```
 */
export const getValueByKey = (
  locale: Locale,
  messages: NamespaceMessages,
  key: string,
  useCache: boolean = true,
): unknown => {
  const cache = getMessageKeyCache();
  useCache = Boolean(useCache && cache);

  const cacheKey = `${key}`;

  const currentLocale = cache?.get("locale");
  if (currentLocale !== locale) {
    cache?.clear();
    cache?.set("locale", locale);
  }

  if (useCache && cache?.has(cacheKey)) {
    return cache?.get(cacheKey);
  }

  const value = key.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, messages);

  if (useCache && value !== undefined) {
    cache?.set(cacheKey, value);
  }

  return value;
};
