import type { LocaleNamespaceMessages } from "intor-types";

/**
 * Represents the available locale namespaces from the message map.
 *
 * Extracts top-level keys from the entire localized message structure,
 * which are typically used as namespace identifiers (e.g., "common", "home", "dashboard").
 *
 * @template Messages - The type of the locale message map.
 */
export type RawLocale<Messages extends LocaleNamespaceMessages> =
  keyof Messages & string;

/**
 * Computes all possible nested key paths of a deeply nested object.
 *
 * Example:
 * ```ts
 * {
 *   a: {
 *     b: {
 *       c: "hello";
 *     };
 *   };
 * }
 * ```
 * Will generate: `"a" | "a.b" | "a.b.c"`
 *
 * Useful for type-safe translation key autocompletion and validation.
 *
 * @template Messages - The message object to extract nested key paths from.
 */
export type NestedKeyPaths<Messages> = Messages extends object
  ? {
      [Key in keyof Messages]:
        | `${Key & string}`
        | `${Key & string}.${NestedKeyPaths<Messages[Key]>}`;
    }[keyof Messages]
  : never;
