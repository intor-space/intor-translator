import type { FallbackLocalesMap } from "@/types";
import type { Locale, Replacement, RichReplacement } from "@/types";

/** Config options for translation behavior. */
export type TranslateConfig = {
  fallbackLocales?: FallbackLocalesMap;
  loadingMessage?: string;
  placeholder?: string;
  handlers?: TranslateHandlers;
};

/** Optional handler functions for customizing translation behavior. */
export type TranslateHandlers = {
  formatMessage?: FormatMessage;
  onLoading?: OnLoading;
  onMissing?: OnMissing;
};

/** Format a resolved message before returning it. */
export type FormatMessage<Result = unknown> = (
  ctx: TranslateContext & { message: string },
) => Result;

/** Called when translation is still loading. */
export type OnLoading<Result = unknown> = (ctx: TranslateContext) => Result;

/** Called when no message is found for the given key. */
export type OnMissing<Result = unknown> = (ctx: TranslateContext) => Result;

/**
 * Context passed to translation-related functions.
 * @example
 * {
 *   locale: "en",
 *   key: "home.title",
 *   replacements: { name: "Yiming" }
 * }
 */
export type TranslateContext = {
  locale: Locale;
  key: string;
  replacements?: Replacement | RichReplacement;
};
