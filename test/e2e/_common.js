/**
 * @overview Provides common utilities for end-to-end tests.
 * @license MIT
 */

import process from "node:process";

import test from "ava";
import isCI from "is-ci";
import which from "which";

import { injectionStrings } from "../../src/modules/testing.js";
import * as constants from "../_constants.js";

/**
 * Get a list of strings to use as arguments in end-to-end tests.
 *
 * @returns {string[]} A list of test arguments.
 */
export function getTestArgs() {
  return ["harmless", ...injectionStrings];
}

/**
 * Get the AVA test function to use for the given shell.
 *
 * @param {string} shell The shell to run a test for.
 * @returns {Function} An AVA `test` function.
 */
export function getTestFn(shell) {
  try {
    if (!isCI && typeof shell === "string") {
      which.sync(shell, { path: process.env.PATH || process.env.Path });
    }

    return test;
  } catch (_) {
    return test.skip;
  }
}

/**
 * Get a list of `shell` option values to use in end-to-end tests.
 *
 * @returns {(boolean | string)[]} A list of `shell` option values.
 */
export function getTestShells() {
  const systemShells = constants.isWindows
    ? constants.shellsWindows
    : constants.shellsUnix;

  return [false, ...systemShells];
}
