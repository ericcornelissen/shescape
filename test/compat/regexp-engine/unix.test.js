/**
 * @overview The test suite for use of the experimental (linear-time) regexp
 * engine on Unix systems.
 * @license MIT
 */

import * as unix from "../../../src/internal/unix.js";

import { constants } from "./_.js";

const args = [
  "foobar",
  "Hello world!",
  "csh specific character: \u00A0",
  "--flag",
  "-f",
];

export function testEscape() {
  for (const shell of constants.shellsUnix) {
    for (const arg of args) {
      const escape = unix.getShellHelpers(shell).getEscapeFunction();
      escape(arg);
    }
  }
}

export function testFlagFunction() {
  for (const arg of args) {
    const flag = unix.getFlagFunction();
    flag(arg);
  }
}

export function testQuote() {
  for (const shell of constants.shellsUnix) {
    for (const arg of args) {
      const [escape, quote] = unix.getShellHelpers(shell).getQuoteFunction();
      quote(escape(arg));
    }
  }
}
