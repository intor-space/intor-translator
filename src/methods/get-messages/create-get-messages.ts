import type { GetMessages } from "./get-messages-types";
import type { MessagesRef } from "../../types/ref-types";
import type { LocaleNamespaceMessages } from "intor-types";
import { getMessages } from "./get-messages";

/**
 * Creates a function that returns messages from translator options.
 *
 * @param messagesRef - A reactive reference to the current messages.
 * @returns A function that returns the messages object.
 */
export const createGetMessages = <Messages extends LocaleNamespaceMessages>(
  messagesRef: MessagesRef<Messages>,
): GetMessages<Messages> => {
  return () => getMessages(messagesRef);
};
