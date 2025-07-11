import type { TranslateOptions } from "@/translator-methods/translate";
import type { InferTranslatorKey, LocaleNamespaceMessages } from "@/types";
import { translate } from "@/translator-methods/translate";
import { findMessageInLocales } from "@/utils/find-message-in-locales";
import { replaceValues } from "@/utils/replace-values";

jest.mock("@/utils/replace-values", () => ({
  replaceValues: jest.fn(),
}));
jest.mock("@/utils/resolve-locales-to-try", () => ({
  resolveLocalesToTry: jest.fn(() => ["en"]),
}));
jest.mock("@/utils/find-message-in-locales", () => ({
  findMessageInLocales: jest.fn(),
}));

describe("translate", () => {
  const createBaseOptions = <
    M extends LocaleNamespaceMessages,
    L extends keyof M & string,
  >(
    overrides: Partial<TranslateOptions<M>> = {},
  ) => {
    const messagesRef = {
      current: { en: { hello: "Hello, {name}!" } },
    } as unknown as { current: M };
    const localeRef = { current: "en" as L };
    const isLoadingRef = { current: false };

    const base: TranslateOptions<M> = {
      messagesRef,
      localeRef,
      isLoadingRef,
      translateConfig: {
        fallbackLocales: {},
        loadingMessage: "Loading...",
        placeholder: "N/A",
        handlers: {},
      },
      key: "hello" as InferTranslatorKey<M>,
      replacements: { name: "Yiming" },
      ...overrides,
    };

    return base;
  };

  it("should throw error if messages or locale missing", () => {
    expect(() =>
      translate({
        messagesRef: { current: undefined },
        localeRef: { current: "en" },
        key: "123" as never,
      } as unknown as TranslateOptions<never>),
    ).toThrow();
    expect(() =>
      translate({
        messagesRef: { current: { en: { key: "value" } } },
        localeRef: { current: undefined },
        key: "key",
      } as unknown as TranslateOptions<never>),
    ).toThrow();
  });

  it("should return loading message if isLoading is true and no handler", () => {
    const result = translate(
      createBaseOptions({
        isLoadingRef: { current: true },
      }),
    );
    expect(result).toBe("Loading...");
  });

  it("should call onLoading handler if provided", () => {
    const onLoading = jest.fn(() => "Loading from handler");
    const result = translate(
      createBaseOptions({
        isLoadingRef: { current: true },
        translateConfig: {
          fallbackLocales: {},
          loadingMessage: "Should not use this",
          placeholder: "N/A",
          handlers: { onLoading },
        },
      }),
    );
    expect(onLoading).toHaveBeenCalledWith({
      key: "hello",
      locale: "en",
      replacements: { name: "Yiming" },
    });
    expect(result).toBe("Loading from handler");
  });

  it("should return placeholder if no message and no onMissing", () => {
    (findMessageInLocales as jest.Mock).mockReturnValueOnce(undefined);
    const result = translate(createBaseOptions());
    expect(result).toBe("N/A");
  });

  it("should call onMissing if message not found", () => {
    const onMissing = jest.fn(() => "Missing from handler");
    (findMessageInLocales as jest.Mock).mockReturnValueOnce(undefined);

    const result = translate(
      createBaseOptions({
        translateConfig: {
          fallbackLocales: {},
          placeholder: "N/A",
          handlers: { onMissing },
        },
      }),
    );
    expect(onMissing).toHaveBeenCalledWith({
      key: "hello",
      locale: "en",
      replacements: { name: "Yiming" },
    });
    expect(result).toBe("Missing from handler");
  });

  it("should return formatted message if formatMessage is provided", () => {
    const formatMessage = jest.fn(() => "Formatted Hello Yiming");
    (findMessageInLocales as jest.Mock).mockReturnValueOnce("Hello, {name}!");

    const result = translate(
      createBaseOptions({
        translateConfig: {
          fallbackLocales: {},
          placeholder: "N/A",
          handlers: { formatMessage },
        },
      }),
    );

    expect(formatMessage).toHaveBeenCalledWith({
      message: "Hello, {name}!",
      key: "hello",
      locale: "en",
      replacements: { name: "Yiming" },
    });
    expect(result).toBe("Formatted Hello Yiming");
  });

  it("should apply replacements if formatMessage is not provided", () => {
    (findMessageInLocales as jest.Mock).mockReturnValueOnce("Hello, {name}!");
    (replaceValues as jest.Mock).mockReturnValueOnce("Hello, Yiming!");

    const result = translate(createBaseOptions());
    expect(replaceValues).toHaveBeenCalledWith("Hello, {name}!", {
      name: "Yiming",
    });
    expect(result).toBe("Hello, Yiming!");
  });

  it("should return raw message if no replacements and no formatMessage", () => {
    (findMessageInLocales as jest.Mock).mockReturnValueOnce("Hello!");
    const result = translate(createBaseOptions({ replacements: undefined }));
    expect(result).toBe("Hello!");
  });

  it("should return key as fallback if nothing else matches", () => {
    const options = createBaseOptions({
      translateConfig: {
        fallbackLocales: {},
        placeholder: undefined,
        loadingMessage: undefined,
        handlers: {},
      },
    });
    (findMessageInLocales as jest.Mock).mockReturnValueOnce(undefined);
    const result = translate(options);
    expect(result).toBe("hello");
  });
});
