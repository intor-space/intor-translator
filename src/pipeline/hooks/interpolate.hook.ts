import type { TranslateHook } from "@/pipeline/types";
import { replaceValues } from "@/translators/shared/utils/replace-values";

export const interpolateHook: TranslateHook = {
  name: "interpolate",
  order: 600,

  run(ctx) {
    const { rawMessage, formattedMessage, replacements } = ctx;
    const message = formattedMessage ?? rawMessage;

    if (typeof message !== "string" || !replacements) {
      ctx.finalMessage = message;
      return;
    }

    ctx.finalMessage = replaceValues(message, replacements);
  },
};
