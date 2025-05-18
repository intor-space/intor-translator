import type { NestedKeyPaths, RawLocale } from "../types/locale-types";
import type { LocaleNamespaceMessages } from "intor-types";

/**
 * Combines a prefix key and a sub key into a full nested translation key path.
 *
 * This function helps construct dot-separated keys used in nested locale messages.
 *
 * - If `preKey` is not provided, it returns `key` as the full key.
 * - If `key` is not provided, it returns `preKey` as the full key.
 * - If both are provided, it concatenates them with a dot (`.`).
 *
 * @template Messages - The locale messages object type.
 * @param preKey - Optional prefix key, representing the parent namespace or path.
 * @param key - Optional sub key, representing the nested child key.
 * @returns The combined nested key path as a dot-separated string.
 *
 * @example
 * ```ts
 * getFullKey("home", "welcome.title"); // returns "home.welcome.title"
 * getFullKey(undefined, "about"); // returns "about"
 * getFullKey("profile"); // returns "profile"
 * ```
 */
export const getFullKey = <Messages extends LocaleNamespaceMessages>(
  preKey?: NestedKeyPaths<Messages[RawLocale<Messages>]>,
  key?: string,
): NestedKeyPaths<Messages[RawLocale<Messages>]> => {
  if (!preKey) {
    return key as NestedKeyPaths<Messages[RawLocale<Messages>]>;
  }

  if (!key) {
    return preKey;
  }

  return `${preKey}.${key}` as NestedKeyPaths<Messages[RawLocale<Messages>]>;
};
