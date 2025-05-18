import type { LocaleRef } from "../../../src/types/ref-types";
import type { TranslatorOptions } from "../../../src/types/translator-options-types";
import { createTranslate } from "../../../src/methods/translate";
import { translate } from "../../../src/methods/translate/translate";

jest.mock("../../../src/methods/translate/translate");

describe("createTranslate", () => {
  type Messages = { en: { hello: string } };
  const messagesRef = { current: { en: { hello: "Hello" } } };
  const localeRef = { current: "en" } as LocaleRef<Messages>;
  const translatorOptions = {
    fallbackLocales: [],
    handlers: {},
  } as unknown as TranslatorOptions<Messages>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a function", () => {
    const t = createTranslate(messagesRef, localeRef, translatorOptions);
    expect(typeof t).toBe("function");
  });

  it("should call translate with correct arguments", () => {
    const t = createTranslate(messagesRef, localeRef, translatorOptions);
    const key = "hello";
    const replacements = { name: "World" };

    t(key, replacements);

    expect(translate).toHaveBeenCalledWith({
      messagesRef,
      localeRef,
      translatorOptions,
      key,
      replacements,
    });
  });
});
