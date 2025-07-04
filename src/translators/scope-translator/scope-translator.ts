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

  public scoped = <
    K extends NodeKeys<UnionLocaleMessages<M>> & string,
    ScopedKeys extends ScopedLeafKeys<M, K> & string,
  >(
    preKey: K,
  ): {
    hasKey: (key?: ScopedKeys | undefined, targetLocale?: string) => boolean;
    t: (
      key?: ScopedKeys | undefined,
      replacements?: Replacement | RichReplacement,
    ) => string;
  } => {
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
