import type { RawLocale } from "./locale-types";
import type { TranslatorHandlers } from "./translator-handlers-types";
import type { FallbackLocalesMap, LocaleNamespaceMessages } from "intor-types";

/**
 * - Options for creating a translator instance.
 *
 * @example
 * ```ts
 * const options: TranslatorOptions = {
 *   locale: 'en',
 *   messages: {
 *     en: { common: { hello: "Hello" } },
 *     zh: { common: { hello: "你好" } },
 *   },
 *   fallbackLocales: { zh: ['en'] },
 *   handlers: {
 *     messageFormatter: ({ message }) => message.toUpperCase(),
 *   },
 * };
 * ```
 */
export type TranslatorOptions<
  Messages extends LocaleNamespaceMessages,
  Result = string,
> = {
  /**
   * - The message definitions to be used by the translator.
   * - These should be pre-loaded and structured by locale and namespace.
   */
  messages: Readonly<Messages>;

  /**
   * - The current active locale, e.g., "en" or "zh-TW".
   */
  locale: RawLocale<Messages>;

  /**
   * - Optional fallback locale(s) to use when a message is missing in the primary locale.
   */
  fallbackLocales?: FallbackLocalesMap<RawLocale<Messages>>;

  /**
   * - Whether the translator is currently in a loading state.
   * - Useful for SSR or async loading scenarios.
   */
  isLoading?: boolean;

  /**
   * - The message string to return while in loading state.
   * - Will be overridden if you provide a `loadingMessageHandler` in handlers.
   */
  loadingMessage?: string;

  /**
   * - A fallback string to show when the message key is missing.
   * - Will be overridden if you provide a `placeholderHandler` in handlers.
   */
  placeholder?: string;

  /**
   * - Optional handlers to customize translation behavior (formatting, placeholders, etc).
   */
  handlers?: TranslatorHandlers<Result, Result, Result>;
};
