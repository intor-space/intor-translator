import type { TranslateConfig } from "@/translator-methods/translate";
import type {
  LocaleNamespaceMessages,
  Replacement,
  RichReplacement,
  InferTranslatorKey,
} from "@/types";
import type {
  IsLoadingRef,
  LocaleRef,
  MessagesRef,
} from "@/types/translator-refs";

export type TranslateOptions<M extends LocaleNamespaceMessages> = {
  messagesRef: MessagesRef<M>;
  localeRef: LocaleRef<M>;
  isLoadingRef: IsLoadingRef;
  translateConfig: TranslateConfig;
  key: InferTranslatorKey<M>;
  replacements?: Replacement | RichReplacement;
};
