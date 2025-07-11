import type { InferTranslatorKey, LocaleKey } from "@/types";
import type { LocaleRef, MessagesRef } from "@/types/translator-refs";

export type HasKeyOptions<M> = {
  messagesRef: MessagesRef<M>;
  localeRef: LocaleRef<M>;
  key: InferTranslatorKey<M>;
  targetLocale?: LocaleKey<M>;
};
