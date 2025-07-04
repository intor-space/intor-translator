import type { BaseTranslatorOptions } from "@/translators/base-translator";
import type {
  LocaleNamespaceMessages,
  LocaleKey,
  LocaleRef,
  MessagesRef,
  InferTranslatorKey,
} from "@/types";
import { clearMessageKeyCache } from "@/cache";
import { hasKey } from "@/translator-methods/has-key";

export class BaseTranslator<M extends LocaleNamespaceMessages = never> {
  protected messagesRef: MessagesRef<M> = { current: undefined };
  protected localeRef: LocaleRef<M> = { current: undefined };

  constructor(options: BaseTranslatorOptions<M> = {}) {
    if (options.messages) {
      this.messagesRef.current = options.messages;
    }
    if (options.locale) {
      this.localeRef.current = options.locale;
    }
  }

  /** Get all message data. */
  public get messages(): M | undefined {
    return this.messagesRef.current;
  }

  /** Replace messages with new ones. */
  public setMessages(messages: M): void {
    this.messagesRef.current = messages;
    clearMessageKeyCache();
  }

  /** Get the current active locale. */
  public get locale(): LocaleKey<M> | undefined {
    return this.localeRef.current;
  }

  /** Change the active locale if available. */
  public setLocale(newLocale: LocaleKey<M>): boolean {
    if (this.messagesRef.current && newLocale in this.messagesRef.current) {
      this.localeRef.current = newLocale;
      return true;
    }
    return false;
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
