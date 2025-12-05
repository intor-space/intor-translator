import type { TranslateHook } from "@/pipeline/types";
import { makeHandlerContext } from "@/pipeline/utils/make-handler-context";

export const missingHook: TranslateHook = {
  name: "missing",
  order: 400,

  run(ctx) {
    const { config, key, rawMessage } = ctx;
    if (rawMessage !== undefined) return;

    // Use custom handler if provided
    const { missingHandler } = config.handlers || {};
    if (missingHandler) {
      return {
        done: true,
        value: missingHandler(makeHandlerContext(ctx)),
      };
    }

    // Static message
    const { placeholder } = config;
    if (placeholder) {
      return { done: true, value: placeholder };
    }

    // Fallback to key
    return { done: true, value: key };
  },
};
