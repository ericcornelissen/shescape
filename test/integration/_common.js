/**
 * @overview Provides common utilities for end-to-end tests.
 * @license MIT
 */

import process from "node:process";

import { isCI } from "ci-info";
import which from "which";

import * as constants from "../_constants.js";

/**
 * Get the AVA test function to use for the given shell.
 *
 * @param {string} shell The shell to run a test for.
 * @returns {Promise<Function>} An AVA `test` function.
 */
export async function getTestFn(shell) {
  const ava = await import("ava");
  const test = ava.default;

  if (skipForUnix(shell) || skipForWindows(shell)) {
    return test.skip;
  }

  if (isCI || typeof shell !== "string") {
    return test;
  }

  const PATH = process.env.PATH || process.env.Path;
  try {
    which.sync(shell, { path: PATH });
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
  if (constants.isWindows) {
    return false;
  }

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

/**
 * Check whether the shell should be skipped.
 *
 * @param {string} shell The shell of interest.
 * @returns {string | false} A skip reason or false.
 */
export function skip(shell) {
  if (skipForUnix(shell) || skipForWindows(shell)) {
    return `${shell} does not apply to the current platform`;
  }

  if (isCI || typeof shell !== "string") {
    return false;
  }

  const PATH = process.env.PATH || process.env.Path;
  try {
    which.sync(shell, { path: PATH });
    return false;
  } catch {
    return `${shell} not installed`;
  }
}
