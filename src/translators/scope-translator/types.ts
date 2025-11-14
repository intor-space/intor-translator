import type { Locale, Replacement, LocalizedLeafKey } from "@/types";

export type ScopeTranslatorMethods<
  M,
  L extends keyof M | "union" = "union",
  K = LocalizedLeafKey<M, L>,
> = {
  hasKey: (key?: K, targetLocale?: Locale<M>) => boolean;
  t: <Result = string>(key?: K, replacements?: Replacement) => Result;
};
