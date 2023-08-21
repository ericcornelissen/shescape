/**
 * @overview Provides utilities for fuzzing.
 * @license MIT
 */

const process = require("node:process");

require("dotenv").config();

/**
 * Returns the shell configured to be used for fuzzing.
 *
 * @returns {string | boolean} The configured shell.
 */
function getFuzzShell() {
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

module.exports = {
  getFuzzShell,
};
