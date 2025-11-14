import type { LocaleNamespaceMessages } from "@/types";

type FindMessageInLocalesOptions = {
  messages: LocaleNamespaceMessages;
  localesToTry: string[];
  key: string;
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
export const findMessageInLocales = ({
  messages,
  localesToTry,
  key,
}: FindMessageInLocalesOptions): string | undefined => {
  for (const loc of localesToTry) {
    const localeMessages = messages[loc];

    if (!localeMessages) {
      continue;
    }

    let candidate: unknown = localeMessages;
    const keys = key.split(".");

    for (const k of keys) {
      if (candidate && typeof candidate === "object" && k in candidate) {
        candidate = (candidate as Record<string, unknown>)[k];
      } else {
        candidate = undefined;
        break;
      }
    }

    if (typeof candidate === "string") {
      return candidate;
    }
  }

  return undefined;
};
