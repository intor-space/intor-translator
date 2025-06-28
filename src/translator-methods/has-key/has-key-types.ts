import type {
  UnionLocaleLeafKeys,
  LocaleKey,
  LocaleNamespaceMessages,
} from "@/types";
import type { LocaleRef, MessagesRef } from "@/types/translator-refs";

export type HasKeyOptions<M extends LocaleNamespaceMessages> = {
  messagesRef: MessagesRef<M>;
  localeRef: LocaleRef<M>;
  key: UnionLocaleLeafKeys<M>;
  targetLocale?: LocaleKey<M>;
};
