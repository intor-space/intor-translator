import type { NestedKeyPaths, RawLocale } from "../../types/locale-types";
import type { LocaleRef } from "../../types/ref-types";
import type { MessagesRef } from "../../types/ref-types";
import type { TranslatorHandlers } from "../../types/translator-handlers-types";
import type { TranslatorOptions } from "../../types/translator-options-types";
import type {
  LocaleNamespaceMessages,
  Replacement,
  RichReplacement,
} from "intor-types";
import { findMessageInLocales } from "../../utils/find-message-in-locales";
import { replaceValues } from "../../utils/replace-values";
import { resolveLocalesToTry } from "../../utils/resolve-locales-to-try";

/**
 * Translates a localized message using the given key, current locale, and optional replacements.
 *
 * This function gracefully traverses fallback locales, handles loading states,
 * and supports both plain and rich formatting (e.g. ReactNode) via generic type `T`.
 *
 * It's designed to be flexible and expressive — whether you're showing a simple string
 * or rendering dynamic, richly formatted content.
 *
 * @param messagesRef - A reactive reference to the current messages.
 * @param localeRef - A reactive reference pointing to the current locale.
 * @param translatorOptions - The configuration object defining locale messages, fallbacks, handlers, and more.
 * @param key - A nested key path string that points to the desired message within the locale tree.
 * @param replacements - Optional replacement values (text or rich components) to interpolate within the message.
 *
 * @returns The translated message as type `T`, resolved through the defined locale and its fallbacks.
 *
 * @example
 * ```ts
 * const message = translate({
 *   localeRef,
 *   translatorOptions: {
 *     messages: { greeting: "Hello {target}!" },
 *     // other options...
 *   },
 *   key: "greeting",
 *   replacements: { target: "World" },
 * }); // => "Hello World!"
 * ```
 */
export const translate = <
  Messages extends LocaleNamespaceMessages,
  Result = string,
>({
  messagesRef,
  localeRef,
  translatorOptions,
  key,
  replacements,
}: {
  messagesRef: MessagesRef<Messages>;
  localeRef: LocaleRef<Messages>;
  translatorOptions: TranslatorOptions<Messages>;
  key: NestedKeyPaths<Messages[RawLocale<Messages>]>;
  replacements?: Replacement | RichReplacement;
}): Result => {
  const messages = messagesRef.current;
  const { fallbackLocales, isLoading, loadingMessage, placeholder } =
    translatorOptions;

  const { messageFormatter, loadingMessageHandler, placeholderHandler } =
    (translatorOptions.handlers as TranslatorHandlers) || {};

  // Resolve the locales to try (current locale + fallback locales)
  const localesToTry = resolveLocalesToTry(localeRef.current, fallbackLocales);

  // Attempt to find a message string by checking the target locale and fallbacks
  const message = findMessageInLocales({ messages, localesToTry, key });

  // Check if it's loading dynamic messages
  if (isLoading) {
    // Handle loading state with provided handler or fallback message
    if (loadingMessageHandler) {
      return loadingMessageHandler({
        key,
        locale: localeRef.current,
        replacements,
      }) as Result;
    }

    // Return loadingMessage if provided from defined config
    if (loadingMessage) {
      return loadingMessage as Result;
    }
  }

  // If no message found, handle accordingly
  if (!message) {
    // Handle placeholder if defined
    if (placeholderHandler) {
      return placeholderHandler({
        key,
        locale: localeRef.current,
        replacements,
      }) as Result;
    }

    // Return placeholder if provided from defined config
    if (placeholder) {
      return placeholder as Result;
    }

    // Return the key if no message is found
    return key as Result;
  }

  // If a message is found, apply message formatter or replace values (Rich replacement)
  if (messageFormatter) {
    return messageFormatter({
      message,
      key,
      locale: localeRef.current,
      replacements,
    }) as Result;
  } else {
    // Apply replacements if provided (Basic replacement)
    return replacements
      ? (replaceValues(message, replacements as Replacement) as Result)
      : (message as Result);
  }
};
