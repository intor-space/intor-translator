/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// test-d/scoped-leaf-keys.test-d.ts
import type { ScopedLeafKeys } from "@/types";
import { expectType } from "tsd";

/**
 * ===========================
 * Test locale messages
 * ===========================
 */
const messages = {
  en: {
    a: {
      b: { c: "hello" },
      z: "world",
    },
    x: { y: "leaf" },
  },
  zh: {
    a: { b: "hello" },
  },
} as const;

const emptyMessages = {} as const;

/**
 * ===========================
 * ScopedLeafKeys tests
 * ===========================
 */

// 1. Union of all locales, scope "a"
expectType<"b.c" | "b" | "z">(
  null as unknown as ScopedLeafKeys<typeof messages, "a">,
);

// 2. Specified locale "en", scope "a"
expectType<"b.c" | "z">(
  null as unknown as ScopedLeafKeys<typeof messages, "a", "en">,
);

// 3. Specified locale "zh", scope "a"
expectType<"b">(null as unknown as ScopedLeafKeys<typeof messages, "a", "zh">);

// 4. Nested scope "a.b" for "en"
expectType<"c">(
  null as unknown as ScopedLeafKeys<typeof messages, "a.b", "en">,
);

// 5. Nested scope "a.b" for "zh"
expectType<never>(
  null as unknown as ScopedLeafKeys<typeof messages, "a.b", "zh">,
);

// 6. Scope outside keys
expectType<never>(
  null as unknown as ScopedLeafKeys<typeof messages, "nonexistent">,
);

// 7. Single locale, single key
const singleLocale = {
  en: { hello: "world" },
} as const;
expectType<"hello">(
  null as unknown as ScopedLeafKeys<typeof singleLocale, "en">,
);

// 8. Empty messages
expectType<never>(null as unknown as ScopedLeafKeys<typeof emptyMessages, "a">);

// 9. Fallback type when not LocaleMessages
expectType<string>(null as unknown as ScopedLeafKeys<unknown, "any">);

// 10. Deeply nested
const deepMessages = {
  en: { a: { b: { c: { d: { e: "leaf" } } } } },
} as const;
expectType<"b.c.d.e">(
  null as unknown as ScopedLeafKeys<typeof deepMessages, "a", "en">,
);
