import type { TranslateHook } from "@/pipeline/types";
import { resolveCandidateLocales } from "@/translators/shared/utils/resolve-candidate-locales";

export const resolveLocalesHook: TranslateHook = {
  name: "resolveLocales",
  order: 100,

  run(ctx) {
    ctx.candidateLocales = resolveCandidateLocales(
      ctx.locale,
      ctx.config.fallbackLocales,
    );
  },
};
