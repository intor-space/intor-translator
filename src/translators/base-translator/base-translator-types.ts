import type { LocaleKey } from "@/types";

export interface BaseTranslatorOptions<M = unknown> {
  messages?: Readonly<M>;
  locale: LocaleKey<M>;
}
