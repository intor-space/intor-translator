import type {
  LocaleKey,
  LocaleNamespaceMessages,
  InferTranslatorKey,
} from "@/types";
import type { LocaleRef, MessagesRef } from "@/types/translator-refs";

export type HasKeyOptions<M extends LocaleNamespaceMessages> = {
  messagesRef: MessagesRef<M>;
  localeRef: LocaleRef<M>;
  key: InferTranslatorKey<M>;
  targetLocale?: LocaleKey<M>;
};
