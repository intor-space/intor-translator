import type { Locale } from "@/types";

/**
 * A ref object holding all localized messages by locale.
 *
 * @example
 * ```ts
 * const messagesRef: MessagesRef<Messages> = {
 *   current: {
 *     en: { home: { title: "Welcome" } },
 *     zh: { home: { title: "歡迎" } }
 *   }
 * };
 * ```
 */
export type MessagesRef<M = unknown> = {
  current?: Readonly<M>;
};

/**
 * A ref object holding the currently selected locale.
 *
 * @example
 * ```ts
 * const localeRef: LocaleRef<Messages> = {
 *   current: "en"
 * };
 * ```
 */
export type LocaleRef<M = unknown> = {
  current: Locale<M>;
};

/**
 * A ref object indicating whether translation is loading.
 *
 * @example
 * ```ts
 * const isLoadingRef: IsLoadingRef = {
 *   current: true
 * };
 * ```
 */
export type IsLoadingRef = {
  current: boolean;
};
