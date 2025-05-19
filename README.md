# IntorTranslator

A highly flexible and type-safe i18n translation engine for modern applications — supporting fallback locales, async loading states, scoped namespaces, and both simple and rich formatting.

[![NPM version](https://img.shields.io/npm/v/intor-translator)](https://www.npmjs.com/package/intor-translator)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/intor-translator)](https://bundlephobia.com/package/intor-translator)
[![License](https://img.shields.io/npm/l/intor-translator)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-%E2%9C%94-blue)](https://www.typescriptlang.org/)

---

## Features

- 🌍 Fallback locale support
- ⚡ Reactive translation logic
- 🧠 Type-safe nested key paths
- 🔁 Replacement support
- 🎨 Rich replacement formatting
- 🌀 Graceful loading state handling
- 🔧 Configurable handlers for fallback, loading, and placeholder cases
- 🧩 Scoped translator for modules or namespaces

---

## Installation

```bash
npm install intor-translator
```

or use **yarn**

```bash
yarn add intor-translator
```

---

## Quick Start

```typescript
import { createTranslator } from "intor-translator";

// Create a translator instance
const translator = createTranslator({
  locale: "en",
  messages: {
    en: {
      hello: "Hello World",
      greeting: "Hello, {name}!", // Use curly braces for replacements
    },
  },
});

// Use the translator
translator.t("hello"); // > Hello World
translator.t("greeting", { name: "John doe" }); // > Hello, John doe!
```

---

## Advanced Features

- Fallback Locales, Placeholder & Custom Handlers

```typescript
const translator = createTranslator({
  locale: "en",
  messages: {
    en: {
      greeting: "Hello, {name}!",
    },
    zh: {
      greeting: "哈囉, {name}!",
      "only-in-zh": "This message is not exist in en",
    },
  },
  fallbackLocales: { en: ["zh"] }, // Falls back to zh if message is missing in en
  placeholder: "MESSAGE NOT FOUND", // Default text shown when a key is not found in any locale
  handlers: {
    messageFormatter: ({ locale, message }) =>
      `${message}${locale === "en" ? "." : "。"}`, // Custom message formatter
  },
});

translator.t("only-in-zh"); // > This message is not exist in en.
```

- With Custom ICU Formatter

```typescript
import IntlMessageFormat from "intl-messageformat";
import { MessageFormatter } from "intor-translator";

const formatter: MessageFormatter = ({ message, locale, replacements }) => {
  const formatter = new IntlMessageFormat(message, locale);
  return formatter.format(replacements);
};

const translator = createTranslator({
  locale: "en",
  messages: {
    en: {
      notification:
        "{name} has {count, plural, =0 {no messages} one {1 message} other {# messages}}.",
    },
  },
  handlers: {
    messageFormatter: formatter,
  },
});

translator.t("notification", { name: "John", count: 0 }); // > John has no messages.
translator.t("notification", { name: "John", count: 5 }); // > John has 5 messages.
```

---

## API Reference

| Option            | Type                             | Description                                                               |
| ----------------- | -------------------------------- | ------------------------------------------------------------------------- |
| `messages`        | `Record<Locale, Messages>`       | Translation messages, structured by locale                                |
| `locale`          | `string`                         | The active locale                                                         |
| `fallbackLocales` | `Record<Locale, Locale[]>` (opt) | Fallback locales used when a message is missing in the active locale      |
| `placeholder`     | `string`（opt）                  | Default message to display when a key is missing                          |
| `isLoading`       | `boolean`（opt）                 | Indicates if the translator is in a loading state                         |
| `loadingMessage`  | `string`（opt）                  | Message to show when inLoading is true.                                   |
| `handlers`        | `TranslatorHandlers`（opt）      | Custom handler functions for formatting, loading, or placeholder messages |
|                   |

**translator.t(key, replacements?)**

- Fully type-safe key access
- Supports nested keys
- Supports both string and rich replacements

**translator.scope(preKey)**

- Returns a scoped translator instance based on a message subtree
- Useful for organizing large sets of translations with shared prefixes

---

## Project Structure

```bash
src/
├── index.ts                  # Main entry point and API
├── create-translator.ts      # Translator factory function
├── methods/                  # Helper methods for locale, messages, keys, etc.
│   ├── get-locale/
│   ├── set-locale/
│   ├── get-messages/
│   └── translate/
│   ├── has-key/
│   ├── scoped/
├── types/                    # Type definitions
└── utils/                    # Utility functions
```
