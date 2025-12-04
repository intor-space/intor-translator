import type { ScopeTranslatorMethods, ScopeTranslatorOptions } from "./types";
import type { Locale, Replacement } from "@/types";
import type { LocalizedNodeKeys, ScopedLeafKeys } from "@/types/keys";
import { hasKey as hasKeyMethod } from "@/translator-methods/has-key";
import { translate } from "@/translator-methods/translate";
import { CoreTranslator } from "@/translators/core-translator";
import { getFullKey } from "@/utils/get-full-key";

export class ScopeTranslator<
  M = unknown,
  L extends keyof M | "union" = "union",
> extends CoreTranslator<M> {
  constructor(options: ScopeTranslatorOptions<M>) {
    super(options);
  }

  /** Create a scoped translator with a prefix key, providing `t` and `hasKey` for nested keys. */
  public scoped<PK extends LocalizedNodeKeys<M, L> | undefined = undefined>(
    preKey?: PK,
  ): PK extends string
    ? ScopeTranslatorMethods<M, L, ScopedLeafKeys<M, PK, L>>
    : ScopeTranslatorMethods<M, L> {
    return {
      hasKey: (key?: string, targetLocale?: Locale<M>): boolean => {
        const fullKey = getFullKey(preKey as string | undefined, key);
        return hasKeyMethod({
          messages: this._messages,
          locale: this._locale,
          key: fullKey as string,
          targetLocale,
        });
      },
      t: (key?: string, replacements?: Replacement): string => {
        const fullKey = getFullKey(preKey as string | undefined, key);
        return translate({
          messages: this._messages,
          locale: this._locale,
          isLoading: this._isLoading,
          translateConfig: this.options,
          key: fullKey as string,
          replacements,
        });
      },
    } as PK extends string
      ? ScopeTranslatorMethods<M, L, ScopedLeafKeys<M, PK, L>>
      : ScopeTranslatorMethods<M, L>;
  }
}
