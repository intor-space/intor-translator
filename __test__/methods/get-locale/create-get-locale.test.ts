import { createGetLocale } from "../../../src/methods/get-locale";

describe("createGetLocale", () => {
  it("returns a function that returns the current locale", () => {
    const localeRef = { current: "en" };
    const getLocale = createGetLocale(localeRef);

    expect(getLocale()).toBe("en");

    localeRef.current = "zh-TW";
    expect(getLocale()).toBe("zh-TW");
  });
});
