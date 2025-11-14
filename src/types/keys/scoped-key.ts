import type { DefaultDepth, LeafKeys } from "@/types/keys/key-extraction-utils";
import type {
  LocaleMessages,
  LocalizedMessagesUnion,
  NestedMessage,
} from "@/types/messages";

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
