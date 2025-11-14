/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// test-d/localized-node-leaf.test-d.ts
import type { LocalizedNodeKeys, LocalizedLeafKeys } from "@/types";
import { expectType } from "tsd";

/**
 * ===========================
 * Test locale messages
 * ===========================
 */
const messages = {
  en: {
    greeting: {
      morning: "morning",
      night: "night",
    },
    farewell: "bye",
  },
  zh: {
    greeting: {
      morning: "早安",
      evening: "晚上好",
    },
    farewell: "再見",
  },
} as const;

const emptyMessages = {} as const;

const singleLocale = {
  en: {
    hello: "hello",
  },
} as const;

/**
 * ===========================
 * LocalizedLeafKeys tests
 * ===========================
 */

// 1. Union of all locales
expectType<
  "greeting.morning" | "greeting.night" | "greeting.evening" | "farewell"
>(null as unknown as LocalizedLeafKeys<typeof messages>);

// 2. Specified locale "en"
expectType<"greeting.morning" | "greeting.night" | "farewell">(
  null as unknown as LocalizedLeafKeys<typeof messages, "en">,
);

// 3. Specified locale "zh"
expectType<"greeting.morning" | "greeting.evening" | "farewell">(
  null as unknown as LocalizedLeafKeys<typeof messages, "zh">,
);

// 4. Single locale
expectType<"hello">(
  null as unknown as LocalizedLeafKeys<typeof singleLocale, "en">,
);

// 5. Empty messages
expectType<never>(null as unknown as LocalizedLeafKeys<typeof emptyMessages>);

// 6. Fallback type when not LocaleMessages
expectType<string>(null as unknown as LocalizedLeafKeys<unknown>);

/**
 * ===========================
 * LocalizedNodeKeys tests
 * ===========================
 */

// 1. Union of all locales
expectType<
  | "greeting"
  | "greeting.morning"
  | "greeting.night"
  | "greeting.evening"
  | "farewell"
>(null as unknown as LocalizedNodeKeys<typeof messages>);

// 2. Specified locale "en"
expectType<"greeting" | "greeting.morning" | "greeting.night" | "farewell">(
  null as unknown as LocalizedNodeKeys<typeof messages, "en">,
);

// 3. Specified locale "zh"
expectType<"greeting" | "greeting.morning" | "greeting.evening" | "farewell">(
  null as unknown as LocalizedNodeKeys<typeof messages, "zh">,
);

// 4. Single locale
expectType<"hello">(
  null as unknown as LocalizedNodeKeys<typeof singleLocale, "en">,
);

// 5. Empty messages
expectType<never>(null as unknown as LocalizedNodeKeys<typeof emptyMessages>);

// 6. Fallback type when not LocaleMessages
expectType<string>(null as unknown as LocalizedNodeKeys<unknown>);
