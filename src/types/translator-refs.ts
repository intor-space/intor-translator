import type { LocaleKey } from "@/types";

/**
 * A ref object holding all localized messages by locale.
 *
 * @example
 * const messagesRef: MessagesRef<AllMessages> = {
 *   current: {
 *     en: { home: { title: "Welcome" } },
 *     zh: { home: { title: "歡迎" } }
 *   }
 * };
 */
export type MessagesRef<M> = {
  current?: Readonly<M>;
};

/**
 * A ref object holding the currently selected locale.
 *
 * @example
 * const localeRef: LocaleRef<AllMessages> = {
 *   current: "en"
 * };
 */
export type LocaleRef<M> = {
  current?: LocaleKey<M>;
};

/**
 * A ref object indicating whether translation is loading.
 *
 * @example
 * const isLoadingRef: IsLoadingRef = {
 *   current: true
 * };
 */
export type IsLoadingRef = {
  current: boolean;
};
