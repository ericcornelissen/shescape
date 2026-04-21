/**
 * @overview The test suite for use of the experimental (linear-time) regexp
 * engine in the no-shell.js module.
 * @license MIT
 */

import * as nosh from "../../../src/internal/no-shell.js";

const args = ["foobar", "Hello world!", "csh specific character: \u00A0"];

export function testEscape() {
  for (const arg of args) {
    const escape = nosh.getEscapeFunction();
    escape(arg);
  }
}
