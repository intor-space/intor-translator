import type { MessagesRef } from "../../../src/types/ref-types";
import { getMessages } from "../../../src/methods/get-messages/get-messages";

describe("getMessages", () => {
  type Messages = {
    en: { hello: string };
    "zh-TW": { hello: string };
  };

  it("should return the current messages from messagesRef", () => {
    const messages = {
      en: { hello: "Hello" },
      "zh-TW": { hello: "你好" },
    };

    const messagesRef: MessagesRef<Messages> = { current: messages };

    const result = getMessages(messagesRef);

    expect(result).toBe(messages);
  });
});
