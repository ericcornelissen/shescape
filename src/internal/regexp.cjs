/**
 * @overview Provides a facade for the RegExp global.
 * @license MPL-2.0
 */

let regexp;
try {
  const lregexp = require("@ericcornelissen/lregexp");
  regexp = lregexp;
} catch {
  regexp = RegExp;
}

module.exports = regexp;
