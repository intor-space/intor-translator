import type { TranslateConfig } from "@/translator-methods/translate";
import type { Replacement, LocalizedLeafKeys } from "@/types";
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
  key: LocalizedLeafKeys;
  replacements?: Replacement;
};
