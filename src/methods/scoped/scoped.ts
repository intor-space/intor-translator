import type { NestedKeyPaths, RawLocale } from "../../types/locale-types";
import type { LocaleRef } from "../../types/ref-types";
import type { MessagesRef } from "../../types/ref-types";
import type { TranslatorOptions } from "../../types/translator-options-types";
import type { LooseHasKey } from "../has-key";
import type { LooseTranslate } from "../translate";
import type {
  LocaleNamespaceMessages,
  Replacement,
  RichReplacement,
} from "intor-types";
import { getFullKey } from "../../utils/get-full-key";
import { createHasKey } from "../has-key/create-has-key";
import { createTranslate } from "../translate/create-translate";

/**
 * Returns a scoped translation helper with an optional key prefix.
 *
 * Useful for working within a specific namespace of messages.
 *
 * @param messagesRef - A reactive reference to the current messages.
 * @param localeRef - A reactive reference to the current locale.
 * @param translatorOptions - Configuration with messages, fallbacks, and handlers.
 * @param preKey - Optional key prefix to scope all translations under.
 * @returns An object with `t` and `hasKey` functions, both scoped to the given prefix.
 *
 * @example
 * ```ts
 * const { t } = scoped({
 *   localeRef,
 *   translatorOptions,
 *   preKey: "auth",
 * });
 *
 * t("login.title"); // Resolves "auth.login.title"
 * ```
 */
export const scoped = <Messages extends LocaleNamespaceMessages>({
  messagesRef,
  localeRef,
  translatorOptions,
  preKey,
}: {
  messagesRef: MessagesRef<Messages>;
  localeRef: LocaleRef<Messages>;
  translatorOptions: TranslatorOptions<Messages>;
  preKey?: NestedKeyPaths<Messages[RawLocale<Messages>]>;
}): {
  t: LooseTranslate;
  hasKey: LooseHasKey;
} => {
  const baseTranslate = createTranslate<Messages>(
    messagesRef,
    localeRef,
    translatorOptions,
  );
  const baseHasKey = createHasKey<Messages>(
    messagesRef,
    localeRef,
    translatorOptions,
  );

  return {
    // t (Scoped)
    t: (key?: string, replacements?: Replacement | RichReplacement): string => {
      const fullKey = getFullKey(preKey, key);
      return baseTranslate(fullKey, replacements);
    },
    // hasKey (Scoped)
    hasKey: (key?: string, locale?: string): boolean => {
      const fullKey = getFullKey(preKey, key);
      return baseHasKey(fullKey, locale);
    },
  };
};
