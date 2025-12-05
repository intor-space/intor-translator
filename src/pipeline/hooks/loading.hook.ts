import type { TranslateHook } from "@/pipeline/types";
import { makeHandlerContext } from "@/pipeline/utils/make-handler-context";

export const loadingHook: TranslateHook = {
  name: "loading",
  order: 300,

  run(ctx) {
    const { config, isLoading } = ctx;
    if (!isLoading) return;

    // Use custom handler if provided
    const { loadingHandler } = config.handlers || {};
    if (loadingHandler) {
      return {
        done: true,
        value: loadingHandler(makeHandlerContext(ctx)),
      };
    }

    // Static message
    const { loadingMessage } = config;
    if (loadingMessage) {
      return { done: true, value: loadingMessage };
    }
  },
};
