import type { LocaleNamespaceMessages } from "intor-types";

export type GetMessages<Messages extends LocaleNamespaceMessages> =
  () => Readonly<Messages>;
