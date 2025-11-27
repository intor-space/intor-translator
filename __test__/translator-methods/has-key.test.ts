/* eslint-disable unicorn/no-useless-undefined */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { hasKey } from "@/translator-methods/has-key/has-key";
import { findMessageInLocales } from "@/utils/find-message-in-locales";
import { resolveCandidateLocales } from "@/utils/resolve-candidate-locales";

// mock utils
vi.mock("@/utils/find-message-in-locales");
vi.mock("@/utils/resolve-candidate-locales");

describe("hasKey", () => {
  const messagesRef = {
    current: { en: { hello: "world" }, zh: { hello: "世界" } },
  };
  const localeRef = { current: "en" };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return true if key exists in messages", () => {
    vi.mocked(resolveCandidateLocales).mockReturnValue(["en"]);
    vi.mocked(findMessageInLocales).mockReturnValue("world");

    const result = hasKey({
      messagesRef,
      localeRef,
      key: "hello",
    });
    expect(result).toBe(true);
  });

  it("should return false if key does not exist", () => {
    vi.mocked(resolveCandidateLocales).mockReturnValue(["en"]);
    vi.mocked(findMessageInLocales).mockReturnValue(undefined);

    const result = hasKey({
      messagesRef,
      localeRef,
      key: "missing",
    });
    expect(result).toBe(false);
  });

  it("should use targetLocale if provided", () => {
    vi.mocked(resolveCandidateLocales).mockReturnValue(["zh"]);
    vi.mocked(findMessageInLocales).mockReturnValue("世界");

    const result = hasKey({
      messagesRef,
      localeRef,
      key: "hello",
      targetLocale: "zh",
    });
    expect(result).toBe(true);
  });
});
