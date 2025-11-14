import type { TranslateConfig } from "@/translator-methods/translate";
import type { Replacement, LocalizedLeafKey } from "@/types";
import type {
  IsLoadingRef,
  LocaleRef,
  MessagesRef,
} from "@/types/translator-refs";

export type TranslateOptions = {
  messagesRef: MessagesRef;
  localeRef: LocaleRef;
  isLoadingRef: IsLoadingRef;
  translateConfig: TranslateConfig;
  key: LocalizedLeafKey;
  replacements?: Replacement;
};
