import type { FallbackLocalesMap } from "intor-types";
import { resolveLocalesToTry } from "../../src/utils/resolve-locales-to-try";

export const mockFallbackLocales: FallbackLocalesMap = {
  "en-US": ["fr-FR", "zh-TW"],
  "fr-FR": ["en-US"],
  "zh-TW": ["en-US"],
  "ja-JP": [],
};

describe("resolveLocalesToTry", () => {
  it("returns primary locale first without fallback", () => {
    const result = resolveLocalesToTry("ja-JP", mockFallbackLocales);
    expect(result).toEqual(["ja-JP"]);
  });

  it("returns primary locale followed by fallbacks", () => {
    const result = resolveLocalesToTry("en-US", mockFallbackLocales);
    expect(result).toEqual(["en-US", "fr-FR", "zh-TW"]);
  });

  it("excludes primary locale if it appears in fallback list", () => {
    const customFallbackLocales: FallbackLocalesMap = {
      "en-US": ["en-US", "fr-FR", "zh-TW"],
      "fr-FR": ["fr-FR", "en-US"],
      "zh-TW": ["zh-TW", "en-US"],
      "ja-JP": ["ja-JP"],
    };

    const result = resolveLocalesToTry("en-US", customFallbackLocales);
    expect(result).toEqual(["en-US", "fr-FR", "zh-TW"]);
  });

  it("returns only primary locale if no fallback is defined", () => {
    const emptyFallbackLocales: FallbackLocalesMap = {
      "en-US": [],
      "fr-FR": [],
      "zh-TW": [],
      "ja-JP": [],
    };

    const result = resolveLocalesToTry("zh-TW", emptyFallbackLocales);
    expect(result).toEqual(["zh-TW"]);
  });

  it("handles undefined fallbackLocales safely", () => {
    const result = resolveLocalesToTry("fr-FR", {} as FallbackLocalesMap);
    expect(result).toEqual(["fr-FR"]);
  });
});
