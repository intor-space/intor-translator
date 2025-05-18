import type { MessagesRef } from "../../../src/types/ref-types";
import { createGetMessages } from "../../../src/methods/get-messages/create-get-messages";

describe("createGetMessages", () => {
  type Messages = {
    en: { hello: string };
    "zh-TW": { hello: string };
  };

  it("should create a function that returns the current messages from messagesRef", () => {
    const messages = {
      en: { hello: "Hello" },
      "zh-TW": { hello: "你好" },
    };

    const messagesRef: MessagesRef<Messages> = { current: messages };

    const getMessagesFn = createGetMessages(messagesRef);

    const result = getMessagesFn();

    expect(result).toBe(messages);
  });
});
