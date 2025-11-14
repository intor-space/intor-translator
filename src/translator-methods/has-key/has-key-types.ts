import type { LocalizedLeafKey, Locale } from "@/types";
import type { LocaleRef, MessagesRef } from "@/types/translator-refs";

export type HasKeyOptions = {
  messagesRef: MessagesRef;
  localeRef: LocaleRef;
  key: LocalizedLeafKey;
  targetLocale?: Locale;
};
