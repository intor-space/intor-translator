import { translate } from "@/translator-methods/translate";
import { CoreTranslator } from "@/translators/core-translator";

jest.mock("@/translator-methods/translate", () => ({
  translate: jest.fn(),
}));

const messages = {
  en: { common: { welcome: "Welcome" } },
  "zh-TW": { common: { welcome: "歡迎" } },
};

describe("CoreTranslator", () => {
  it("should initialize with locale and messages", () => {
    const translator = new CoreTranslator({
      locale: "en",
      messages,
      loadingMessage: "Loading...",
      placeholder: "N/A",
      fallbackLocales: {},
    });

    expect(translator.locale).toBe("en");
    expect(translator.messages).toEqual(messages);
    expect(translator.isLoading).toBe(false);
  });

  describe("setLoading()", () => {
    it("should allow changing loading state", () => {
      const translator = new CoreTranslator({
        locale: "en",
        messages,
        loadingMessage: "Loading...",
        placeholder: "N/A",
        fallbackLocales: {},
      });

      expect(translator.isLoading).toBe(false);
      translator.setLoading(true);
      expect(translator.isLoading).toBe(true);
    });
  });

  describe("t()", () => {
    it("should call translate with correct arguments", () => {
      const mockTranslate = translate as jest.Mock;
      mockTranslate.mockReturnValue("Translated!");

      const translator = new CoreTranslator({
        locale: "en",
        messages,
        loadingMessage: "Loading...",
        placeholder: "N/A",
        fallbackLocales: {},
      });

      const result = translator.t("common.welcome", { name: "Yiming" });

      expect(result).toBe("Translated!");
      expect(mockTranslate).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "common.welcome",
          replacements: { name: "Yiming" },
          localeRef: { current: "en" },
          messagesRef: { current: messages },
          isLoadingRef: { current: false },
          translateConfig: expect.objectContaining({
            placeholder: "N/A",
          }),
        }),
      );
    });
  });
});
