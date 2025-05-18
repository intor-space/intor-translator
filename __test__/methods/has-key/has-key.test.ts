import type { RawLocale } from "../../../src/types/locale-types";
import type { MessagesRef, LocaleRef } from "../../../src/types/ref-types";
import type { TranslatorOptions } from "../../../src/types/translator-options-types";
import { hasKey } from "../../../src/methods/has-key/has-key";

describe("hasKey", () => {
  type Messages = {
    en: { greeting: string; nested?: { hello: string } };
    "zh-TW"?: { greeting: string };
    fr?: { greeting: string };
  };

  let messages: Messages;
  let messagesRef: MessagesRef<Messages>;
  let localeRef: LocaleRef<Messages>;
  let translatorOptions: TranslatorOptions<Messages>;

  beforeEach(() => {
    messages = {
      en: { greeting: "Hello", nested: { hello: "Hi" } },
      "zh-TW": { greeting: "你好" },
      fr: { greeting: "Bonjour" },
    };
    messagesRef = { current: messages };
    localeRef = { current: "en" };
    translatorOptions = {
      locale: "en",
      messages,
      fallbackLocales: { "zh-TW": ["fr"] },
    };
  });

  it("returns true if key exists in current locale", () => {
    expect(
      hasKey({
        messagesRef,
        localeRef,
        translatorOptions,
        key: "greeting",
      }),
    ).toBe(true);
  });

  it("returns true if nested key exists in current locale", () => {
    expect(
      hasKey({
        messagesRef,
        localeRef,
        translatorOptions,
        key: "nested.hello",
      }),
    ).toBe(true);
  });

  it("returns true if key exists in fallback locale", () => {
    localeRef.current = "fr"; // deliberately set to a locale with the key
    expect(
      hasKey({
        messagesRef,
        localeRef,
        translatorOptions,
        key: "greeting",
        locale: "zh-TW", // override locale to fallback locale
      }),
    ).toBe(true);
  });

  it("returns false if key does not exist in any locale", () => {
    expect(
      hasKey({
        messagesRef,
        localeRef,
        translatorOptions,
        key: "nonexistentKey" as unknown as "greeting",
      }),
    ).toBe(false);
  });

  it("returns false if locale messages are missing", () => {
    localeRef.current = "de" as RawLocale<Messages>; // de locale does not exist
    expect(
      hasKey({
        messagesRef,
        localeRef,
        translatorOptions,
        key: "greeting",
      }),
    ).toBe(false);
  });

  it("returns false if fallback locale messages are missing", () => {
    delete messages["zh-TW"];
    translatorOptions.fallbackLocales = { "zh-TW": ["de" as "en"] };
    localeRef.current = "zh-TW";
    expect(
      hasKey({
        messagesRef,
        localeRef,
        translatorOptions,
        key: "greeting",
      }),
    ).toBe(false);
  });

  it("returns false for empty key", () => {
    expect(
      hasKey({
        messagesRef,
        localeRef,
        translatorOptions,
        key: "" as unknown as "greeting",
      }),
    ).toBe(false);
  });

  it("returns false if key not found and no fallback locales defined", () => {
    translatorOptions.fallbackLocales = {};
    localeRef.current = "zh-TW";
    expect(
      hasKey({
        messagesRef,
        localeRef,
        translatorOptions,
        key: "nested.hello",
      }),
    ).toBe(false);
  });

  it("returns true if key exists in one of multiple fallback locales", () => {
    delete messages["zh-TW"];
    translatorOptions.fallbackLocales = { "zh-TW": ["de" as "en", "fr"] };
    localeRef.current = "zh-TW";

    expect(
      hasKey({
        messagesRef,
        localeRef,
        translatorOptions,
        key: "greeting",
      }),
    ).toBe(true);
  });

  it("returns true if nested key exists only in fallback locale", () => {
    delete messages.en.nested;

    messagesRef.current = {
      en: { greeting: "Hello" },
      "zh-TW": { greeting: "你好" },
      fr: { greeting: "Bonjour", nested: { hello: "Salut" } },
    } as Messages;

    translatorOptions.fallbackLocales = { en: ["fr"] };

    expect(
      hasKey({
        messagesRef,
        localeRef,
        translatorOptions,
        key: "nested.hello",
      }),
    ).toBe(true);
  });
});
