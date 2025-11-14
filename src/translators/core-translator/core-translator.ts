import type { CoreTranslatorOptions } from "@/translators/core-translator";
import type {
  Replacement,
  IsLoadingRef,
  LocalizedLeafKey,
  Locale,
} from "@/types";
import { hasKey as hasKeyMethod } from "@/translator-methods/has-key";
import { translate } from "@/translator-methods/translate";
import { BaseTranslator } from "@/translators/base-translator";

export class CoreTranslator<
  M = unknown,
  L extends keyof M | "union" = "union",
> extends BaseTranslator<M> {
  protected options: CoreTranslatorOptions<M>;
  protected isLoadingRef: IsLoadingRef = { current: false };

  constructor(options: CoreTranslatorOptions<M>) {
    super({ locale: options.locale, messages: options.messages });
    this.options = options;
  }

  /** Get the current loading state. */
  public get isLoading(): boolean {
    return this.isLoadingRef.current;
  }

  /** Set the loading state. */
  public setLoading(state: boolean) {
    this.isLoadingRef.current = state;
  }

  /** Check if a key exists in the specified locale or current locale. */
  public hasKey = <K = LocalizedLeafKey<M, L>>(
    key: K,
    targetLocale?: Locale<M>,
  ): boolean => {
    return hasKeyMethod({
      messagesRef: this.messagesRef,
      localeRef: this.localeRef,
      key: key as string,
      targetLocale,
    });
  };

  public t = <
    Result = string,
    L extends keyof M | "union" = "union",
    K = LocalizedLeafKey<M, L>,
  >(
    key: K,
    replacements?: Replacement,
  ): Result => {
    return translate({
      messagesRef: this.messagesRef,
      localeRef: this.localeRef,
      isLoadingRef: this.isLoadingRef,
      translateConfig: this.options,
      key: key as string,
      replacements,
    });
  };
}
