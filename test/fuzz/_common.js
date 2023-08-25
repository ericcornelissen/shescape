/**
 * @overview Provides utilities for fuzzing.
 * @license MIT
 */

import "dotenv/config";

import process from "node:process";

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
