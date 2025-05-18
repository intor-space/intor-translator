import type { GetLocale } from "../methods/get-locale";
import type { GetMessages } from "../methods/get-messages";
import type { HasKey } from "../methods/has-key";
import type { Scoped } from "../methods/scoped";
import type { SetLocale } from "../methods/set-locale";
import type { Translate } from "../methods/translate";
import type { LocaleNamespaceMessages } from "intor-types";

/**
 * The main Translator interface providing all core i18n methods.
 *
 * This interface is the foundation of the `intor` i18n engine, giving access
 * to all translation utilities and state management.
 *
 * @typeParam Messages - The full shape of all available locale messages.
 *                       Defaults to `LocaleNamespaceMessages`.
 */
export type Translator<
  Messages extends LocaleNamespaceMessages = LocaleNamespaceMessages,
> = {
  /**
   * Get the current active locale.
   *
   * @returns The current locale string (e.g., "en", "zh-TW").
   */
  getLocale: GetLocale<Messages>;

  /**
   * Set the current locale.
   *
   * @param locale - The new locale to switch to.
   */
  setLocale: SetLocale<Messages>;

  /**
   * Get all messages for the current locale.
   *
   * @returns The messages object containing all translation namespaces and keys.
   */
  getMessages: GetMessages<Messages>;

  /**
   * Translate a message by its key with optional replacements.
   *
   * This function is fully type-safe, ensuring that translation keys are valid
   * according to the loaded locale messages.
   *
   * You can use autocompletion and strict checking for nested message keys
   * by providing the locale type.
   *
   * @example
   * ```ts
   * t("home.welcome.title"); // Fully typed with key autocompletion
   * t("dashboard.stats.count", { count: 5 });
   * ```
   *
   * @param key - A dot-separated translation key (e.g., `"common.hello"`).
   * @param replacements - Optional values to replace placeholders in the message.
   * @returns The translated message string.
   */
  t: Translate<Messages>;

  /**
   * Check whether a strongly-typed translation key exists in the loaded messages.
   *
   * This method ensures the key path is valid according to the message schema
   * for a given locale.
   *
   * @example
   * ```ts
   * hasKey("home.welcome.title"); // true or false
   * hasKey("dashboard.stats.count", "zh");
   * ```
   *
   * @param key - A dot-separated message key defined in the locale messages.
   * @param locale - Optional locale to check against. If omitted, defaults to current locale.
   * @returns A boolean indicating whether the key exists.
   */
  hasKey: HasKey<Messages>;

  /**
   * Create a scoped translator bound to a specific namespace.
   *
   * Useful for modular translation logic (e.g., per-page or per-component).
   *
   * @param namespace - The namespace to scope to (e.g., "auth").
   * @returns A new translator with scoped `t()` and helpers.
   */
  scoped: Scoped<Messages>;
};
