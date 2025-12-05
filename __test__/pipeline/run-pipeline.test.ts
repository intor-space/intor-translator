import type { TranslateContext, TranslateHook } from "@/pipeline/types";
import { describe, it, expect, vi } from "vitest";
import { runPipeline } from "@/pipeline/run-pipeline";

function createCtx(): TranslateContext {
  return {
    locale: "en",
    key: "hello",
    messages: {},
    candidateLocales: [],
    config: {},
    meta: {},
    rawMessage: "RAW",
    finalMessage: undefined,
  };
}

describe("runPipeline", () => {
  it("should return finalMessage when no hook completes", () => {
    const ctx = createCtx();
    ctx.finalMessage = "FINAL";

    const hooks: TranslateHook[] = [
      { name: "a", order: 1, run: () => {} },
      { name: "b", order: 2, run: () => {} },
    ];

    const result = runPipeline(ctx, hooks);

    expect(result).toBe("FINAL");
  });

  it("should fallback to rawMessage when no hook completes and no finalMessage", () => {
    const ctx = createCtx();
    ctx.rawMessage = "RAW_MESSAGE";

    const hooks: TranslateHook[] = [
      { name: "noop1", order: 1, run: () => {} },
      { name: "noop2", order: 2, run: () => {} },
    ];

    const result = runPipeline(ctx, hooks);

    expect(result).toBe("RAW_MESSAGE");
  });

  it("should return value immediately when a hook completes", () => {
    const ctx = createCtx();

    const hooks: TranslateHook[] = [
      {
        name: "first",
        order: 1,
        run: () => ({ done: true, value: "DONE" }),
      },
      {
        name: "second",
        order: 2,
        run: vi.fn(),
      },
    ];

    const result = runPipeline(ctx, hooks);

    expect(result).toBe("DONE");
    expect(hooks[1].run).not.toHaveBeenCalled(); // ensure pipeline stops
  });

  it("should return the value from the hook that completes later", () => {
    const ctx = createCtx();

    const hooks: TranslateHook[] = [
      { name: "1", order: 1, run: () => {} },
      { name: "2", order: 2, run: () => {} },
      {
        name: "3",
        order: 3,
        run: () => ({ done: true, value: "THIRD_DONE" }),
      },
    ];

    const result = runPipeline(ctx, hooks);

    expect(result).toBe("THIRD_DONE");
  });

  it("should run hooks in the provided order", () => {
    const ctx = createCtx();

    const order: string[] = [];

    const hooks: TranslateHook[] = [
      { name: "A", order: 1, run: () => void order.push("A") },
      { name: "B", order: 2, run: () => void order.push("B") },
      { name: "C", order: 3, run: () => void order.push("C") },
    ];

    runPipeline(ctx, hooks);

    expect(order).toEqual(["A", "B", "C"]);
  });
});
