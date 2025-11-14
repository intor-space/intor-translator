export {
  ScopeTranslator,
  ScopeTranslator as Translator, // Alias
} from "@/translators";

export type {
  Replacement,
  // message structure
  NestedMessage,
  LocaleMessages,
  LocaleMessagesUnion,
  // locale
  Locale,
  FallbackLocalesMap,
  // nested keys
  NodeKeys,
  LeafKeys,
  LocalizedLeafKey,
  ScopedLeafKeys,
  // translator refs
  MessagesRef,
  LocaleRef,
  IsLoadingRef,
} from "@/types";

// Translate Config
export {
  TranslateConfig,
  TranslateHandlers,
  FormatHandler,
  LoadingHandler,
  MissingHandler,
  TranslateHandlerContext,
} from "@/translator-methods/translate";
