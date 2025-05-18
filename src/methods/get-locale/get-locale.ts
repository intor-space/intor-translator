import type { RawLocale } from "../../types/locale-types";
import type { LocaleRef } from "../../types/ref-types";
import type { LocaleNamespaceMessages } from "intor-types";

/**
 * Returns the current locale messages from a locale reference.
 *
 * @param localeRef - A reactive reference to the locale messages.
 * @returns The current locale messages.
 */
export const getLocale = <Messages extends LocaleNamespaceMessages>(
  localeRef: LocaleRef<Messages>,
): RawLocale<Messages> => {
  return localeRef.current;
};
