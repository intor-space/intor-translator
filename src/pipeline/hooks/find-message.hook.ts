import type { TranslateHook } from "@/pipeline/types";
import { findMessageInLocales } from "@/translators/shared/utils/find-message-in-locales";

export const findMessageHook: TranslateHook = {
  name: "findMessage",
  order: 200,

  run(ctx) {
    ctx.rawMessage = findMessageInLocales({
      messages: ctx.messages,
      candidateLocales: ctx.candidateLocales,
      key: ctx.key,
    });
  },
};
