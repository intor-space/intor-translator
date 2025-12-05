import type { TranslateContext, TranslateHook } from "@/pipeline/types";
import type { TranslateConfig } from "@/translators/core-translator/translate-config.types";
import type { Locale, LocaleMessages, Replacement } from "@/types";
import { runPipeline } from "@/pipeline/run-pipeline";

export type TranslateOptions = {
  hooks: TranslateHook[];
  messages: Readonly<LocaleMessages>;
  locale: Locale;
  isLoading: boolean;
  translateConfig: TranslateConfig;
  key: string;
  replacements?: Replacement;
};

export function translate<Result = string>(options: TranslateOptions): Result {
  const ctx: TranslateContext = {
    ...options,
    config: options.translateConfig,
    candidateLocales: [],
    meta: {},
  };

  return runPipeline(ctx, options.hooks) as Result;
}
