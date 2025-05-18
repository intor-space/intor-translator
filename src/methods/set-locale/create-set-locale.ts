import type { SetLocale } from "./set-locale-types";
import type { LocaleRef } from "../../types/ref-types";
import type { MessagesRef } from "../../types/ref-types";
import type { LocaleNamespaceMessages } from "intor-types";
import { setLocale } from "./set-locale";

/**
 * Create a function to update the current locale.
 *
 * @param messagesRef - A reactive reference to the current messages.
 * @param localeRef - A reactive reference to the current locale.
 * @returns A function to set the new locale.
 */
export const createSetLocale = <Messages extends LocaleNamespaceMessages>(
  messagesRef: MessagesRef<Messages>,
  localeRef: LocaleRef<Messages>,
): SetLocale<Messages> => {
  return (newLocale) => setLocale({ messagesRef, localeRef, newLocale });
};
