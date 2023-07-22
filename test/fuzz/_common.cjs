/**
 * @overview Provides utilities for fuzzing.
 * @license MIT
 */

const process = require("node:process");

require("dotenv").config();

/**
 * Returns the shell configured to be used for fuzzing.
 *
 * @returns {string | undefined} The configured shell, or `undefined`.
 */
function getFuzzShell() {
  return process.env.FUZZ_SHELL || undefined;
}

module.exports = {
  getFuzzShell,
};
