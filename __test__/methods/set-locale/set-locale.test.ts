import type { RawLocale } from "../../../src/types/locale-types";
import type { MessagesRef, LocaleRef } from "../../../src/types/ref-types";
import { setLocale } from "../../../src/methods/set-locale/set-locale";

describe("setLocale", () => {
  type Messages = {
    en: { hello: string };
    "zh-TW": { hello: string };
  };

  let messages: Messages;
  let messagesRef: MessagesRef<Messages>;
  let localeRef: LocaleRef<Messages>;

  beforeEach(() => {
    messages = {
      en: { hello: "Hello" },
      "zh-TW": { hello: "你好" },
    };
    messagesRef = { current: messages };
    localeRef = { current: "en" };
  });

  it("should set localeRef.current to newLocale if newLocale exists in messages", () => {
    setLocale({
      messagesRef,
      localeRef,
      newLocale: "zh-TW",
    });
    expect(localeRef.current).toBe("zh-TW");
  });

  it("should not change localeRef.current if newLocale does not exist in messages", () => {
    setLocale({
      messagesRef,
      localeRef,
      newLocale: "fr" as RawLocale<Messages>,
    });
    expect(localeRef.current).toBe("en"); // remains unchanged
  });
});
