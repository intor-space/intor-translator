import type { TranslateContext, TranslateHook } from "./types";

export function runPipeline<Result = unknown>(
  ctx: TranslateContext<Result>,
  hooks: TranslateHook<Result>[],
): Result {
  for (const hook of hooks) {
    const result = hook.run(ctx);
    if (result?.done) {
      return result.value;
    }
  }

  return (ctx.finalMessage ?? ctx.rawMessage) as Result;
}
