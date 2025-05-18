import type { TranslatorOptions } from "../src/types/translator-options-types";
import type { LocaleNamespaceMessages } from "intor-types";
import { createTranslator } from "../src";
import { createGetLocale } from "../src/methods/get-locale";
import { createGetMessages } from "../src/methods/get-messages";
import { createHasKey } from "../src/methods/has-key";
import { createScoped } from "../src/methods/scoped";
import { createSetLocale } from "../src/methods/set-locale";
import { createTranslate } from "../src/methods/translate";

jest.mock("../src/methods/get-locale");
jest.mock("../src/methods/set-locale");
jest.mock("../src/methods/get-messages");
jest.mock("../src/methods/has-key");
jest.mock("../src/methods/translate");
jest.mock("../src/methods/scoped");

describe("intorTranslator", () => {
  const translatorOptions = {
    locale: "en",
    messages: { en: { hello: "Hi" } },
  } as unknown as TranslatorOptions<LocaleNamespaceMessages>;

  beforeEach(() => {
    jest.clearAllMocks();
    (createGetLocale as jest.Mock).mockReturnValue("getLocale");
    (createSetLocale as jest.Mock).mockReturnValue("setLocale");
    (createGetMessages as jest.Mock).mockReturnValue("getMessages");
    (createHasKey as jest.Mock).mockReturnValue("hasKey");
    (createTranslate as jest.Mock).mockReturnValue("t");
    (createScoped as jest.Mock).mockReturnValue("scoped");
  });

  it("returns a translator object with all methods", () => {
    const translator = createTranslator(translatorOptions);

    expect(translator).toEqual({
      getLocale: "getLocale",
      setLocale: "setLocale",
      getMessages: "getMessages",
      hasKey: "hasKey",
      t: "t",
      scoped: "scoped",
    });
  });
});
