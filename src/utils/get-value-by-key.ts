import type { Locale, NamespaceMessages } from "@/types";
import { getMessageKeyCache } from "@/cache";
/**
 * Retrieves a nested value from locale messages by a dot-separated key string.
 *
 * @example
 * const messages = {
 *   en: { home: { title: "Welcome" } },
 *   zh: { home: { title: "歡迎" } },
 * };
 *
 * getValueByKey("en", messages.en, "home.title");
 * // => "Welcome"
 *
 * getValueByKey("zh", messages.zh, "home.title");
 * // => "歡迎"
 *
 * getValueByKey("en", messages.en, "home.unknown");
 * // => undefined
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
