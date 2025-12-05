/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ScopedLeafKeys } from "@/types";
import { expectType } from "tsd";

/**
 * ===========================
 * Base test messages
 * ===========================
 */
const messages = {
  en: {
    a: {
      b: { c: { d: "deep" } },
      z: "world",
    },
  },
  zh: {
    a: {
      b: { x: "哈囉" },
    },
  },
} as const;

/**
 * ===========================
 * 1. Cross-locale union merging
 * ===========================
 * en.a.b → { c: { d } }
 * en.a.z → "world"
 * zh.a.b → { x }
 *
 * Union → "b.c.d" | "b.x" | "z"
 */
expectType<"b.c.d" | "b.x" | "z">(
  null as unknown as ScopedLeafKeys<typeof messages, "a">,
);

/**
 * ===========================
 * 2. Specific locale narrowing
 * ===========================
 */
expectType<"b.c.d" | "z">(
  null as unknown as ScopedLeafKeys<typeof messages, "a", "en">,
);

expectType<"b.x">(
  null as unknown as ScopedLeafKeys<typeof messages, "a", "zh">,
);

/**
 * ===========================
 * 3. Prefix is leaf → should be never
 * ===========================
 * en.a.z = "world" (leaf)
 * zh.a.z = not exist
 *
 * ScopedLeafKeys<..., "a.z"> must be never — because "a.z" is not a subtree.
 */
expectType<never>(null as unknown as ScopedLeafKeys<typeof messages, "a.z">);

/**
 * ===========================
 * 4. Prefix is deeper leaf
 * ===========================
 * en.a.b.c = { d }
 * zh.a.b.c = not exist
 *
 * ScopedLeafKeys<..., "a.b.c.d"> → "never"
 */
expectType<never>(
  null as unknown as ScopedLeafKeys<typeof messages, "a.b.c.d">,
);

/**
 * ===========================
 * 5. Depth limitation (optional enhancement)
 * ===========================
 */
const deepMessages = {
  en: {
    a: {
      b: {
        c: {
          d: {
            e: {
              f: "leaf",
            },
          },
        },
      },
    },
  },
} as const;

/**
 * ============================================
 * 5. Depth limitation behavior (DefaultDepth)
 * ============================================
 *
 * ScopedLeafKeys uses `LeafKeys`, which stops recursion after `D` steps.
 *
 * Example structure:
 * a.b.c.d.e.f = "leaf"
 *
 * Depth analysis:
 * a → b → c → d → e → f
 *      (depth = 6)
 *
 * Case 1 — D = 4:
 *   Recursion trims after 4 levels:
 *   Extracted: "b.c.d.e"
 *
 * Case 2 — D = 5:
 *   Allowed depth increases, so extraction includes:
 *   "b.c.d.e.f"
 *
 * So the type result can differ depending on `D`.
 */

// D = 4 → recursion stops early
expectType<"b.c.d.e" | "b.c.d.e.f">(
  null as unknown as ScopedLeafKeys<typeof deepMessages, "a", "en", 4>,
);

// D = 5 → deeper leaf becomes available
expectType<"b.c.d.e.f">(
  null as unknown as ScopedLeafKeys<typeof deepMessages, "a", "en", 5>,
);

/**
 * ===========================
 * 6. Locale not existing
 * ===========================
 */
expectType<string>(
  // @ts-expect-error invalid locale
  null as unknown as ScopedLeafKeys<typeof messages, "a", "fr">,
);

/**
 * ===========================
 * 7. Prefix partially exists in some locales
 * ===========================
 */
const mixMessages = {
  en: { home: { title: "Home", desc: "desc" } },
  zh: { home: { title: "首頁" } },
} as const;

// leaf union: "title" | "desc"
expectType<"title" | "desc">(
  null as unknown as ScopedLeafKeys<typeof mixMessages, "home">,
);
