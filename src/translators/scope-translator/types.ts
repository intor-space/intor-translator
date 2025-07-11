import type {
  LocaleKey,
  Replacement,
  RichReplacement,
  ScopedLeafKeys,
  InferTranslatorKey,
} from "@/types";

export type ScopedTranslatorMethods<M, K extends string> = {
  hasKey: (
    key?: ScopedLeafKeys<M, K> & string,
    targetLocale?: LocaleKey<M>,
  ) => boolean;
  t: (
    key?: ScopedLeafKeys<M, K> & string,
    replacements?: Replacement | RichReplacement,
  ) => string;
};

export type TranslatorMethods<M> = {
  hasKey: (
    key?: InferTranslatorKey<M> & string,
    targetLocale?: LocaleKey<M>,
  ) => boolean;
  t: (
    key?: InferTranslatorKey<M> & string,
    replacements?: Replacement | RichReplacement,
  ) => string;
};
