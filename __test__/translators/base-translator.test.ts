import { clearMessageKeyCache } from "@/cache";
import { hasKey } from "@/translator-methods/has-key";
import { BaseTranslator } from "@/translators/base-translator";

jest.mock("@/cache", () => ({
  clearMessageKeyCache: jest.fn(),
}));
jest.mock("@/translator-methods/has-key", () => ({
  hasKey: jest.fn(),
}));

const messages = {
  en: { greeting: "Hello", nested: { message: "Nested!" } },
  zh: { greeting: "哈囉" },
};

describe("BaseTranslator", () => {
  describe("constructor()", () => {
    it("should initialize with messages and locale", () => {
      const translator = new BaseTranslator({ messages, locale: "en" });
      expect(translator.locale).toBe("en");
      expect(translator.messages).toEqual(messages);
    });
  });

  describe("setMessages()", () => {
    it("should replace messages and clear key cache", () => {
      const newMessages = {
        en: { greeting: "Hi there", nested: { message: "Nested!" } },
        zh: { greeting: "你好" },
      };

      const translator = new BaseTranslator({ messages, locale: "en" });
      expect(translator.messages).toBe(messages);

      translator.setMessages(newMessages);

      expect(translator.messages).toBe(newMessages);
      expect(clearMessageKeyCache).toHaveBeenCalled();
    });
  });

  describe("setLocale()", () => {
    it("should return true when setting a valid locale", () => {
      const translator = new BaseTranslator({ messages, locale: "en" });
      translator.setLocale("zh");
      expect(translator.locale).toBe("zh");
    });
  });

  describe("hasKey()", () => {
    it("should delegate hasKey to imported hasKey function", () => {
      const mockHasKey = hasKey as jest.Mock;
      mockHasKey.mockReturnValue(true);

      const translator = new BaseTranslator({ messages, locale: "en" });
      const result = translator.hasKey("greeting");

      expect(result).toBe(true);
      expect(mockHasKey).toHaveBeenCalledWith(
        expect.objectContaining({
          messagesRef: { current: messages },
          localeRef: { current: "en" },
          key: "greeting",
          targetLocale: undefined,
        }),
      );
    });

    it("should pass targetLocale when provided", () => {
      const mockHasKey = hasKey as jest.Mock;
      mockHasKey.mockReturnValue(false);

      const translator = new BaseTranslator({ messages, locale: "en" });
      const result = translator.hasKey("greeting", "zh");

      expect(result).toBe(false);
      expect(mockHasKey).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "greeting",
          targetLocale: "zh",
        }),
      );
    });
  });
});
