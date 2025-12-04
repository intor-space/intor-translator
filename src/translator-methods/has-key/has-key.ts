import type { HasKeyOptions } from "./types";
import type { LocaleMessages } from "@/types";
import { findMessageInLocales } from "@/utils/find-message-in-locales";
import { resolveCandidateLocales } from "@/utils/resolve-candidate-locales";

/**
 * Check if a key exists in the specified locale or current locale.
 */
export const hasKey = ({
  messages,
  locale,
  key,
  targetLocale,
}: HasKeyOptions): boolean => {
  const candidateLocales = resolveCandidateLocales(targetLocale || locale);
  const message = findMessageInLocales({
    messages: messages as LocaleMessages,
    candidateLocales,
    key,
  });
  return !!message;
};
