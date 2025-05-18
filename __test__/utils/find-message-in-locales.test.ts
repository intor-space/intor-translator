import { findMessageInLocales } from "../../src/utils/find-message-in-locales";

const messages = {
  en: {
    auth: {
      login: {
        title: "Login",
      },
    },
  },
  fr: {
    auth: {
      login: {
        title: "Connexion",
      },
    },
  },
};

describe("findMessageInLocales", () => {
  it("should find message in the first locale", () => {
    const result = findMessageInLocales({
      messages,
      localesToTry: ["en", "fr"],
      key: "auth.login.title",
    });
    expect(result).toBe("Login");
  });

  it("should find message in the fallback locale", () => {
    const result = findMessageInLocales({
      messages,
      localesToTry: ["de" as "en", "fr"],
      key: "auth.login.title",
    });
    expect(result).toBe("Connexion");
  });

  it("should return undefined if message does not exist in any locale", () => {
    const result = findMessageInLocales({
      messages,
      localesToTry: ["en", "fr"],
      key: "auth.logout.title" as "auth",
    });
    expect(result).toBeUndefined();
  });
});
