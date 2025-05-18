import type { GetLocale } from "./get-locale-types";
import type { LocaleRef } from "../../types/ref-types";
import type { LocaleNamespaceMessages } from "intor-types";
import { getLocale } from "./get-locale";

/**
 * Creates a function that returns the current locale messages.
 *
 * @param localeRef - A reactive reference to the locale messages.
 * @returns A function that returns the current locale messages.
 */
export const createGetLocale = <Messages extends LocaleNamespaceMessages>(
  localeRef: LocaleRef<Messages>,
): GetLocale<Messages> => {
  return () => getLocale(localeRef);
};
