/**
 * @overview Provides a facade for the RegExp global.
 * @license MPL-2.0
 */

let regexp;
try {
  regexp = require("@ericcornelissen/lregexp");
} catch {
  regexp = RegExp;
}

module.exports = regexp;
