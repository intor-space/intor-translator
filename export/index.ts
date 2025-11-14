// Translator
export {
  ScopeTranslator,
  ScopeTranslator as Translator, // Alias
  type ScopeTranslatorOptions,
  type ScopeTranslatorMethods,
} from "@/translators";

// Translate handlers
export type {
  TranslateHandlers,
  FormatHandler,
  LoadingHandler,
  MissingHandler,
  TranslateHandlerContext,
} from "@/translator-methods/translate";

export type {
  // Locale
  Locale,
  FallbackLocalesMap,
  // Messages
  NestedMessage,
  LocaleMessages,
  LocalizedMessagesUnion,
  // Replacement
  Replacement,
  // Keys
  NodeKeys,
  LeafKeys,
  LocalizedNodeKeys,
  LocalizedLeafKeys,
  ScopedLeafKeys,
  // Translator refs
  MessagesRef,
  LocaleRef,
  IsLoadingRef,
} from "@/types";
