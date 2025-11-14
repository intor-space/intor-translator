import type { FallbackLocalesMap, Locale } from "@/types";
import type { Replacement } from "@/types";

/**
 * Configuration options for translation behavior.
 */
export type TranslateConfig<M = unknown> = {
  /** Optional mapping of fallback locales to use when a message is missing in the current locale. */
  fallbackLocales?: FallbackLocalesMap<Locale<M>>;
  /** Optional message to display while translations are still loading. */
  loadingMessage?: string;
  /** Optional placeholder to use when a message cannot be found. */
  placeholder?: string;
  /** Optional set of handler functions for customizing translation behavior. */
  handlers?: TranslateHandlers;
};

/**
 * Optional handler functions for customizing translation behavior.
 */
export type TranslateHandlers = {
  /** Function to format a resolved message before returning it. */
  formatHandler?: FormatHandler;
  /** Function called when a translation is still loading. */
  loadingHandler?: LoadingHandler;
  /** Function called when no message is found for a given key. */
  missingHandler?: MissingHandler;
};

/** Function to format a resolved message. */
export type FormatHandler<Result = unknown> = (
  ctx: TranslateHandlerContext & { message: string },
) => Result;
/** Function called when translation is still loading. */
export type LoadingHandler<Result = unknown> = (
  ctx: TranslateHandlerContext,
) => Result;
/** Function called when no message is found for the given key. */
export type MissingHandler<Result = unknown> = (
  ctx: TranslateHandlerContext,
) => Result;

/**
 * Context object passed to translation-related functions.
 *
 * @example
 * {
 *   locale: "en",
 *   key: "home.title",
 *   replacements: { name: "John" }
 * }
 */
export type TranslateHandlerContext = {
  /** The current locale being translated. */
  locale: Locale;
  /** The translation key for the message. */
  key: string;
  /** Optional replacements for dynamic interpolation in the message. */
  replacements?: Replacement;
};
