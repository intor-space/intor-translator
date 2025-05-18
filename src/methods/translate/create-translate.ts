import type { Translate } from "./translate-types";
import type { NestedKeyPaths, RawLocale } from "../../types/locale-types";
import type { LocaleRef } from "../../types/ref-types";
import type { MessagesRef } from "../../types/ref-types";
import type { TranslatorOptions } from "../../types/translator-options-types";
import type {
  LocaleNamespaceMessages,
  Replacement,
  RichReplacement,
} from "intor-types";
import { translate } from "./translate";

/**
 * Creates a translation function bound to a specific locale reference and translator options.
 *
 * This returned function accepts a nested message key and optional replacements,
 * and returns the localized message with fallback and formatting applied.
 *
 * @param messagesRef - A reactive reference to the current messages.
 * @param localeRef - A reactive reference to the current locale.
 * @param translatorOptions - Configuration including all messages, fallback locales, and optional handlers.
 *
 * @returns A translation function that takes a message key and optional replacements, returning the localized string or rich content.
 */
export const createTranslate = <Messages extends LocaleNamespaceMessages>(
  messagesRef: MessagesRef<Messages>,
  localeRef: LocaleRef<Messages>,
  translatorOptions: TranslatorOptions<Messages>,
): Translate<Messages> => {
  return ((
    key: NestedKeyPaths<Messages[RawLocale<Messages>]>,
    replacements?: Replacement | RichReplacement,
  ) =>
    translate({
      messagesRef,
      localeRef,
      translatorOptions,
      key,
      replacements,
    })) as Translate<Messages>;
};
