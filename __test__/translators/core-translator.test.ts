import type { CoreTranslatorOptions } from "@/translators/core-translator";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as hasKeyModule from "@/translator-methods/has-key";
import * as translateModule from "@/translator-methods/translate";
import { CoreTranslator } from "@/translators/core-translator/core-translator";

vi.mock("@/translator-methods/has-key");
vi.mock("@/translator-methods/translate");

describe("CoreTranslator", () => {
  const messages = { en: { hello: "Hello" }, zh: { hello: "你好" } };
  const locale = "en";

  const options: CoreTranslatorOptions<typeof messages> = {
    messages,
    locale,
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should initialize with given messages and locale", () => {
    const translator = new CoreTranslator(options);
    expect(translator.messages).toEqual(messages);
    expect(translator.locale).toBe(locale);
    expect(translator.isLoading).toBe(false);
  });

  it("hasKey should call hasKeyMethod with correct arguments", () => {
    const translator = new CoreTranslator(options);
    const key = "hello";
    const targetLocale = "zh";
    const spy = vi.mocked(hasKeyModule.hasKey).mockReturnValue(true);

    const result = translator.hasKey(key, targetLocale);
    expect(result).toBe(true);
    expect(spy).toHaveBeenCalledWith({
      messagesRef: translator["messagesRef"],
      localeRef: translator["localeRef"],
      key,
      targetLocale,
    });
  });

  it("t should call translate with correct arguments and return result", () => {
    const translator = new CoreTranslator(options);
    const key = "hello";
    const replacements = { name: "Yiming" };
    const spy = vi
      .mocked(translateModule.translate)
      .mockReturnValue("Hello Yiming");

    const result = translator.t(key, replacements);
    expect(result).toBe("Hello Yiming");
    expect(spy).toHaveBeenCalledWith({
      messagesRef: translator["messagesRef"],
      localeRef: translator["localeRef"],
      isLoadingRef: translator["isLoadingRef"],
      translateConfig: options,
      key,
      replacements,
    });
  });
});
