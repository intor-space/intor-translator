import type { TranslateConfig } from "@/translators/core-translator/translate-config.types";
import type { LocaleMessages, Replacement } from "@/types";

/**
 * Context object shared across the translate pipeline.
 *
 * @template Result - Final translated value type.
 */
export interface TranslateContext<Result = unknown> {
  /** Configuration for the translate pipeline. */
  config: TranslateConfig;

  /** Current messages for translation */
  messages: LocaleMessages;
  /** Current active locale */
  locale: string;
  /** Current loading state */
  isLoading?: boolean;
  /** Message key to look up in the messages map */
  key: string;
  /** Optional value replacements */
  replacements?: Replacement;

  /** Ordered list of locales to try, including fallbacks */
  candidateLocales: string[];
  /** Raw message string found in the messages map, before formatting */
  rawMessage?: string;
  /** Message after formatting (e.g. ICU, custom formatters) */
  formattedMessage?: unknown;
  /** Final value produced by the pipeline */
  finalMessage?: Result;

  /** Free-form metadata shared between hooks. */
  meta: Record<string, unknown>;
}

/**
 * A single step in the translate pipeline.
 *
 * @template Result - Final translated value type.
 */
export interface TranslateHook<Result = unknown> {
  /** Unique name for this hook, used for debugging and introspection. */
  name: string;
  /**
   * Optional execution order.
   * - Lower values run earlier; hooks without order run last-in registration order.
   */
  order?: number;
  /**
   * Run the hook with the current context.
   * - Return `{ done: true, value }` to short-circuit the pipeline.
   */
  run(ctx: TranslateContext<Result>): void | {
    /** Indicates the pipeline should stop after this hook. */
    done: true;
    /** Final value to return from the translate call. */
    value: Result;
  };
}
