import type {
  LocaleNamespaceMessages,
  NamespaceMessages,
  UnionLocaleMessages,
} from "@/types/message-structure";

/**
 * Gets all dot-separated keys (including non-leaf nodes) from a nested object.
 *
 * @example
 * NodeKeys<{ a: { b: { c: string }, d: string } }> → "a" | "a.b" | "a.b.c" | "a.d"
 */
export type NodeKeys<M> = M extends object
  ? {
      [K in keyof M]: K extends string
        ? `${K}` | `${K}.${NodeKeys<M[K]>}`
        : never;
    }[keyof M]
  : never;

/**
 * Default maximum recursive depth for nested key type computations,
 * balancing type safety and compiler performance.
 */
export type DefaultDepth = 15;

/** Countdown tuple for limiting recursive depth (up to 10 levels). */
type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
];

/**
 * Gets dot-separated keys to string leaf nodes in a nested object.
 *
 * @example
 * LeafKeys<{ a: { b: "x", c: { d: "y" } } }> → "a.b" | "a.c.d"
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

/**
 * Gets string leaf keys from all locale messages combined.
 *
 * @example
 * UnionLocaleLeafKeys<{ en: { a: { b: "x" } }, zh: { a: { c: "y" } } }> → "a.b" | "a.c"
 */
export type UnionLocaleLeafKeys<M, D extends number = DefaultDepth> =
  UnionLocaleMessages<M> extends NamespaceMessages
    ? LeafKeys<UnionLocaleMessages<M>, D>
    : never;

/**
 * Resolves the type at a dot-separated key in a nested object.
 *
 * @example
 * ResolvePathType<{ a: { b: { c: string } } }, "a.b.c"> → string
 * ResolvePathType<{ a: { b: { c: "hello" } } }, "a.b.c"> → "hello"
 */
export type ResolvePathType<
  T,
  P extends string,
> = P extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? ResolvePathType<T[Head], Tail>
    : never
  : P extends keyof T
    ? T[P]
    : never;

/**
 * Extracts leaf keys under a scoped path (K) from all locales combined.
 *
 * @example
 * type Messages = {
 *   en: { auth: { login: { success: string } } },
 *   zh: { auth: { login: { success: string; failed: string } } }
 * };
 * ScopedLeafKeys<Messages, "auth.login"> → "success" | "failed"
 */
export type ScopedLeafKeys<
  M,
  K extends string,
  D extends number = DefaultDepth,
> =
  UnionLocaleMessages<M> extends infer ResolvedLocaleMessages
    ? ResolvedLocaleMessages extends object
      ? LeafKeys<ResolvePathType<ResolvedLocaleMessages, K>, D>
      : never
    : never;

/**
 * Infer valid key type from locale messages.
 *
 * If `M` is not passed or empty, fallback to `string`.
 */
export type InferTranslatorKey<M> = M extends LocaleNamespaceMessages
  ? UnionLocaleLeafKeys<M>
  : string;
