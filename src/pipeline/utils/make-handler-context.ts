import type { TranslateContext } from "@/pipeline/types";
import type { HandlerContext } from "@/translators/core-translator/translate-config.types";

export function makeHandlerContext(ctx: TranslateContext): HandlerContext {
  return Object.freeze({
    locale: ctx.locale,
    key: ctx.key,
    replacements: ctx.replacements,

    messages: ctx.messages,
    candidateLocales: ctx.candidateLocales,
    config: ctx.config,
    isLoading: ctx.isLoading,

    rawMessage: ctx.rawMessage,
    formattedMessage: ctx.formattedMessage,

    meta: ctx.meta,
  });
}
