import type { MessagesRef } from "../../types/ref-types";
import type { LocaleNamespaceMessages } from "intor-types";

/**
 * Retrieves the messages object from translator options.
 *
 * @param messagesRef - A reactive reference to the current messages.
 * @returns The messages object.
 */
export const getMessages = <Messages extends LocaleNamespaceMessages>(
  messagesRef: MessagesRef<Messages>,
): Readonly<Messages> => {
  return messagesRef.current;
};
