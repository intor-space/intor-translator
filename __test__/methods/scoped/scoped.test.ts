import type { MessagesRef, LocaleRef } from "../../../src/types/ref-types";
import type { TranslatorOptions } from "../../../src/types/translator-options-types";
import type { LocaleNamespaceMessages } from "intor-types";
import { createHasKey } from "../../../src/methods/has-key/create-has-key";
import { scoped } from "../../../src/methods/scoped/scoped";
import { createTranslate } from "../../../src/methods/translate/create-translate";
import { getFullKey } from "../../../src/utils/get-full-key";

jest.mock("../../../src/methods/translate/create-translate");
jest.mock("../../../src/methods/has-key/create-has-key");
jest.mock("../../../src/utils/get-full-key");

describe("scoped", () => {
  const messagesRef = {} as MessagesRef<LocaleNamespaceMessages>;
  const localeRef = {} as LocaleRef<LocaleNamespaceMessages>;
  const translatorOptions = {} as TranslatorOptions<LocaleNamespaceMessages>;

  const mockTranslate = jest.fn();
  const mockHasKey = jest.fn();
  const mockGetFullKey = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockTranslate.mockReturnValue("translated");
    mockHasKey.mockReturnValue(true);
    mockGetFullKey.mockImplementation((preKey, key) => {
      if (preKey && key) return `${preKey}.${key}`;
      return preKey || key || "";
    });

    (createTranslate as jest.Mock).mockReturnValue(mockTranslate);
    (createHasKey as jest.Mock).mockReturnValue(mockHasKey);
    (getFullKey as jest.Mock).mockImplementation(mockGetFullKey);
  });

  it("calls baseTranslate with full key", () => {
    const { t } = scoped({
      messagesRef,
      localeRef,
      translatorOptions,
      preKey: "auth",
    });

    const result = t("login.title");

    expect(getFullKey).toHaveBeenCalledWith("auth", "login.title");
    expect(mockTranslate).toHaveBeenCalledWith("auth.login.title", undefined);
    expect(result).toBe("translated");
  });
});
