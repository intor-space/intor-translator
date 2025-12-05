import { findMessageHook } from "./find-message.hook";
import { formatHook } from "./format.hook";
import { interpolateHook } from "./interpolate.hook";
import { loadingHook } from "./loading.hook";
import { missingHook } from "./missing.hook";
import { resolveLocalesHook } from "./resolve-locales.hook";

export const DEFAULT_HOOKS = [
  resolveLocalesHook,
  findMessageHook,
  loadingHook,
  missingHook,
  formatHook,
  interpolateHook,
];
