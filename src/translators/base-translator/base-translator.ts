import type { BaseTranslatorOptions } from "./types";
import type { Locale, LocaleMessages, LocaleRef, MessagesRef } from "@/types";

export class BaseTranslator<M = unknown> {
  /** Current messages for translation, updatable at runtime */
  protected messagesRef: MessagesRef<M> = { current: undefined };
  /** Current active locale, can be changed dynamically */
  protected localeRef: LocaleRef<M>;

  constructor(options: BaseTranslatorOptions<M>) {
    this.messagesRef = { current: options.messages };
    this.localeRef = { current: options.locale };
  }

  /** Get messages. */
  public get messages(): M | undefined {
    return this.messagesRef.current;
  }

  /** Get the current active locale. */
  public get locale(): Locale<M> {
    return this.localeRef.current;
  }

  /**
   * Replace messages with new ones.
   *
   * - Note: This allows runtime setting of messages even if `M` is inferred as `never`.
   * The type cast bypasses TypeScript restrictions on dynamic messages.
   */
  public setMessages<N extends LocaleMessages>(messages: N) {
    this.messagesRef.current = messages as unknown as M;
  }

  /**
   * Set the active locale.
   *
   * - Note: Unlike `setMessages`, the locale structure cannot be changed at runtime.
   */
  public setLocale(newLocale: Locale<M>): void {
    this.localeRef.current = newLocale;
  }
}
