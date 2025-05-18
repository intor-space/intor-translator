import type { NestedKeyPaths, RawLocale } from "../../types/locale-types";
import type {
  LocaleNamespaceMessages,
  Replacement,
  RichReplacement,
} from "intor-types";

export type Translate<Messages extends LocaleNamespaceMessages> = {
  <Locale extends RawLocale<Messages>>(
    key: NestedKeyPaths<Messages[Locale]>,
    replacements?: Replacement | RichReplacement,
  ): string;
  (key: string, replacements?: Replacement | RichReplacement): string;
};

export type LooseTranslate = (
  key?: string,
  replacements?: Replacement | RichReplacement,
) => string;
