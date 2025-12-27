/**
 * @overview The test suite for use of the experimental (linear-time) regexp
 * engine on Unix systems.
 * @license MIT
 */

import * as bash from "../../../src/internal/unix/bash.js";
import * as busybox from "../../../src/internal/unix/busybox.js";
import * as csh from "../../../src/internal/unix/csh.js";
import * as dash from "../../../src/internal/unix/dash.js";
import * as nosh from "../../../src/internal/unix/no-shell.js";
import * as zsh from "../../../src/internal/unix/zsh.js";

const shells = [bash, busybox, csh, dash, nosh, zsh];

const args = ["foobar", "Hello world!", "csh specific character: \u00A0"];

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
