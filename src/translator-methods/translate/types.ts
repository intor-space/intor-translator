import type { TranslateConfig } from "@/translator-methods/translate";
import type { Replacement, LocalizedLeafKeys, Locale } from "@/types";

export type TranslateOptions = {
  messages: Readonly<unknown>;
  locale: Locale<unknown>;
  isLoading: boolean;
  translateConfig: TranslateConfig;
  key: LocalizedLeafKeys;
  replacements?: Replacement;
};
