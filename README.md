<h1 align="center">Intor Translator</h1>

<div align="center">

A type safe translator that knows what to say and how to handle the rest.

</div>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/intor-translator?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/intor-translator)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/intor-translator?style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/intor-translator)
[![License](https://img.shields.io/npm/l/intor-translator?style=flat&colorA=000000&colorB=000000)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-%E2%9C%94-blue?style=flat&colorA=000000&colorB=000000)](https://www.typescriptlang.org/)

</div>

> Translate with confidence.  
> A type-safe i18n engine with fallback, scoped namespaces, and graceful loading.

---

## Features

- 🌍 Fallback locale support for smooth language switching
- ⚡ Reactive translation logic that updates on the fly
- 🧠 Type-safe nested key paths with full autocomplete
- 🔁 Flexible replacement and interpolation support
- 🎨 Rich formatting for complex replacement content
- 🌀 Graceful handling of loading and async states
- 🔧 Configurable handlers for fallback, loading, and missing keys
- 🧩 Scoped translators for modules and namespaces

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Triangular%20Flag.png" alt="Triangular Flag" width="16" height="16" /> Installation

```bash
npm install intor-translator
```

or use **yarn**

```bash
yarn add intor-translator
```

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" height="25" /> Quick Start

```typescript
import { Translator } from "intor-translator";

const messages = {
  en: {
    hello: "Hello World",
    greeting: "Hello, {name}!", // Use curly braces for replacements
  },
};

// Create a translator instance
const translator = new Translator({ messages, locale: "en" });

// Use the translator
translator.t("hello"); // -> Hello World
translator.t("greeting", { name: "John doe" }); // -> Hello, John doe!
```

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="25" height="25" /> Advanced Features

- Fallback Locales, Placeholder & Custom Handlers

```typescript
const translator = new Translator({
  locale: "en",
  messages: {
    en: {
      welcome: "Welcome back, {name}",
    },
    zh: {
      welcome: "歡迎回來，{name}",
      notification: "你有 {count} 則新通知",
    },
  },
  fallbackLocales: { en: ["zh"] }, // Use zh if message not found in en
  placeholder: "Content unavailable", // Shown if key is missing in all locales
  handlers: {
    formatMessage: ({ locale, message }) =>
      locale === "zh" ? `${message}。` : `${message}.`, // Auto punctuation per locale
  },
});

// en has 'welcome'
console.log(translator.t("welcome", { name: "John" })); // -> Welcome back, John.

// en does not have 'notification', fallback to zh
console.log(translator.t("notification", { count: 3 })); // -> 你有 3 則新通知。

// message does not exist in any locale
console.log(translator.t("unknown.key")); // -> Content unavailable
```

- With Custom ICU Formatter

```typescript
import { Translator, FormatMessage } from "intor-translator";
import { IntlMessageFormat } from "intl-messageformat";

// Create a custom handler
const formatMessage: FormatMessage = ({ message, locale, replacements }) => {
  const formatter = new IntlMessageFormat(message, locale);
  return formatter.format(replacements);
};

const messages = {
  en: {
    notification:
      "{name} has {count, plural, =0 {no messages} one {1 message} other {# messages}}.",
  },
};

// Create a translator instance
const translator = new Translator({
  locale: "en",
  messages,
  handlers: { formatMessage },
});

translator.t("notification", { name: "John", count: 0 }); // -> John has no messages.
translator.t("notification", { name: "John", count: 5 }); // -> John has 5 messages.
```

---

## API Reference

### Translator Parameters

| Option            | Type                                  | Description                                                              |
| ----------------- | ------------------------------------- | ------------------------------------------------------------------------ |
| `messages`        | `Readonly<LocaleNamespaceMessages>`   | Translation messages grouped by locale and namespace                     |
| `locale`          | `string`                              | Active locale key                                                        |
| `fallbackLocales` | `Record<Locale, Locale[]>` (optional) | Locales to fallback to when a key is missing                             |
| `placeholder`     | `string` (optional)                   | Message to display when a key is missing in all locales                  |
| `loadingMessage`  | `string` (optional)                   | Message to display during loading or async state                         |
| `handlers`        | `TranslateHandlers` (optional)        | Custom functions for formatting, loading state, and missing key handling |

**TranslateHandlers :**

```ts
type TranslateHandlers = {
  formatMessage?: (ctx: TranslateContext & { message: string }) => unknown;
  onLoading?: (ctx: TranslateContext) => unknown;
  onMissing?: (ctx: TranslateContext) => unknown;
};
```

> Use handlers to control how messages are formatted, what to show during loading, and how to respond to missing keys.  
> Each handler receives a full translation context, including the current locale, key, and replacement values.

---

### Instance Properties

| Property    | Type           | Description                                |
| ----------- | -------------- | ------------------------------------------ |
| `messages`  | `M`            | Current messages object                    |
| `locale`    | `LocaleKey<M>` | Currently active locale                    |
| `isLoading` | `boolean`      | Whether the translator is in loading state |

---

### Instance Methods

| Method        | Signature                                         | Description                                                         |
| ------------- | ------------------------------------------------- | ------------------------------------------------------------------- |
| `setMessages` | `(messages: M) => void`                           | Replaces the current message set                                    |
| `setLocale`   | `(locale: LocaleKey<M>) => boolean`               | Sets a new locale and returns whether it changed                    |
| `setLoading`  | `(state: boolean) => void`                        | Sets the loading state manually                                     |
| `hasKey`      | `(key, targetLocale?) => boolean`                 | Checks whether the given key exists in the target or current locale |
| `t`           | `<Result = string>(key, replacements?) => Result` | Translates a key with optional replacements                         |
| `scoped`      | `(preKey: string) => { hasKey(), t() }`           | Creates a scoped translator with a namespace prefix                 |

**translator.t(key, replacements?)**

- Fully type-safe key access
- Supports nested keys
- Supports both string and rich replacements

**translator.scoped(preKey)**

- Returns a scoped translator instance based on a message subtree
- Useful for organizing large sets of translations with shared prefixes

---
