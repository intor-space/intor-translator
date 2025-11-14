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
  const messagesRef = {
    current: { en: { hello: "Hello {name}" }, zh: { hello: "你好 {name}" } },
  };
  const localeRef = { current: "en" };
  const isLoadingRef = { current: false };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return formatted message with replacements", () => {
    vi.mocked(resolveCandidateLocales).mockReturnValue(["en"]);
    vi.mocked(findMessageInLocales).mockReturnValue("Hello {name}");
    vi.mocked(replaceValues).mockReturnValue("Hello Yiming");

    const result = translate({
      messagesRef,
      localeRef,
      isLoadingRef,
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
      messagesRef,
      localeRef,
      isLoadingRef,
      translateConfig: { handlers: { formatHandler } },
      key: "hello",
      replacements: { name: "Yiming" },
    });

    expect(result).toBe("Formatted Hello");
    expect(formatHandler).toHaveBeenCalled();
  });

  it("should return loadingMessage or loadingHandler if isLoading", () => {
    isLoadingRef.current = true;
    const loadingHandler = vi.fn().mockReturnValue("Loading...");

    const result = translate({
      messagesRef,
      localeRef,
      isLoadingRef,
      translateConfig: {
        loadingMessage: "Please wait",
        handlers: { loadingHandler },
      },
      key: "hello",
    });

    expect(result).toBe("Loading...");
    expect(loadingHandler).toHaveBeenCalled();
    isLoadingRef.current = false;
  });

  it("should return placeholder or key if message missing", () => {
    vi.mocked(resolveCandidateLocales).mockReturnValue(["en"]);
    vi.mocked(findMessageInLocales).mockReturnValue(undefined);

    // missingHandler
    const missingHandler = vi.fn().mockReturnValue("Missing!");
    const result1 = translate({
      messagesRef,
      localeRef,
      isLoadingRef,
      translateConfig: { handlers: { missingHandler } },
      key: "notExist",
    });
    expect(result1).toBe("Missing!");
    expect(missingHandler).toHaveBeenCalled();

    // placeholder
    const result2 = translate({
      messagesRef,
      localeRef,
      isLoadingRef,
      translateConfig: { placeholder: "Placeholder" },
      key: "notExist",
    });
    expect(result2).toBe("Placeholder");

    // fallback to key
    const result3 = translate({
      messagesRef,
      localeRef,
      isLoadingRef,
      translateConfig: {},
      key: "notExist",
    });
    expect(result3).toBe("notExist");
  });

  it("should throw if messagesRef.current is undefined", () => {
    const badMessagesRef = { current: undefined };
    expect(() =>
      translate({
        messagesRef: badMessagesRef,
        localeRef,
        isLoadingRef,
        translateConfig: {},
        key: "hello",
      }),
    ).toThrow("[intor-translator] 'messages' is required");
  });

  it("returns message directly if no replacements and no formatHandler", () => {
    vi.mocked(resolveCandidateLocales).mockReturnValue(["en"]);
    vi.mocked(findMessageInLocales).mockReturnValue("Hello");

    const result = translate({
      messagesRef,
      localeRef,
      isLoadingRef,
      translateConfig: {},
      key: "hello",
    });

    expect(result).toBe("Hello");
  });

  it("returns loadingMessage if isLoading is true and no loadingHandler", () => {
    isLoadingRef.current = true;

    const result = translate({
      messagesRef,
      localeRef,
      isLoadingRef,
      translateConfig: {
        loadingMessage: "Please wait",
        handlers: {},
      },
      key: "hello",
    });

    expect(result).toBe("Please wait");
    isLoadingRef.current = false;
  });
});
