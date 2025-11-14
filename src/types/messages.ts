import type { Locale } from "@/types";

/**
 * A nested message structure or a simple string message.
 *
 * - Used to represent either a plain message or an object containing more nested messages.
 *
 * @example
 * ```ts
 * const greeting: NestedMessage = "Hello";
 * const userMessages: NestedMessage = {
 *   profile: {
 *     greeting: "Hello, user!",
 *     farewell: "Goodbye!"
 *   }
 * };
 * ```
 */
export type NestedMessage = string | { [key: string]: NestedMessage };

/**
 * Messages grouped by locale.
 * Used to structure all available messages for multiple locales.
 *
 * - Each key is a locale string, e.g., "en" or "zh-TW".
 * - Each value is a `NestedMessage`, allowing for deeply nested message objects.
 *
 * @example
 * ```ts
 * const messages: LocaleMessages = {
 *   en: {
 *     welcome: "Welcome",
 *     auth: {
 *       login: {
 *         success: "Login successful",
 *         failure: "Login failed"
 *       }
 *     }
 *   },
 *   "zh-TW": {
 *     welcome: "歡迎",
 *     auth: {
 *       login: {
 *         success: "登入成功",
 *         failure: "登入失敗"
 *       }
 *     }
 *   }
 * };
 * ```
 */
export type LocaleMessages = Record<string, { [x: string]: NestedMessage }>;

/**
 * Merges messages from all locales into a single unified structure,
 * or extracts messages for a specific locale if `L` is provided.
 *
 * @example
 * ```ts
 * const messages = {
 *   en: { greeting: { morning: "morning" } },
 *   zh: { greeting: { evening: "晚上好" } },
 * };
 *
 * // 1. Union of all locales
 * UnionLocaleMessages<typeof messages>;
 * // → { greeting: { morning: string; }; } | { greeting: { evening: string; }; }
 *
 * // 2. Messages for a specified locale
 * UnionLocaleMessages<typeof messages, "en">; // → { greeting: { morning: string; }; }
 * UnionLocaleMessages<typeof messages, "zh">; // → { greeting: { evening: string; }; }
 *
 * // 3. Fallback if M is not LocaleMessages
 * UnionLocaleMessages // → unknown
 * ```
 */
export type LocalizedMessagesUnion<
  M = unknown,
  L extends keyof M | "union" = "union",
> = M extends LocaleMessages
  ? L extends "union"
    ? M[Locale<M>]
    : M[L & keyof M]
  : unknown;
