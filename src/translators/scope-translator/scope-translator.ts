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
  M extends LocaleNamespaceMessages,
> extends CoreTranslator<M> {
  constructor(options: CoreTranslatorOptions<M>) {
    super(options);
    this.options = options;
  }

  public scoped = <K extends NodeKeys<UnionLocaleMessages<M>> & string>(
    preKey: K,
  ) => {
    type ScopedKeys = ScopedLeafKeys<M, K> & string;

    return {
      hasKey: (key?: ScopedKeys, targetLocale?: string): boolean => {
        const fullKey = getFullKey(preKey, key);
        return hasKey({
          messagesRef: this.messagesRef,
          localeRef: this.localeRef,
          key: fullKey as UnionLocaleLeafKeys<M>,
          targetLocale,
        });
      },

      t: (
        key?: ScopedKeys,
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
  };
}
