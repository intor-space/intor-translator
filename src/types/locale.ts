import type { LocaleNamespaceMessages } from "@/types/message-structure";

/**
 * Extracts the locale keys from the messages object as string literals.
 *
 * @example
 * type Locales = LocaleKey<{
 *   en: {};
 *   "zh-TW": {};
 * }>;
 * // Locales is "en" | "zh-TW"
 */
export type StrictLocaleKey<M> = keyof M & string;

/**
 * Extracts locale keys only when M is a valid messages object.
 *
 * When M is a concrete `LocaleNamespaceMessages`, the locale key
 * will be inferred as a union of its top-level keys like `"en" | "zh-TW"`.
 * Otherwise, falls back to a generic `string`.
 *
 * This helps retain intellisense when `messages` is provided,
 * but avoids TypeScript errors when M is left as `unknown`.
 *
 * @example
 * type Locales = LocaleKey<{
 *   en: {};
 *   fr: {};
 * }>;
 * //   → "en" | "fr"
 *
 * type Fallback = LocaleKey<unknown>;
 * //   → string
 */
export type LocaleKey<M = unknown> = M extends LocaleNamespaceMessages
  ? StrictLocaleKey<M>
  : string;

/**
 * A map that defines fallback locales for each base locale.
 *
 * When a message is missing for a given locale, the system will attempt to find the message
 * by falling back to the locales listed here, in the specified order.
 *
 * @example
 * const fallbacks: FallbackLocalesMap = {
 *   "en-AU": ["en-GB", "en"],
 *   "zh-TW": ["zh-HK", "zh"]
 * };
 */
export type FallbackLocalesMap<L extends string = string> = Partial<
  Record<L, L[]>
>;
