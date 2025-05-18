import type { LocaleRef, MessagesRef } from "../../../src/types/ref-types";
import type { TranslatorOptions } from "../../../src/types/translator-options-types";
import { createHasKey } from "../../../src/methods/has-key/create-has-key";

describe("createHasKey", () => {
  type Messages = {
    en: { greeting: string; nested: { hello: string } };
    "zh-TW"?: { greeting: string };
    fr?: { greeting: string; nested?: { hello: string } };
  };

  let messages: Messages;
  let messagesRef: MessagesRef<Messages>;
  let localeRef: LocaleRef<Messages>;
  let translatorOptions: TranslatorOptions<Messages>;

  beforeEach(() => {
    messages = {
      en: { greeting: "Hello", nested: { hello: "Hi" } },
      "zh-TW": { greeting: "你好" },
      fr: { greeting: "Bonjour", nested: { hello: "Salut" } },
    };

    messagesRef = { current: messages };
    localeRef = { current: "en" };
    translatorOptions = {
      locale: "en",
      messages,
      fallbackLocales: { "zh-TW": ["fr"] },
    };
  });

  it("returns a hasKey function that works with default locale", () => {
    const hasKey = createHasKey(messagesRef, localeRef, translatorOptions);
    expect(hasKey("greeting")).toBe(true);
  });
});
