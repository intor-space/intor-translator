import type { LocaleKey, InferTranslatorKey } from "@/types";
import { getValueByKey } from "@/utils/get-value-by-key";

type FindMessageInLocalesOptions<M> = {
  messages: M;
  localesToTry: LocaleKey<M>[];
  key: InferTranslatorKey<M>;
};

/**
 * Finds the first available string message for a given key across a list of locales.
 *
 * @example
 * const messages = {
 *   en: { home: { title: "Welcome" } },
 *   zh: { home: { title: "歡迎" } },
 * };
 *
 * findMessageInLocales({
 *   messages,
 *   localesToTry: ["en", "zh"],
 *   key: "home.title",
 * });
 * // => "Welcome"
 */
export const findMessageInLocales = <M>({
  messages,
  localesToTry,
  key,
}: FindMessageInLocalesOptions<M>): string | undefined => {
  for (const loc of localesToTry) {
    const localeMessages = messages[loc];

    if (!localeMessages) {
      continue;
    }

    const candidate = getValueByKey(loc, localeMessages, key);

    if (typeof candidate === "string") {
      return candidate;
    }
  }

  return undefined;
};
