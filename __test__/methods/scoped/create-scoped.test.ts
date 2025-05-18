import type { MessagesRef, LocaleRef } from "../../../src/types/ref-types";
import type { TranslatorOptions } from "../../../src/types/translator-options-types";
import type { LocaleNamespaceMessages } from "intor-types";
import { createScoped } from "../../../src/methods/scoped/create-scoped";
import { scoped } from "../../../src/methods/scoped/scoped";

jest.mock("../../../src/methods/scoped/scoped");

describe("createScoped", () => {
  const messagesRef = {} as MessagesRef<LocaleNamespaceMessages>;
  const localeRef = {} as LocaleRef<LocaleNamespaceMessages>;
  const translatorOptions = {} as TranslatorOptions<LocaleNamespaceMessages>;

  const mockScopedResult = { t: jest.fn(), hasKey: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    (scoped as jest.Mock).mockReturnValue(mockScopedResult);
  });

  it("returns scoped translator when invoked", () => {
    const scope = createScoped(messagesRef, localeRef, translatorOptions);
    const result = scope("dashboard");

    expect(scoped).toHaveBeenCalledWith({
      messagesRef,
      localeRef,
      translatorOptions,
      preKey: "dashboard",
    });

    expect(result).toBe(mockScopedResult);
  });
});
