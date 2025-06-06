/**
 * @overview Provides common utilities for end-to-end tests.
 * @license MIT
 */

import process from "node:process";

import test from "ava";
import isCI from "is-ci";
import which from "which";

import * as constants from "../_constants.js";

/**
 * Get the AVA test function to use for the given shell.
 *
 * @param {string} shell The shell to run a test for.
 * @returns {Function} An AVA `test` function.
 */
export function getTestFn(shell) {
  if (constants.isWindows) {
    if (!constants.shellsWindows.includes(shell)) {
      return test.skip;
    }
  } else {
    if (!constants.shellsUnix.includes(shell)) {
      return test.skip;
    }
  }

  try {
    if (!isCI && typeof shell === "string") {
      which.sync(shell, { path: process.env.PATH || process.env.Path });
    }

    return test;
  } catch {
    return test.skip;
  }
}
