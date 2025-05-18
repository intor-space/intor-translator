import type { MessagesRef, LocaleRef } from "../../../src/types/ref-types";
import type { TranslatorOptions } from "../../../src/types/translator-options-types";
import type { Replacement } from "intor-types";
import { translate } from "../../../src/methods/translate/translate";

describe("translate", () => {
  const messages = {
    en: {
      greeting: "Hello {name}!",
      plain: "Hello World!",
    },
    zh: {
      greeting: "你好 {name}！",
    },
  };

  type Messages = typeof messages;

  const baseOptions: TranslatorOptions<Messages> = {
    messages,
    locale: "en",
  };

  const messagesRef: MessagesRef<Messages> = {
    current: messages,
  };

  const localeRef: LocaleRef<Messages> = {
    current: "en",
  };

  it("translates a simple string without replacements", () => {
    const result = translate({
      messagesRef,
      localeRef,
      translatorOptions: baseOptions,
      key: "plain",
    });

    expect(result).toBe("Hello World!");
  });

  it("translates a string with replacements", () => {
    const result = translate({
      messagesRef,
      localeRef,
      translatorOptions: baseOptions,
      key: "greeting",
      replacements: { name: "Alice" },
    });

    expect(result).toBe("Hello Alice!");
  });

  it("falls back to fallbackLocales when key is missing in current locale", () => {
    const localeRefMissing: LocaleRef<Messages> = {
      current: "zh",
    };

    const result = translate({
      messagesRef,
      localeRef: localeRefMissing,
      translatorOptions: {
        ...baseOptions,
        fallbackLocales: { zh: ["en"] },
      },
      key: "plain",
    });

    expect(result).toBe("Hello World!");
  });

  it("returns loading message if isLoading is true", () => {
    const result = translate({
      messagesRef,
      localeRef,
      translatorOptions: {
        ...baseOptions,
        isLoading: true,
        loadingMessage: "Loading...",
      },
      key: "plain",
    });

    expect(result).toBe("Loading...");
  });

  it("calls loadingMessageHandler if provided", () => {
    const handler = jest.fn(() => "🔄 Loading from handler");
    const result = translate({
      messagesRef,
      localeRef,
      translatorOptions: {
        ...baseOptions,
        isLoading: true,
        handlers: {
          loadingMessageHandler: handler,
        },
      },
      key: "greeting",
    });

    expect(handler).toHaveBeenCalledWith({
      key: "greeting",
      locale: "en",
      replacements: undefined,
    });
    expect(result).toBe("🔄 Loading from handler");
  });

  it("returns placeholder if no key found", () => {
    const result = translate({
      messagesRef,
      localeRef,
      translatorOptions: {
        ...baseOptions,
        placeholder: "N/A",
      },
      key: "missing.key" as "plain",
    });

    expect(result).toBe("N/A");
  });

  it("calls placeholderHandler if no message found", () => {
    const handler = jest.fn(() => "🙈 Missing key");
    const result = translate({
      messagesRef,
      localeRef,
      translatorOptions: {
        ...baseOptions,
        handlers: {
          placeholderHandler: handler,
        },
      },
      key: "not.found" as "plain",
    });

    expect(handler).toHaveBeenCalledWith({
      key: "not.found",
      locale: "en",
      replacements: undefined,
    });
    expect(result).toBe("🙈 Missing key");
  });

  it("calls messageFormatter if provided", () => {
    const formatter = jest.fn(({ message, replacements }) => {
      return message.replace("{name}", (replacements as Replacement).name);
    });

    const result = translate({
      messagesRef,
      localeRef,
      translatorOptions: {
        ...baseOptions,
        handlers: {
          messageFormatter: formatter,
        },
      },
      key: "greeting",
      replacements: { name: "Bob" },
    });

    expect(formatter).toHaveBeenCalledWith({
      message: "Hello {name}!",
      key: "greeting",
      locale: "en",
      replacements: { name: "Bob" },
    });

    expect(result).toBe("Hello Bob!");
  });
});
