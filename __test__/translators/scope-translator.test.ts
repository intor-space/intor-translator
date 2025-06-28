import type { Replacement } from "@/types";
import { hasKey } from "@/translator-methods/has-key";
import { translate } from "@/translator-methods/translate";
import { ScopeTranslator } from "@/translators/scope-translator";

jest.mock("@/translator-methods/has-key", () => ({
  hasKey: jest.fn(),
}));

jest.mock("@/translator-methods/translate", () => ({
  translate: jest.fn(),
}));

const messages = {
  en: {
    common: { welcome: "Welcome", hello: "Hello" },
    auth: { login: { success: "Login successful" } },
  },
  "zh-TW": { common: { welcome: "歡迎" } },
};

describe("ScopeTranslator", () => {
  let translator: ScopeTranslator<typeof messages>;

  beforeEach(() => {
    translator = new ScopeTranslator({
      locale: "en",
      messages,
      loadingMessage: "Loading...",
      placeholder: "N/A",
      fallbackLocales: {},
    });
  });

  it("should return object with hasKey and t methods from scoped", () => {
    const scoped = translator.scoped("common");

    expect(typeof scoped.hasKey).toBe("function");
    expect(typeof scoped.t).toBe("function");
  });

  it("should call hasKey with full key and return mock result", () => {
    const mockHasKey = hasKey as jest.Mock;
    mockHasKey.mockReturnValue(true);

    const scoped = translator.scoped("common");

    const result = scoped.hasKey("welcome", "zh-TW");

    expect(result).toBe(true);
    expect(mockHasKey).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "common.welcome",
        targetLocale: "zh-TW",
        messagesRef: expect.any(Object),
        localeRef: expect.any(Object),
      }),
    );
  });

  it("should call hasKey with full key when key is undefined", () => {
    const mockHasKey = hasKey as jest.Mock;
    mockHasKey.mockReturnValue(false);

    const scoped = translator.scoped("common");

    // key omitted
    const result = scoped.hasKey(undefined);

    expect(result).toBe(false);
    expect(mockHasKey).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "common",
      }),
    );
  });

  it("should call translate with full key and replacements and return mock result", () => {
    const mockTranslate = translate as jest.Mock;
    mockTranslate.mockReturnValue("Translated message");

    const scoped = translator.scoped("auth.login");

    const replacements: Replacement = { user: "Alice" };
    const result = scoped.t("success", replacements);

    expect(result).toBe("Translated message");
    expect(mockTranslate).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "auth.login.success",
        replacements,
        messagesRef: expect.any(Object),
        localeRef: expect.any(Object),
      }),
    );
  });

  it("should call translate with full key when key is undefined", () => {
    const mockTranslate = translate as jest.Mock;
    mockTranslate.mockReturnValue("Translated base key");

    const scoped = translator.scoped("common");

    const result = scoped.t(undefined);

    expect(result).toBe("Translated base key");
    expect(mockTranslate).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "common",
      }),
    );
  });
});
