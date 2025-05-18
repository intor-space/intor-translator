import type { RawLocale } from "./locale-types";
import type { LocaleNamespaceMessages } from "intor-types";

/**
 * A reference object that holds the current set of localized messages.
 *
 * This type is designed to be used with reactive or stateful systems,
 * such as React, Vue, or custom stores. The `current` property contains
 * all localized messages for each available locale.
 *
 * @template Messages - A map of all locale namespaces and their translations.
 *
 * @example
 * const messagesRef: MessagesRef<AllMessages> = {
 *   current: {
 *     en: { home: { title: "Welcome" } },
 *     zh: { home: { title: "歡迎" } }
 *   }
 * };
 */
export type MessagesRef<Messages extends LocaleNamespaceMessages> = {
  current: Readonly<Messages>;
};

/**
 * A reference object that holds the currently selected locale.
 *
 * This type is intended for use in reactive translation systems
 * where the current locale may change dynamically (e.g., via UI switcher).
 * It ensures the selected locale is valid based on the defined message map.
 *
 * @template Messages - A map of all locale namespaces and their translations.
 *
 * @example
 * const localeRef: LocaleRef<AllMessages> = {
 *   current: "en"
 * };
 */
export type LocaleRef<Messages extends LocaleNamespaceMessages> = {
  current: RawLocale<Messages>;
};
