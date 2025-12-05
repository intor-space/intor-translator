// __tests__/pipeline/hooks/resolve-locales.hook.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { resolveLocalesHook } from "@/pipeline/hooks/resolve-locales.hook";
import { type TranslateContext } from "@/pipeline/types";
import * as localeUtil from "@/translators/shared/utils/resolve-candidate-locales";

describe("resolveLocalesHook", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should call resolveCandidateLocales with correct arguments", () => {
    const mockReturn = ["a", "b", "c"];
    const spy = vi
      .spyOn(localeUtil, "resolveCandidateLocales")
      .mockReturnValue(mockReturn);

    const ctx = {
      locale: "zh-TW",
      config: { fallbackLocales: ["zh"] },
      candidateLocales: [],
    } as unknown as TranslateContext;

    resolveLocalesHook.run(ctx);

    expect(spy).toHaveBeenCalledWith("zh-TW", ["zh"]);
    expect(ctx.candidateLocales).toBe(mockReturn);
  });
});
