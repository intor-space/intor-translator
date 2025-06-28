import type { TranslateConfig } from "@/translator-methods/translate";
import type { BaseTranslatorOptions } from "@/translators/base-translator";
import type { LocaleNamespaceMessages } from "@/types";

export interface CoreTranslatorOptions<M extends LocaleNamespaceMessages>
  extends BaseTranslatorOptions<M>,
    TranslateConfig {}
