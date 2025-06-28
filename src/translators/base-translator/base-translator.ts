import type { BaseTranslatorOptions } from "@/translators/base-translator";
import type {
  LocaleNamespaceMessages,
  LocaleKey,
  UnionLocaleLeafKeys,
  LocaleRef,
  MessagesRef,
} from "@/types";
import { clearMessageKeyCache } from "@/cache";
import { hasKey } from "@/translator-methods/has-key";

export class BaseTranslator<M extends LocaleNamespaceMessages> {
  protected options: BaseTranslatorOptions<M>;
  protected messagesRef: MessagesRef<M> = { current: {} as M };
  protected localeRef: LocaleRef<M> = { current: "" as LocaleKey<M> };

  constructor(options: BaseTranslatorOptions<M>) {
    if (!options.messages) {
      throw new Error("[intor-translator] 'messages' is required");
    }
    if (!options.locale) {
      throw new Error("[intor-translator] 'locale' is required");
    }

    this.options = options;
    this.messagesRef.current = options.messages;
    this.localeRef.current = options.locale;
  }

  /** Get all message data. */
  public get messages(): M {
    return this.messagesRef.current;
  }

  /** Replace messages with new ones. */
  public setMessages(messages: M): void {
    this.messagesRef.current = messages;
    clearMessageKeyCache();
  }

  /** Get the current active locale. */
  public get locale(): LocaleKey<M> {
    return this.localeRef.current;
  }

  /** Change the active locale if available. */
  public setLocale(newLocale: LocaleKey<M>): boolean {
    if (newLocale in this.messagesRef.current) {
      this.localeRef.current = newLocale;
      return true;
    }
    return false;
  }

  /** Check if a key exists in the specified locale or current locale. */
  public hasKey = (
    key: UnionLocaleLeafKeys<M>,
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
