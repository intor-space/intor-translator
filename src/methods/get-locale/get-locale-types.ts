import type { RawLocale } from "../../types/locale-types";
import type { LocaleNamespaceMessages } from "intor-types";

export type GetLocale<Messages extends LocaleNamespaceMessages> =
  () => RawLocale<Messages>;
