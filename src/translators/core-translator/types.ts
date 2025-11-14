import type { TranslateConfig } from "@/translator-methods/translate";
import type { BaseTranslatorOptions } from "@/translators/base-translator";

export interface CoreTranslatorOptions<M>
  extends BaseTranslatorOptions<M>,
    TranslateConfig<M> {}
