import type { Locale, RichReplacement } from "intor-types";

// Translator handlers
export type TranslatorHandlers<MF = unknown, LMH = unknown, PH = unknown> = {
  /**
   * A custom formatter function to format translation messages.
   * You can use this to integrate ICU libraries like `intl-messageformat`.
   */
  messageFormatter?: MessageFormatter<MF>;

  /**
   * Handler for loading state of the translation message.
   * Useful when translations are loaded asynchronously.
   */
  loadingMessageHandler?: LoadingMessageHandler<LMH>;

  /**
   * Handler for placeholders in translation messages.
   * Useful for handling missing or fallback placeholders.
   */
  placeholderHandler?: PlaceholderHandler<PH>;
};

/**
 * Custom formatter for translation messages.
 *
 * This function receives the raw message and context to produce a formatted result.
 * You can use this to integrate ICU-style formatting or other complex message processing.
 *
 * @template Result - The type of the formatted result.
 *
 * @param ctx - The context object containing information for formatting.
 * @param ctx.message - The raw message string to format.
 * @param ctx.locale - The currently active locale string (e.g. 'en-US').
 * @param ctx.key - The translation key associated with this message.
 * @param ctx.replacements - Optional replacement values for variables inside the message.
 *
 * @returns The formatted message, usually a string but can be any type.
 */
export type MessageFormatter<Result = unknown> = (
  ctx: TranslatorHandlerContext & { message: string },
) => Result;

/**
 * Handler function called when translation message is loading.
 *
 * @template Result - The type of the loading handler result.
 *
 * @param ctx - The context object containing locale, key, and replacements.
 * @returns Result to display during loading (e.g. a placeholder string or React element).
 */
export type LoadingMessageHandler<Result = unknown> = (
  ctx: TranslatorHandlerContext,
) => Result;

/**
 * Handler function for placeholders in translation messages.
 *
 * @template Result - The type of the placeholder handler result.
 *
 * @param ctx - The context object containing locale, key, and replacements.
 * @returns Result to display for placeholders (e.g. a default string or React element).
 */
export type PlaceholderHandler<Result = unknown> = (
  ctx: TranslatorHandlerContext,
) => Result;

/**
 * Context object passed to translation handlers.
 * Contains necessary information for formatting or handling translation messages.
 */
export type TranslatorHandlerContext = {
  locale: Locale;
  key: string;
  replacements?: RichReplacement;
};
