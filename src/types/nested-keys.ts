import type { NestedMessage } from "../../dist";
import type { LocaleMessages, LocalizedMessagesUnion } from "@/types/messages";

//============================================================
// ▼ Key Extraction Utilities
//============================================================

/**
 * Default maximum recursive depth for nested key type computations,
 * balancing type safety and compiler performance.
 */
export type DefaultDepth = 15;

/** Countdown tuple for limiting recursive depth (up to 15 levels). */
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

/**
 * Gets all dot-separated keys (including non-leaf nodes) from a nested object.
 *
 * @example
 * ```ts
 * NodeKeys<{ a: { b: { c: string }, d: string } }> // → "a" | "a.b" | "a.b.c" | "a.d"
 * ```
 */
export type NodeKeys<M, D extends number = DefaultDepth> = [D] extends [never]
  ? never
  : M extends object
    ? {
        [K in keyof M]: K extends string
          ? `${K}` | `${K}.${NodeKeys<M[K], Prev[D]>}`
          : never;
      }[keyof M]
    : never;

/**
 * Gets dot-separated keys to string leaf nodes in a nested object.
 *
 * @example
 * ```ts
 * LeafKeys<{ a: { b: { c: string }, d: string } }> // → "a.d" | "a.b.c"
 * ```
 */
export type LeafKeys<M, D extends number = DefaultDepth> = [D] extends [never]
  ? never
  : M extends object
    ? {
        [K in keyof M]: M[K] extends string
          ? `${K & string}`
          : M[K] extends object
            ? `${K & string}.${LeafKeys<M[K], Prev[D]>}`
            : never;
      }[keyof M]
    : never;

//============================================================
// ▼ Localized key (leaf/node)
//============================================================

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

//============================================================
// ▼ Scoped
//============================================================

/**
 * Resolves the type at a dot-separated key in a nested object.
 *
 * @example
 * ```ts
 * const structure = {
 *   a: {
 *     b: { c: "hello" },
 *     z: "world",
 *   },
 * };
 *
 * MessagesAtPreKey<typeof structure, "a"> // → { b: { c: string; }; z: string;}
 * MessagesAtPreKey<typeof structure, "a.b"> // → { c: string; };
 * ```
 */
type MessagesAtPreKey<
  T,
  PK extends string,
> = PK extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? MessagesAtPreKey<T[Head], Tail>
    : never
  : PK extends keyof T
    ? T[PK]
    : never;

/**
 * Extracts all **leaf keys** under a scoped path (`PK`) from the messages
 * of a specified locale (`L`) (or union of locales).
 *
 * @example
 * ```ts
 * const messages = {
 *   en: { a: { b: { c: "hello" }, z: "world" } },
 *   zh: { a: { b: "hello" },
 * };
 *
 * ScopedLeafKeys<typeof messages, "a">; // → "b.c" | "z"
 * ScopedLeafKeys<typeof messages, "a.b">; // → "c"
 * ScopedLeafKeys<typeof messages, "a", "zh">; // →  "b"
 * ```
 */
export type ScopedLeafKeys<
  M,
  PK extends string,
  L extends keyof M | "union" = "union",
  D extends number = DefaultDepth,
> = M extends LocaleMessages
  ? LocalizedMessagesUnion<M, L> extends infer messages
    ? messages extends NestedMessage
      ? LeafKeys<MessagesAtPreKey<messages, PK>, D>
      : never
    : never
  : string;
