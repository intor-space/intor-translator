import type { LocaleKey } from "@/types";

export interface BaseTranslatorOptions<M> {
  messages?: Readonly<M>;
  locale?: LocaleKey<M>;
}
