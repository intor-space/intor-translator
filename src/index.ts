export { ScopeTranslator as Translator } from "./translators";

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
  // translator refs
  MessagesRef,
  LocaleRef,
  IsLoadingRef,
} from "./types";

export {
  TranslateConfig,
  TranslateHandlers,
  FormatMessage,
  OnLoading,
  OnMissing,
  TranslateContext,
} from "./translator-methods/translate";
