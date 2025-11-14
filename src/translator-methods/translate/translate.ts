import type { TranslateOptions } from "./types";
import type { Replacement } from "@/types";
import { findMessageInLocales } from "@/utils/find-message-in-locales";
import { replaceValues } from "@/utils/replace-values";
import { resolveCandidateLocales } from "@/utils/resolve-candidate-locales";

/**
 * Attempts to resolve the most suitable message for the given locale chain, applying fallbacks,
 * formatting handlers, and value replacements.
 */
export const translate = <Result = string>({
  messagesRef,
  localeRef,
  isLoadingRef,
  translateConfig,
  key,
  replacements,
}: TranslateOptions): Result => {
  const messages = messagesRef.current;
  const locale = localeRef.current;
  const isLoading = isLoadingRef.current;

  if (!messages) {
    throw new Error("[intor-translator] 'messages' is required");
  }

  const { fallbackLocales, loadingMessage, placeholder, handlers } =
    translateConfig;
  const { formatHandler, loadingHandler, missingHandler } = handlers || {};

  const candidateLocales = resolveCandidateLocales(locale, fallbackLocales);
  const message = findMessageInLocales({ messages, candidateLocales, key });

  // Loading state handling: return loading handler or static loading message if provided.
  if (isLoading && (loadingHandler || loadingMessage)) {
    if (loadingHandler)
      return loadingHandler({ key, locale, replacements }) as Result;
    if (loadingMessage) return loadingMessage as Result;
  }

  // Missing message handling: custom handler, placeholder, or fallback to the key itself.
  if (message === undefined) {
    if (missingHandler)
      return missingHandler({ key, locale, replacements }) as Result;
    if (placeholder) return placeholder as Result;
    return key as Result;
  }

  // Rich formatting: fully delegates message formatting to the custom handler,
  // allowing advanced rendering or rich replacements.
  if (formatHandler) {
    return formatHandler({ message, key, locale, replacements }) as Result;
  }

  // Basic formatting: apply simple value replacements when available.
  return replacements
    ? (replaceValues(message, replacements as Replacement) as Result)
    : (message as Result);
};
