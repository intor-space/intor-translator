import type { LocaleKey, LocaleNamespaceMessages } from "@/types";

export interface BaseTranslatorOptions<M extends LocaleNamespaceMessages> {
  messages: Readonly<M>;
  locale: LocaleKey<M>;
}
