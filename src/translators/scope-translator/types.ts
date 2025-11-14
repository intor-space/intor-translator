import type { CoreTranslatorOptions } from "@/translators/core-translator";
import type { Locale, Replacement, LocalizedLeafKeys } from "@/types";

export type ScopeTranslatorOptions<M> = CoreTranslatorOptions<M>;

export type ScopeTranslatorMethods<
  M,
  L extends keyof M | "union" = "union",
  K = LocalizedLeafKeys<M, L>,
> = {
  hasKey: (key?: K, targetLocale?: Locale<M>) => boolean;
  t: <Result = string>(key?: K, replacements?: Replacement) => Result;
};
