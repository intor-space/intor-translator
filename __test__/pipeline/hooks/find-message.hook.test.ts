/* eslint-disable unicorn/no-useless-undefined */
import type { TranslateContext } from "@/pipeline/types";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { findMessageHook } from "@/pipeline/hooks/find-message.hook";
import * as findUtil from "@/translators/shared/utils/find-message-in-locales";

describe("findMessageHook", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should call findMessageInLocales with correct arguments and set ctx.rawMessage", () => {
    const mockResult = "Hello from mock";
    const spy = vi
      .spyOn(findUtil, "findMessageInLocales")
      .mockReturnValue(mockResult);

    const ctx = {
      messages: {
        en: { hello: "Hello" },
        zh: { hello: "你好" },
      },
      candidateLocales: ["zh", "en"],
      key: "hello",
      rawMessage: undefined,
    } as unknown as TranslateContext;

    // run hook
    findMessageHook.run(ctx);

    // ensure utility was called
    expect(spy).toHaveBeenCalledWith({
      messages: ctx.messages,
      candidateLocales: ctx.candidateLocales,
      key: ctx.key,
    });

    // ensure hook sets rawMessage correctly
    expect(ctx.rawMessage).toBe(mockResult);
  });

  it("should set rawMessage to undefined when util returns undefined", () => {
    vi.spyOn(findUtil, "findMessageInLocales").mockReturnValue(undefined);

    const ctx = {
      messages: {},
      candidateLocales: ["en"],
      key: "missingKey",
      rawMessage: "previousValue",
    } as unknown as TranslateContext;

    findMessageHook.run(ctx);

    expect(ctx.rawMessage).toBeUndefined();
  });
});
