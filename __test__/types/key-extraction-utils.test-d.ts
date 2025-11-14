/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// test-d/translator-types.test-d.ts
import type { NodeKeys, LeafKeys } from "@/types";
import { expectType } from "tsd";

/**
 * ===========================
 * Test objects
 * ===========================
 */
const testObj = {
  a: {
    b: {
      c: "hello",
    },
    d: "world",
  },
  e: 42,
} as const;

const emptyObj = {} as const;

const nestedObj = {
  x: {
    y: {
      z: {
        k: "deep",
      },
    },
  },
} as const;

const mixedObj = {
  str: "string",
  num: 123,
  obj: {
    a: "leaf",
    b: 456,
    nested: {
      leafStr: "hi",
      leafNum: 789,
    },
  },
} as const;

/**
 * ===========================
 * NodeKeys: all dot-separated keys (including non-leaf nodes)
 * ===========================
 */
expectType<"a" | "a.b" | "a.b.c" | "a.d" | "e">(
  null as unknown as NodeKeys<typeof testObj>,
);
expectType<never>(null as unknown as NodeKeys<typeof emptyObj>);
expectType<"x" | "x.y" | "x.y.z" | "x.y.z.k">(
  null as unknown as NodeKeys<typeof nestedObj>,
);

expectType<
  | "str"
  | "num"
  | "obj"
  | "obj.a"
  | "obj.b"
  | "obj.nested"
  | "obj.nested.leafStr"
  | "obj.nested.leafNum"
>(null as unknown as NodeKeys<typeof mixedObj>);

/**
 * ===========================
 * LeafKeys: only string leaf keys
 * ===========================
 */
expectType<"a.b.c" | "a.d">(null as unknown as LeafKeys<typeof testObj>);
expectType<never>(null as unknown as LeafKeys<typeof emptyObj>);
expectType<"x.y.z.k">(null as unknown as LeafKeys<typeof nestedObj>);
expectType<"str" | "obj.a" | "obj.nested.leafStr">(
  null as unknown as LeafKeys<typeof mixedObj>,
);

/**
 * ===========================
 * Depth limit test
 * ===========================
 */
type Deep = { a: { b: { c: { d: { e: { f: string } } } } } };
expectType<"a" | "a.b" | "a.b.c" | "a.b.c.d" | "a.b.c.d.e" | "a.b.c.d.e.f">(
  null as unknown as NodeKeys<Deep>,
);
expectType<"a.b.c.d.e.f">(null as unknown as LeafKeys<Deep>);

/**
 * ===========================
 * Non-string keys should be excluded
 * ===========================
 */
type SymbolKeyObj = { [Symbol.iterator]: { str: string } };
expectType<never>(null as unknown as NodeKeys<SymbolKeyObj>);
expectType<never>(null as unknown as LeafKeys<SymbolKeyObj>);

/**
 * ===========================
 * Mixed value types
 * ===========================
 */
const boolNullObj = { bool: true, nullable: null, str: "ok" } as const;
expectType<"bool" | "nullable" | "str">(
  null as unknown as NodeKeys<typeof boolNullObj>,
);
expectType<"str">(null as unknown as LeafKeys<typeof boolNullObj>);
