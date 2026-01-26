/**
 * @overview The test suite for use of the experimental (linear-time) regexp
 * engine on Windows systems.
 * @license MIT
 */

import * as cmd from "../../../src/internal/win/cmd.js";
import * as nosh from "../../../src/internal/win/no-shell.js";
import * as powershell from "../../../src/internal/win/powershell.js";

const shells = [cmd, nosh, powershell];

const args = ["foobar", "Hello world!"];

export function testEscape() {
  for (const shell of shells) {
    for (const arg of args) {
      const escape = shell.getEscapeFunction();
      escape(arg);
    }
  }
}

export function testQuote() {
  for (const shell of shells) {
    if (shell === nosh) {
      continue;
    }

    for (const arg of args) {
      const [escape, quote] = shell.getQuoteFunction();
      quote(escape(arg));
    }
  }
}

export function testFlagProtect() {
  for (const shell of shells) {
    for (const arg of args) {
      const flagProtect = shell.getFlagProtectionFunction();
      flagProtect(arg);
    }
  }
}
