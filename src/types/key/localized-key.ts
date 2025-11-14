import type {
  DefaultDepth,
  LeafKeys,
  NodeKeys,
} from "@/types/key/key-extraction-utils";
import type {
  LocaleMessages,
  LocalizedMessagesUnion,
  NestedMessage,
} from "@/types/messages";

/**
 * Extracts all **node keys** from the messages
 * of a specified locale (or union of locales).
 *
 * @example
 * ```ts
 * const messages = {
 *   en: { greeting: { morning: "morning" } },
 *   zh: { greeting: { evening: "晚上好" } },
 * };
 *
 * // 1. Union of all locales
 * LocalizedNodeKey<typeof messages> // → "greeting" | "greeting.morning" | "greeting.evening"
 *
 * // 2. For a specified locale
 * LocalizedNodeKey<typeof messages, "en"> // → "greeting" | "greeting.morning"
 * LocalizedNodeKey<typeof messages, "zh"> // → "greeting" | "greeting.evening"
 *
 * // 3. Fallback when M is not LocaleMessages
 * LocalizedNodeKey // → string
 * ```
 */
export type LocalizedNodeKey<
  M = unknown,
  L extends keyof M | "union" = "union",
  D extends number = DefaultDepth,
> = M extends LocaleMessages
  ? LocalizedMessagesUnion<M, L> extends NestedMessage
    ? NodeKeys<LocalizedMessagesUnion<M, L>, D>
    : never
  : string;

/**
 * Extracts all **leaf keys** from the messages
 * of a specified locale (or union of locales).
 *
 * @example
 * ```ts
 * const messages = {
 *   en: { greeting: { morning: "morning" } },
 *   zh: { greeting: { evening: "晚上好" } },
 * };
 *
 * // 1. Union of all locales
 * LocalizedLeafKey<typeof messages> // → "greeting.morning" | "greeting.evening"
 *
 * // 2. For a specified locale
 * LocalizedLeafKey<typeof messages, "en"> // → "greeting.morning"
 * LocalizedLeafKey<typeof messages, "zh"> // → "greeting.evening"
 *
 * // 3. Fallback if M is not LocaleMessages
 * LocalizedLeafKey // → string
 * ```
 */
export type LocalizedLeafKey<
  M = unknown,
  L extends keyof M | "union" = "union",
  D extends number = DefaultDepth,
> = M extends LocaleMessages
  ? LocalizedMessagesUnion<M, L> extends NestedMessage
    ? LeafKeys<LocalizedMessagesUnion<M, L>, D>
    : never
  : string;
