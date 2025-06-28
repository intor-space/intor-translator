import type { LocaleNamespaceMessages } from "@/types";

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
export type LocaleKey<M extends LocaleNamespaceMessages> = keyof M & string;

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
