export { ScopeTranslator as Translator } from "../src/translators";

export type {
  // basic
  Locale,
  Message,
  Namespace,
  Replacement,
  // rich replacement
  RichReplacement,
  // message structure
  NestedMessage,
  MessageRecord,
  NamespaceMessages,
  LocaleNamespaceMessages,
  UnionLocaleMessages,
  // locale
  LocaleKey,
  StrictLocaleKey,
  FallbackLocalesMap,
  // nested keys
  NodeKeys,
  LeafKeys,
  UnionLocaleLeafKeys,
  ScopedLeafKeys,
  InferTranslatorKey,
  // translator refs
  MessagesRef,
  LocaleRef,
  IsLoadingRef,
} from "../src/types";

// Translate Config
export {
  TranslateConfig,
  TranslateHandlers,
  FormatMessage,
  OnLoading,
  OnMissing,
  TranslateContext,
} from "../src/translator-methods/translate";
