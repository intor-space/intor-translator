/* eslint-disable unicorn/no-useless-undefined */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { translate } from "@/translator-methods/translate/translate";
import { findMessageInLocales } from "@/utils/find-message-in-locales";
import { replaceValues } from "@/utils/replace-values";
import { resolveCandidateLocales } from "@/utils/resolve-candidate-locales";

vi.mock("@/utils/find-message-in-locales");
vi.mock("@/utils/replace-values");
vi.mock("@/utils/resolve-candidate-locales");

describe("translate", () => {
  const messages = {
    en: { hello: "Hello {name}" },
    zh: { hello: "你好 {name}" },
  };
  const locale = "en";
  let isLoading = false;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return formatted message with replacements", () => {
    vi.mocked(resolveCandidateLocales).mockReturnValue(["en"]);
    vi.mocked(findMessageInLocales).mockReturnValue("Hello {name}");
    vi.mocked(replaceValues).mockReturnValue("Hello Yiming");

    const result = translate({
      messages,
      locale,
      isLoading,
      translateConfig: {},
      key: "hello",
      replacements: { name: "Yiming" },
    });

    expect(result).toBe("Hello Yiming");
  });

  it("should use formatHandler if provided", () => {
    vi.mocked(resolveCandidateLocales).mockReturnValue(["en"]);
    vi.mocked(findMessageInLocales).mockReturnValue("Hello {name}");

    const formatHandler = vi.fn().mockReturnValue("Formatted Hello");
    const result = translate({
      messages,
      locale,
      isLoading,
      translateConfig: { handlers: { formatHandler } },
      key: "hello",
      replacements: { name: "Yiming" },
    });

    expect(result).toBe("Formatted Hello");
    expect(formatHandler).toHaveBeenCalled();
  });

  it("should return loadingMessage or loadingHandler if isLoading", () => {
    isLoading = true;
    const loadingHandler = vi.fn().mockReturnValue("Loading...");

    const result = translate({
      messages,
      locale,
      isLoading,
      translateConfig: {
        loadingMessage: "Please wait",
        handlers: { loadingHandler },
      },
      key: "hello",
    });

    expect(result).toBe("Loading...");
    expect(loadingHandler).toHaveBeenCalled();
    isLoading = false;
  });

  it("should return placeholder or key if message missing", () => {
    vi.mocked(resolveCandidateLocales).mockReturnValue(["en"]);
    vi.mocked(findMessageInLocales).mockReturnValue(undefined);

    // missingHandler
    const missingHandler = vi.fn().mockReturnValue("Missing!");
    const result1 = translate({
      messages,
      locale,
      isLoading,
      translateConfig: { handlers: { missingHandler } },
      key: "notExist",
    });
    expect(result1).toBe("Missing!");
    expect(missingHandler).toHaveBeenCalled();

    // placeholder
    const result2 = translate({
      messages,
      locale,
      isLoading,
      translateConfig: { placeholder: "Placeholder" },
      key: "notExist",
    });
    expect(result2).toBe("Placeholder");

    // fallback to key
    const result3 = translate({
      messages,
      locale,
      isLoading,
      translateConfig: {},
      key: "notExist",
    });
    expect(result3).toBe("notExist");
  });

  it("returns message directly if no replacements and no formatHandler", () => {
    vi.mocked(resolveCandidateLocales).mockReturnValue(["en"]);
    vi.mocked(findMessageInLocales).mockReturnValue("Hello");

    const result = translate({
      messages,
      locale,
      isLoading,
      translateConfig: {},
      key: "hello",
    });

    expect(result).toBe("Hello");
  });

  it("returns loadingMessage if isLoading is true and no loadingHandler", () => {
    isLoading = true;

    const result = translate({
      messages,
      locale,
      isLoading,
      translateConfig: {
        loadingMessage: "Please wait",
        handlers: {},
      },
      key: "hello",
    });

    expect(result).toBe("Please wait");
    isLoading = false;
  });
});
