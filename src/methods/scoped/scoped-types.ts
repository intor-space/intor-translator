import type { NestedKeyPaths, RawLocale } from "../../types/locale-types";
import type { LooseHasKey } from "../has-key/has-key-types";
import type { LooseTranslate } from "../translate/translate-types";
import type { LocaleNamespaceMessages } from "intor-types";

export type Scoped<Messages extends LocaleNamespaceMessages> = <
  Locale extends RawLocale<Messages>,
>(
  preKey?: NestedKeyPaths<Messages[Locale]>,
) => {
  t: LooseTranslate;
  hasKey: LooseHasKey;
};
