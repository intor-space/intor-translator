import type { TranslatorOptions } from "./types/translator-options-types";
import type { Translator } from "./types/translator-types";
import type { LocaleNamespaceMessages } from "intor-types";
import { createGetLocale } from "./methods/get-locale";
import { createGetMessages } from "./methods/get-messages";
import { createHasKey } from "./methods/has-key";
import { createScoped } from "./methods/scoped";
import { createSetLocale } from "./methods/set-locale";
import { createTranslate } from "./methods/translate";

/**
 * Factory function to create a translator instance.
 *
 * This function sets up a full-featured translator object based on the provided options,
 * including locale management, message retrieval, key existence checking, translation,
 * and scoped translations with prefixes.
 *
 * @template Messages - The shape of the locale namespace messages supported by this translator.
 *
 * @param translatorOptions - Configuration options including initial locale and messages.
 * @returns A translator instance exposing locale control and translation methods.
 */
export function createTranslator<Messages extends LocaleNamespaceMessages>(
  translatorOptions: TranslatorOptions<Messages>,
): Translator<Messages> {
  const { locale } = translatorOptions;

  const messagesRef = { current: translatorOptions.messages }; // Set a ref of current messages
  const localeRef = { current: locale }; // Set a ref of current locale

  // Get current locale
  const getLocale = createGetLocale(localeRef);

  // Set current locale to a new locale
  const setLocale = createSetLocale(messagesRef, localeRef);

  // Get messages
  const getMessages = createGetMessages(messagesRef);

  // Check if a translation key exists in the specified locale(s)
  const hasKey = createHasKey(messagesRef, localeRef, translatorOptions);

  // Translation function to retrieve translated messages (no namespace)
  const t = createTranslate(messagesRef, localeRef, translatorOptions);

  // Scoped translator with an optional prefix key
  const scoped = createScoped(messagesRef, localeRef, translatorOptions);

  return {
    getLocale,
    setLocale,
    getMessages,
    hasKey,
    t,
    scoped,
  };
}
