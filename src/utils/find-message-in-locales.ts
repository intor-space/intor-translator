import type { NestedKeyPaths, RawLocale } from "../types/locale-types";
import type { LocaleNamespaceMessages } from "intor-types";
import { getValueByKey } from "./get-value-by-key";

/**
 * Attempts to find a translated message string by searching through a list of locales.
 *
 * This function iterates over the given locales in order and tries to find
 * the corresponding message by the provided key path in each locale's messages.
 * It returns the first found message string or `undefined` if no message is found.
 *
 * @template Messages - The structure type of all locale messages.
 *
 * @param {Locale[]} localesToTry - An ordered array of locale keys to attempt lookup.
 * @param {Messages} messages - The full messages object containing all locales.
 * @param {NestedKeyPaths<Messages[Locale]>} key - The nested key path string to lookup in messages.
 * @returns {string | undefined} The found message string or undefined if none is found.
 *
 * @example
 * ```ts
 * const message = findMessageInLocales(['en', 'fr'], messages, 'auth.login.title');
 * if (message) {
 *   console.log(message);
 * }
 * ```
 */
export const findMessageInLocales = <Messages extends LocaleNamespaceMessages>({
  messages,
  localesToTry,
  key,
}: {
  messages: Messages;
  localesToTry: RawLocale<Messages>[];
  key: NestedKeyPaths<Messages[RawLocale<Messages>]>;
}): string | undefined => {
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
