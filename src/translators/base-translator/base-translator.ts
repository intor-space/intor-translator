import type { BaseTranslatorOptions } from "./types";
import type {
  IsLoadingRef,
  Locale,
  LocaleMessages,
  LocaleRef,
  MessagesRef,
} from "@/types";

export class BaseTranslator<M = unknown> {
  /** Current messages for translation */
  protected messagesRef: MessagesRef<M>;
  /** Current active locale */
  protected localeRef: LocaleRef<M>;
  /** Current loading state */
  protected isLoadingRef: IsLoadingRef;

  constructor(options: BaseTranslatorOptions<M>) {
    this.messagesRef = { current: options.messages ?? ({} as M) };
    this.localeRef = { current: options.locale };
    this.isLoadingRef = { current: options.isLoading ?? false };
  }

  /** Get messages. */
  public get messages(): M | undefined {
    return this.messagesRef.current;
  }

  /** Get the current active locale. */
  public get locale(): Locale<M> {
    return this.localeRef.current;
  }

  /** Get the current loading state. */
  public get isLoading(): boolean {
    return this.isLoadingRef.current;
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

  /** Set the loading state. */
  public setLoading(state: boolean) {
    this.isLoadingRef.current = state;
  }
}
