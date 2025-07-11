import type { CoreTranslatorOptions } from "@/translators/core-translator";
import type {
  UnionLocaleMessages,
  UnionLocaleLeafKeys,
  LocaleNamespaceMessages,
  Replacement,
  RichReplacement,
  NodeKeys,
  ScopedLeafKeys,
} from "@/types";
import { hasKey } from "@/translator-methods/has-key";
import { translate } from "@/translator-methods/translate";
import { CoreTranslator } from "@/translators/core-translator";
import { getFullKey } from "@/utils/get-full-key";

export class ScopeTranslator<
  M extends LocaleNamespaceMessages = never,
> extends CoreTranslator<M> {
  constructor(options?: CoreTranslatorOptions<M>) {
    super(options);
  }

  // With prekey
  public scoped<K extends NodeKeys<UnionLocaleMessages<M>> & string>(
    preKey: K,
  ): {
    hasKey: (
      key?: ScopedLeafKeys<M, K> & string,
      targetLocale?: string,
    ) => boolean;
    t: (
      key?: ScopedLeafKeys<M, K> & string,
      replacements?: Replacement | RichReplacement,
    ) => string;
  };

  // Without prekey
  public scoped(): {
    hasKey: (
      key?: UnionLocaleLeafKeys<M> & string,
      targetLocale?: string,
    ) => boolean;
    t: (
      key?: UnionLocaleLeafKeys<M> & string,
      replacements?: Replacement | RichReplacement,
    ) => string;
  };

  public scoped(preKey?: string) {
    return {
      hasKey: (key?: string, targetLocale?: string): boolean => {
        const fullKey = getFullKey(preKey, key);
        return hasKey({
          messagesRef: this.messagesRef,
          localeRef: this.localeRef,
          key: fullKey as UnionLocaleLeafKeys<M>,
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
          key: fullKey as UnionLocaleLeafKeys<M>,
          replacements,
        });
      },
    };
  }
}
