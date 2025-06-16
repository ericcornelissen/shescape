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
  if (
    (constants.isWindows && skipForWindows(shell)) ||
    (!constants.isWindows && skipForUnix(shell))
  ) {
    return test.skip;
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

/**
 * Determine if an integration test may be skipped for a shell on Unix systems.
 *
 * @param {string} shell The name of the shell to test.
 * @returns {boolean} `true` if it may be skipped, `false` otherwise.
 */
function skipForUnix(shell) {
  if (constants.isMacOS && shell === constants.binBusyBox) {
    return true;
  }

  return !constants.shellsUnix.includes(shell);
}

/**
 * Determine if an integration test may be skipped for a shell on Windows.
 *
 * @param {string} shell The name of the shell to test.
 * @returns {boolean} `true` if it may be skipped, `false` otherwise.
 */
function skipForWindows(shell) {
  if (!constants.isWindows) {
    return false;
  }

  return !constants.shellsWindows.includes(shell);
}
