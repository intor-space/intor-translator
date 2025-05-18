import type { Scoped } from "./scoped-types";
import type { NestedKeyPaths, RawLocale } from "../../types/locale-types";
import type { LocaleRef } from "../../types/ref-types";
import type { MessagesRef } from "../../types/ref-types";
import type { TranslatorOptions } from "../../types/translator-options-types";
import type { LocaleNamespaceMessages } from "intor-types";
import { scoped } from "./scoped";

/**
 * Returns a scoped translator factory bound to the given locale and messages.
 *
 * @param messagesRef - A reactive reference to the current messages.
 * @param localeRef - Reactive reference to the current locale.
 * @param translatorOptions - Translation configuration including messages.
 * @returns A function that scopes translations under an optional key prefix.
 *
 * @example
 * ```ts
 * const scope = createScoped({ localeRef, translatorOptions });
 * const { t } = scope("auth"); // t("title") => "Auth title"
 * ```
 */
export const createScoped = <Messages extends LocaleNamespaceMessages>(
  messagesRef: MessagesRef<Messages>,
  localeRef: LocaleRef<Messages>,
  translatorOptions: TranslatorOptions<Messages>,
): Scoped<Messages> => {
  return (preKey?: NestedKeyPaths<Messages[RawLocale<Messages>]>) =>
    scoped({ messagesRef, localeRef, translatorOptions, preKey });
};
