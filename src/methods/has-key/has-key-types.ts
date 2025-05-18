import type { NestedKeyPaths, RawLocale } from "../../types/locale-types";
import type { Locale, LocaleNamespaceMessages } from "intor-types";

export type HasKey<Messages extends LocaleNamespaceMessages> = {
  <Locale extends RawLocale<Messages>>(
    key: NestedKeyPaths<Messages[Locale]>,
    locale?: Locale,
  ): boolean;
  (key: string, locale?: Locale): boolean;
};

export type LooseHasKey = (key?: string, locale?: Locale) => boolean;
