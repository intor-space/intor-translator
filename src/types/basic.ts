/**
 * Represents a locale identifier, such as 'en', 'zh-TW', or 'fr-FR'.
 *
 * @example
 * const locale: Locale = "en";
 */
export type Locale = string;

/**
 * Represents a message namespace.
 * Typically used to group related messages, such as 'common', 'auth', or 'dashboard'.
 *
 * @example
 * const namespace: Namespace = "dashboard";
 */
export type Namespace = string;

/**
 * Represents a single translatable message string.
 *
 * @example
 * const message: Message = "Hello World";
 */
export type Message = string;

/**
 * A recursive replacement object used for interpolating values in message templates.
 *
 * Each key maps to a value that can be a string, number, or another nested `Replacement`.
 * This structure supports deep replacements such as `user.profile.link`.
 *
 * @example
 * const replacements: Replacement = {
 *   name: "intor",
 *   count: 5,
 *   user: {
 *     profile: {
 *       link: "https://example.com/avatar.png"
 *     }
 *   }
 * };
 */
export type Replacement = { [key: string]: string | number | Replacement };
