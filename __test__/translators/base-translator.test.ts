import { describe, it, expect } from "vitest";
import { BaseTranslator } from "@/translators/base-translator/base-translator";

describe("BaseTranslator", () => {
  const messages = {
    en: { hello: "Hello" },
    zh: { hello: "你好" },
  };

  it("should initialize with given messages and locale", () => {
    const translator = new BaseTranslator({
      messages,
      locale: "en",
    });

    expect(translator.messages).toEqual(messages);
    expect(translator.locale).toBe("en");
  });

  it("should return undefined if no messages provided", () => {
    const translator = new BaseTranslator({
      messages: undefined,
      locale: "en",
    });

    expect(translator.messages).toBeUndefined();
    expect(translator.locale).toBe("en");
  });

  it("should update messages using setMessages", () => {
    const translator = new BaseTranslator({
      messages: { en: { hello: "" }, zh: { hello: "" } },
      locale: "en",
    });

    const newMessages = {
      en: { hello: "Hello Updated" },
      zh: { hello: "你好更新" },
    };

    translator.setMessages(newMessages);
    expect(translator.messages).toEqual(newMessages);
  });

  it("should update locale using setLocale", () => {
    const translator = new BaseTranslator({
      messages,
      locale: "en",
    });

    translator.setLocale("zh");
    expect(translator.locale).toBe("zh");
  });

  it("should allow setting messages of any compatible shape", () => {
    const translator = new BaseTranslator({
      messages: messages,
      locale: "en",
    });

    // 使用 setMessages 強制覆蓋型別
    const overrideMessages = {
      en: { hello: "Override" },
      zh: { hello: "覆蓋" },
    };
    translator.setMessages(overrideMessages);
    expect(translator.messages).toEqual(overrideMessages);
  });
});
