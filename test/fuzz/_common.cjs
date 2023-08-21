/**
 * @overview Provides utilities for fuzzing.
 * @license MIT
 */

const process = require("node:process");

require("dotenv").config();

/**
 * Returns the shell configured to be used for fuzzing.
 *
 * @returns {string | boolean | undefined} The configured shell, or `undefined`.
 */
function getFuzzShell() {
  switch (process.env.FUZZ_SHELL) {
    case "false":
      return false;
    case "true":
    case undefined:
    case "":
      return true;
    default:
      return process.env.FUZZ_SHELL;
  }
}

module.exports = {
  getFuzzShell,
};
