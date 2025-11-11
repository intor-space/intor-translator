import type { ScopedTranslatorMethods, TranslatorMethods } from "./types";
import type { CoreTranslatorOptions } from "@/translators/core-translator";
import type {
  LocaleKey,
  UnionLocaleMessages,
  Replacement,
  RichReplacement,
  NodeKeys,
  InferTranslatorKey,
} from "@/types";
import { hasKey } from "@/translator-methods/has-key";
import { translate } from "@/translator-methods/translate";
import { CoreTranslator } from "@/translators/core-translator";
import { getFullKey } from "@/utils/get-full-key";

export class ScopeTranslator<M = unknown> extends CoreTranslator<M> {
  constructor(options: CoreTranslatorOptions<M>) {
    super(options);
  }

  // With prekey
  public scoped<K extends NodeKeys<UnionLocaleMessages<M>> & string>(
    preKey: K,
  ): ScopedTranslatorMethods<M, K>;

  // Without prekey
  public scoped(): TranslatorMethods<M>;

  public scoped(preKey?: string) {
    return {
      hasKey: (key?: string, targetLocale?: LocaleKey<M>): boolean => {
        const fullKey = getFullKey(preKey, key);
        return hasKey({
          messagesRef: this.messagesRef,
          localeRef: this.localeRef,
          key: fullKey as InferTranslatorKey<M>,
          targetLocale,
        });
      },
      t: (
        key?: string,
        replacements?: Replacement | RichReplacement,
      ): string => {
        const fullKey = getFullKey(preKey, key);
        return translate({
          messagesRef: this.messagesRef,
          localeRef: this.localeRef,
          isLoadingRef: this.isLoadingRef,
          translateConfig: this.options,
          key: fullKey as InferTranslatorKey<M>,
          replacements,
        });
      },
    };
  }
}
