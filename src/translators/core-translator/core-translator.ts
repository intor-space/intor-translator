import type { CoreTranslatorOptions } from "./types";
import type { Replacement, LocalizedLeafKeys, Locale } from "@/types";
import { hasKey as hasKeyMethod } from "@/translator-methods/has-key";
import { translate } from "@/translator-methods/translate";
import { BaseTranslator } from "@/translators/base-translator";

export class CoreTranslator<
  M = unknown,
  L extends keyof M | "union" = "union",
> extends BaseTranslator<M> {
  protected options: CoreTranslatorOptions<M>;

  constructor(options: CoreTranslatorOptions<M>) {
    super({
      locale: options.locale,
      messages: options.messages,
      isLoading: options.isLoading,
    });
    this.options = options;
  }

  /** Check if a key exists in the specified locale or current locale. */
  public hasKey = <K = LocalizedLeafKeys<M, L>>(
    key: K,
    targetLocale?: Locale<M>,
  ): boolean => {
    return hasKeyMethod({
      messages: this._messages,
      locale: this._locale,
      key: key as string,
      targetLocale,
    });
  };

  /** Get the translated message for a key, with optional replacements. */
  public t = <Result = string, K = LocalizedLeafKeys<M, L>>(
    key: K,
    replacements?: Replacement,
  ): Result => {
    return translate({
      messages: this._messages,
      locale: this._locale,
      isLoading: this._isLoading,
      translateConfig: this.options,
      key: key as string,
      replacements,
    });
  };
}
