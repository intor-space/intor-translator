import type { BaseTranslatorOptions } from "@/translators/base-translator";
import type {
  LocaleKey,
  LocaleNamespaceMessages,
  LocaleRef,
  MessagesRef,
  InferTranslatorKey,
} from "@/types";
import { clearMessageKeyCache } from "@/cache";
import { hasKey } from "@/translator-methods/has-key";

export class BaseTranslator<M = unknown> {
  protected messagesRef: MessagesRef<M> = { current: undefined };
  protected localeRef: LocaleRef<M>;

  constructor(options: BaseTranslatorOptions<M>) {
    this.messagesRef = { current: options.messages };
    this.localeRef = { current: options.locale };
  }

  /** Get all message data. */
  public get messages(): M | undefined {
    return this.messagesRef.current;
  }

  /**
   * Replace messages with new ones.
   *
   * Note: This allows runtime setting of messages even if M is inferred as `never` (uninitialized).
   * Type cast is used to bypass TypeScript restrictions on dynamic messages.
   */
  public setMessages<N extends LocaleNamespaceMessages>(messages: N) {
    this.messagesRef.current = messages as unknown as M;
    clearMessageKeyCache();
  }

  /** Get the current active locale. */
  public get locale(): LocaleKey<M> {
    return this.localeRef.current;
  }

  /** Change the active locale. */
  public setLocale(newLocale: LocaleKey<M>): void {
    this.localeRef.current = newLocale;
  }

  /** Check if a key exists in the specified locale or current locale. */
  public hasKey = (
    key: InferTranslatorKey<M>,
    targetLocale?: LocaleKey<M>,
  ): boolean => {
    return hasKey({
      messagesRef: this.messagesRef,
      localeRef: this.localeRef,
      key,
      targetLocale,
    });
  };
}
