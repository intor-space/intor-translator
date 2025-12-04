import type { LocalizedLeafKeys, Locale } from "@/types";

export type HasKeyOptions = {
  messages: Readonly<unknown>;
  locale: Locale<unknown>;
  key: LocalizedLeafKeys;
  targetLocale?: Locale;
};
