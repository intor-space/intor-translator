import type { RawLocale } from "../../types/locale-types";
import type { LocaleNamespaceMessages } from "intor-types";

export type SetLocale<Messages extends LocaleNamespaceMessages> = (
  newLocale: RawLocale<Messages>,
) => void;
