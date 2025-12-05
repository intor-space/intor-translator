import type { TranslateHook } from "@/pipeline/types";
import type { HandlerContext } from "@/translators";
import { makeHandlerContext } from "@/pipeline/utils/make-handler-context";

export const formatHook: TranslateHook = {
  name: "format",
  order: 500,

  run(ctx) {
    const { config, rawMessage } = ctx;
    const { formatHandler } = config.handlers || {};
    if (!formatHandler || rawMessage === undefined) return;

    // Use custom handler if provided
    ctx.formattedMessage = formatHandler(
      makeHandlerContext(ctx) as HandlerContext & { rawMessage: string },
    );
  },
};
