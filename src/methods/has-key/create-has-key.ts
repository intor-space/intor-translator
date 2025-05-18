import type { HasKey } from "./has-key-types";
import type { NestedKeyPaths, RawLocale } from "../../types/locale-types";
import type { LocaleRef } from "../../types/ref-types";
import type { MessagesRef } from "../../types/ref-types";
import type { TranslatorOptions } from "../../types/translator-options-types";
import type { LocaleNamespaceMessages } from "intor-types";
import { hasKey } from "./has-key";

/**
 * Factory to create a hasKey() function.
 * The returned function checks if a translation key exists in the specified
 * or current locale, considering fallback locales as well.
 *
 * Supports both strongly typed keys (based on Messages) and raw string keys.
 *
 * @param messagesRef - A reactive reference to the current messages.
 * @param localeRef - A reactive current locale reference.
 * @param translatorOptions - The translation configuration, including messages and fallbacks.
 * @returns A function to check if a key exists for a given locale.
 */
export const createHasKey = <Messages extends LocaleNamespaceMessages>(
  messagesRef: MessagesRef<Messages>,
  localeRef: LocaleRef<Messages>,
  translatorOptions: TranslatorOptions<Messages>,
): HasKey<Messages> => {
  // Cast implementation to overload type for both typed and string keys
  return ((
    key: NestedKeyPaths<Messages[RawLocale<Messages>]>,
    locale?: RawLocale<Messages>,
  ) =>
    hasKey({
      messagesRef,
      localeRef,
      translatorOptions,
      key,
      locale,
    })) as HasKey<Messages>;
};
