import type { RawLocale } from "../../types/locale-types";
import type { LocaleRef } from "../../types/ref-types";
import type { MessagesRef } from "../../types/ref-types";
import type { LocaleNamespaceMessages } from "intor-types";

/**
 * Set the current locale if it exists in the messages.
 *
 * @param messagesRef - A reactive reference to the current messages.
 * @param localeRef - A reactive reference to the current locale.
 * @param newLocale - The new locale to set.
 */
export const setLocale = <Messages extends LocaleNamespaceMessages>({
  messagesRef,
  localeRef,
  newLocale,
}: {
  messagesRef: MessagesRef<Messages>;
  localeRef: LocaleRef<Messages>;
  newLocale: RawLocale<Messages>;
}): void => {
  const messages = messagesRef.current;

  if (newLocale in messages) {
    localeRef.current = newLocale;
  }
};
