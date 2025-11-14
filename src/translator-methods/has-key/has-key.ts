import type { HasKeyOptions } from "./types";
import type { LocaleMessages } from "@/types";
import { findMessageInLocales } from "@/utils/find-message-in-locales";
import { resolveCandidateLocales } from "@/utils/resolve-candidate-locales";

/** Check if a key exists in the specified locale or current locale. */
export const hasKey = ({
  messagesRef,
  localeRef,
  key,
  targetLocale,
}: HasKeyOptions): boolean => {
  const messages = messagesRef.current as LocaleMessages;
  const locale = localeRef.current;

  if (!messages) {
    throw new Error("[intor-translator] 'messages' is required");
  }

  const candidateLocales = resolveCandidateLocales(targetLocale || locale);
  const message = findMessageInLocales({ messages, candidateLocales, key });
  return !!message;
};
