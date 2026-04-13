/**
 * @overview Provides a facade for the RegExp global.
 * @license MPL-2.0
 */

/* eslint-disable top/no-top-level-side-effects, top/no-top-level-variables */

let regexp;
try {
  const lregexp = await import("@ericcornelissen/lregexp");
  regexp = lregexp.default;
} catch {
  regexp = RegExp;
}

export const RegExp = regexp;
