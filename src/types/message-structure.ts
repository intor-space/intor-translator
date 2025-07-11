import type { Locale, LocaleKey, Message, Namespace } from "@/types";

/**
 * A nested message structure or a simple string message.
 * Used to represent either a plain message or an object containing more nested messages.
 *
 * @example
 * const greeting: NestedMessage = "Hello";
 *
 * const userMessages: NestedMessage = {
 *   profile: {
 *     greeting: "Hello, user!",
 *     farewell: "Goodbye!"
 *   }
 * };
 */
export type NestedMessage = Message | { [key: string]: NestedMessage };

/**
 * A record of messages where keys are strings, and values can be strings or nested message objects.
 * Supports deep message trees like `errors.form.required`.
 *
 * @example
 * const messages: MessageRecord = {
 *   greeting: "Hello",
 *   user: {
 *     profile: {
 *       name: "Your Name"
 *     }
 *   }
 * };
 */
export type MessageRecord = Record<string, NestedMessage>;

/**
 * A record of messages grouped by namespace.
 * Each namespace contains its own `MessageRecord` structure.
 *
 * @example
 * const namespaceMessages: NamespaceMessages = {
 *   common: {
 *     hello: "Hello",
 *     goodbye: "Goodbye"
 *   },
 *   auth: {
 *     login: {
 *       success: "Login successful"
 *     }
 *   }
 * };
 */
export type NamespaceMessages = Record<Namespace, NestedMessage>;

/**
 * Messages grouped by locale and then by namespace.
 * Used to structure all available messages for multiple locales and namespaces.
 *
 * @example
 * const messages: LocaleNamespaceMessages = {
 *   en: {
 *     common: {
 *       welcome: "Welcome"
 *     },
 *     auth: {
 *       login: {
 *         success: "Login successful"
 *       }
 *     }
 *   },
 *   "zh-TW": {
 *     common: {
 *       welcome: "歡迎"
 *     }
 *   }
 * };
 */
export type LocaleNamespaceMessages = Record<Locale, NamespaceMessages>;

/**
 * Merges messages from all locales into a single unified structure.
 *
 * @example
 * const messages = {
 *   en: { auth: { login: "Login" } },
 *   zh: { auth: { logout: "登出" } },
 * };
 *
 * type Result = UnionLocaleMessages<typeof messages>;
 * // Result: { auth: { login: "Login" } } | { auth: { logout: "登出" } }
 */
export type UnionLocaleMessages<M> = M[LocaleKey<M>];
