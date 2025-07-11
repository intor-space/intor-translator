import type { TranslateConfig } from "@/translator-methods/translate";
import type { Replacement, RichReplacement, InferTranslatorKey } from "@/types";
import type {
  IsLoadingRef,
  LocaleRef,
  MessagesRef,
} from "@/types/translator-refs";

export type TranslateOptions<M> = {
  messagesRef: MessagesRef<M>;
  localeRef: LocaleRef<M>;
  isLoadingRef: IsLoadingRef;
  translateConfig: TranslateConfig<M>;
  key: InferTranslatorKey<M>;
  replacements?: Replacement | RichReplacement;
};
