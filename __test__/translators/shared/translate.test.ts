import type { TranslateHook } from "@/pipeline/types";
import type { TranslateConfig } from "@/translators/core-translator/translate-config.types";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as runPipelineModule from "@/pipeline/run-pipeline";
import { translate } from "@/translators/shared/translate";

vi.mock("@/pipeline/run-pipeline", () => ({
  runPipeline: vi.fn(),
}));

describe("translate()", () => {
  const messages = { en: { hello: "Hello" }, zh: { hello: "你好" } };
  const hooks: TranslateHook[] = [{ name: "mockHook", run: vi.fn() }];

  const locale = "en";

  const translateConfig = {
    messages,
    locale,
  } as TranslateConfig;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call runPipeline with correct context and hooks", () => {
    const spy = vi
      .mocked(runPipelineModule.runPipeline)
      .mockReturnValue("TRANSLATED");

    const result = translate({
      hooks,
      messages,
      locale,
      isLoading: false,
      translateConfig,
      key: "hello",
      replacements: { name: "Yiming" },
    });

    expect(result).toBe("TRANSLATED");

    expect(spy).toHaveBeenCalledTimes(1);

    // get the actual context passed to runPipeline
    const ctxArg = spy.mock.calls[0][0];

    // validate context structure
    expect(ctxArg.messages).toBe(messages);
    expect(ctxArg.locale).toBe(locale);
    expect(ctxArg.isLoading).toBe(false);
    expect(ctxArg.config).toBe(translateConfig);
    expect(ctxArg.key).toBe("hello");
    expect(ctxArg.replacements).toEqual({ name: "Yiming" });

    // candidateLocales/meta should be initialized defaults
    expect(ctxArg.candidateLocales).toEqual([]);
    expect(ctxArg.meta).toEqual({});
  });

  it("should work without replacements", () => {
    const spy = vi
      .mocked(runPipelineModule.runPipeline)
      .mockReturnValue("NO_REPLACEMENTS");

    const result = translate({
      hooks,
      messages,
      locale,
      isLoading: false,
      translateConfig,
      key: "hello",
    });

    expect(result).toBe("NO_REPLACEMENTS");

    const ctxArg = spy.mock.calls[0][0];

    // ensure replacements is undefined when not provided
    expect(ctxArg.replacements).toBeUndefined();
  });
});
