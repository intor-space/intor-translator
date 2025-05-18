import type { NestedKeyPaths, RawLocale } from "../../types/locale-types";
import type { LocaleRef } from "../../types/ref-types";
import type { MessagesRef } from "../../types/ref-types";
import type { TranslatorOptions } from "../../types/translator-options-types";
import type { LocaleNamespaceMessages } from "intor-types";
import { findMessageInLocales } from "../../utils/find-message-in-locales";
import { resolveLocalesToTry } from "../../utils/resolve-locales-to-try";

/**
 * Checks if a translation key exists in the current locale or fallback locales.
 *
 * @template Messages - The structure type of all locale messages.
 *
 * @param localeRef - A reactive reference to the current locale.
 * @param messagesRef - A reactive reference to the current messages.
 * @param translatorOptions - The translation configuration, including messages and fallbacks.
 * @param key - The translation key path to check.
 * @param locale - Optionally override the current locale.
 * @returns `true` if the key exists in the locale or its fallbacks, otherwise `false`.
 */
export const hasKey = <Messages extends LocaleNamespaceMessages>({
  messagesRef,
  localeRef,
  translatorOptions,
  key,
  locale,
}: {
  messagesRef: MessagesRef<Messages>;
  localeRef: LocaleRef<Messages>;
  translatorOptions: TranslatorOptions<Messages>;
  key: NestedKeyPaths<Messages[RawLocale<Messages>]>;
  locale?: RawLocale<Messages>;
}): boolean => {
  const messages = messagesRef.current;
  const { fallbackLocales } = translatorOptions;

  // Use the provided locale or fallback to the current one
  const targetLocale = locale ?? localeRef.current;

  // Resolve the list of locales to try (current + fallbacks)
  const localesToTry = resolveLocalesToTry(targetLocale, fallbackLocales);

  // Attempt to find a message string by checking the target locale and fallbacks
  const message = findMessageInLocales({ messages, localesToTry, key });

  return message ? true : false;
};
