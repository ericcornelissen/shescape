/**
 * @overview The test suite for use of the experimental (linear-time) regexp
 * engine on Windows systems.
 * @license MIT
 */

import * as win from "../../../src/internal/win.js";

import { constants } from "./_.js";

const args = ["foobar", "Hello world!", "--flag", "-f", "/flag", "/f"];

export function testEscape() {
  for (const shell of constants.shellsWindows) {
    if (!shell.endsWith(".exe")) {
      continue;
    }

    for (const arg of args) {
      const escape = win.getShellHelpers(shell).getEscapeFunction();
      escape(arg);
    }
  }
}

export function testFlagFunction() {
  for (const arg of args) {
    const flag = win.getFlagFunction();
    flag(arg);
  }
}

export function testQuote() {
  for (const shell of constants.shellsWindows) {
    if (!shell.endsWith(".exe")) {
      continue;
    }

    for (const arg of args) {
      const [escape, quote] = win.getShellHelpers(shell).getQuoteFunction();
      quote(escape(arg));
    }
  }
}
