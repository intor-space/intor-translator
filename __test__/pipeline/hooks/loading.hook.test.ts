import type { TranslateContext } from "@/pipeline/types";
import type { HandlerContext } from "@/translators";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { loadingHook } from "@/pipeline/hooks/loading.hook";
import * as handlerUtil from "@/pipeline/utils/make-handler-context";

describe("loadingHook", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should do nothing when isLoading is false", () => {
    const ctx = {
      isLoading: false,
      config: {},
    } as unknown as TranslateContext;

    const result = loadingHook.run(ctx);

    expect(result).toBeUndefined();
  });

  it("should call loadingHandler and return its result", () => {
    const mockCtxSnapshot = { mock: true } as unknown as HandlerContext;
    const mockResult = "loading-from-handler";

    const makeCtxSpy = vi
      .spyOn(handlerUtil, "makeHandlerContext")
      .mockReturnValue(mockCtxSnapshot);

    const loadingHandler = vi.fn().mockReturnValue(mockResult);

    const ctx = {
      isLoading: true,
      config: {
        handlers: {
          loadingHandler,
        },
      },
    } as unknown as TranslateContext;

    const result = loadingHook.run(ctx);

    // handler called
    expect(loadingHandler).toHaveBeenCalledWith(mockCtxSnapshot);

    // return correct result
    expect(result).toEqual({
      done: true,
      value: mockResult,
    });

    // makeHandlerContext called correctly
    expect(makeCtxSpy).toHaveBeenCalledWith(ctx);
  });

  it("should return loadingMessage when no loadingHandler is provided", () => {
    const ctx = {
      isLoading: true,
      config: {
        loadingMessage: "Loading…",
      },
    } as unknown as TranslateContext;

    const result = loadingHook.run(ctx);

    expect(result).toEqual({
      done: true,
      value: "Loading…",
    });
  });

  it("should return undefined when both handler and loadingMessage are missing", () => {
    const ctx = {
      isLoading: true,
      config: {
        handlers: undefined,
        loadingMessage: undefined,
      },
    } as unknown as TranslateContext;

    const result = loadingHook.run(ctx);

    expect(result).toBeUndefined();
  });
});
