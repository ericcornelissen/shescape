/**
 * @overview The test suite for use of the experimental (linear-time) regexp
 * engine on Windows systems.
 * @license MIT
 */

import * as cmd from "../../../src/internal/win/cmd.js";
import * as powershell from "../../../src/internal/win/powershell.js";
import * as win from "../../../src/internal/win.js";

const shells = [cmd, powershell];

const args = ["foobar", "Hello world!", "--flag", "-f", "/flag", "/f"];

export function testEscape() {
  for (const shell of shells) {
    for (const arg of args) {
      const escape = shell.getEscapeFunction();
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
  for (const shell of shells) {
    for (const arg of args) {
      const [escape, quote] = shell.getQuoteFunction();
      quote(escape(arg));
    }
  }
}
