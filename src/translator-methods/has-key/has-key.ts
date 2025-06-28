import type { HasKeyOptions } from "@/translator-methods/has-key";
import type { LocaleNamespaceMessages } from "@/types";
import { findMessageInLocales } from "@/utils/find-message-in-locales";
import { resolveLocalesToTry } from "@/utils/resolve-locales-to-try";

/** Check if a key exists in the specified locale or current locale. */
export const hasKey = <M extends LocaleNamespaceMessages>({
  messagesRef,
  localeRef,
  key,
  targetLocale,
}: HasKeyOptions<M>): boolean => {
  const messages = messagesRef.current;
  const locale = localeRef.current;

  const localesToTry = resolveLocalesToTry(targetLocale || locale);
  return findMessageInLocales({ messages, localesToTry, key }) ? true : false;
};
