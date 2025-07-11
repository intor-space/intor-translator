import type { HasKeyOptions } from "@/translator-methods/has-key";
import { findMessageInLocales } from "@/utils/find-message-in-locales";
import { resolveLocalesToTry } from "@/utils/resolve-locales-to-try";

/** Check if a key exists in the specified locale or current locale. */
export const hasKey = <M>({
  messagesRef,
  localeRef,
  key,
  targetLocale,
}: HasKeyOptions<M>): boolean => {
  const messages = messagesRef.current;
  const locale = localeRef.current;

  if (!messages) {
    throw new Error("[intor-translator] 'messages' is required");
  }
  if (!locale) {
    throw new Error("[intor-translator] 'locale' is required");
  }

  const localesToTry = resolveLocalesToTry(targetLocale || locale);
  return findMessageInLocales({ messages, localesToTry, key }) ? true : false;
};
