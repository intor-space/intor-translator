import type { MessagesRef, LocaleRef } from "../../../src/types/ref-types";
import { createSetLocale } from "../../../src/methods/set-locale/create-set-locale";

describe("createSetLocale", () => {
  type Messages = {
    en: { hello: string };
    "zh-TW": { hello: string };
  };

  let messages: Messages;
  let messagesRef: MessagesRef<Messages>;
  let localeRef: LocaleRef<Messages>;
  let setLocaleFn: ReturnType<typeof createSetLocale>;

  beforeEach(() => {
    messages = {
      en: { hello: "Hello" },
      "zh-TW": { hello: "你好" },
    };
    messagesRef = { current: messages };
    localeRef = { current: "en" };

    setLocaleFn = createSetLocale(messagesRef, localeRef);
  });

  it("should update localeRef.current when given a valid locale", () => {
    setLocaleFn("zh-TW");
    expect(localeRef.current).toBe("zh-TW");
  });

  it("should not update localeRef.current when given an invalid locale", () => {
    setLocaleFn("fr" as keyof Messages);
    expect(localeRef.current).toBe("en");
  });
});
