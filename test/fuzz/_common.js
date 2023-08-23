/**
 * @overview Provides utilities for fuzzing.
 * @license MIT
 */

import process from "node:process";

import "dotenv";

/**
 * Returns the shell configured to be used for fuzzing.
 *
 * @returns {string | boolean} The configured shell.
 */
export function getFuzzShell() {
  switch (process.env.FUZZ_SHELL) {
    case undefined:
    case "false":
    case "":
      return false;
    case "true":
      return true;
    default:
      return process.env.FUZZ_SHELL;
  }
}
