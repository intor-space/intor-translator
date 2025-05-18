import { getLocale } from "../../../src/methods/get-locale/get-locale";

describe("getLocale", () => {
  it("returns the current locale from the localeRef", () => {
    const localeRef = {
      current: "en",
    };

    const result = getLocale(localeRef);
    expect(result).toBe("en");
  });

  it("supports other locale values", () => {
    const localeRef = {
      current: "zh-TW",
    };

    const result = getLocale(localeRef);
    expect(result).toBe("zh-TW");
  });
});
