import type { HasKeyOptions } from "@/translator-methods/has-key";
import { hasKey } from "@/translator-methods/has-key";
import { findMessageInLocales } from "@/utils/find-message-in-locales";
import { resolveLocalesToTry } from "@/utils/resolve-locales-to-try";

jest.mock("@/utils/find-message-in-locales", () => ({
  findMessageInLocales: jest.fn(),
}));

jest.mock("@/utils/resolve-locales-to-try", () => ({
  resolveLocalesToTry: jest.fn(() => ["zh-TW"]),
}));

const messages = {
  "zh-TW": { greeting: "哈囉" },
  en: { greeting: "Hello" },
};

describe("hasKey", () => {
  const createBaseOptions = (
    overrides: Partial<HasKeyOptions<typeof messages>> = {},
  ): HasKeyOptions<typeof messages> => {
    return {
      messagesRef: { current: messages },
      localeRef: { current: "zh-TW" },
      key: "greeting",
      ...overrides,
    };
  };

  it("should return true if key exists in default locale", () => {
    (findMessageInLocales as jest.Mock).mockReturnValueOnce("哈囉");

    const result = hasKey(createBaseOptions());
    expect(result).toBe(true);
  });

  it("should return false if key does not exist", () => {
    (findMessageInLocales as jest.Mock).mockReturnValueOnce(undefined);

    const result = hasKey(createBaseOptions());
    expect(result).toBe(false);
  });

  it("should use targetLocale if provided and key exists", () => {
    (resolveLocalesToTry as jest.Mock).mockReturnValueOnce(["en"]);
    (findMessageInLocales as jest.Mock).mockReturnValueOnce("Hello");

    const result = hasKey(createBaseOptions({ targetLocale: "en" }));

    expect(resolveLocalesToTry).toHaveBeenCalledWith("en");
    expect(result).toBe(true);
  });

  it("should use targetLocale if provided and return false when key not found", () => {
    (resolveLocalesToTry as jest.Mock).mockReturnValueOnce(["en"]);
    (findMessageInLocales as jest.Mock).mockReturnValueOnce(undefined);

    const result = hasKey(createBaseOptions({ targetLocale: "en" }));

    expect(resolveLocalesToTry).toHaveBeenCalledWith("en");
    expect(result).toBe(false);
  });

  it("should fallback to current locale if no targetLocale is provided", () => {
    hasKey(createBaseOptions());
    expect(resolveLocalesToTry).toHaveBeenCalledWith("zh-TW");
  });
});
