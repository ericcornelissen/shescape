/**
 * @overview Provides generators of test fixtures for the current platform.
 * @license MIT
 */

import os from "node:os";

import * as fixturesUnix from "../fixtures/unix.js";
import * as fixturesWindows from "../fixtures/win.js";
import common from "../_constants.cjs";

/**
 * Get a list of the shells officially supported by Shescape for the current
 * platform.
 *
 * @returns {string[]} Supported shells for the current platform.
 */
function getPlatformShells() {
  const platform = os.platform();
  switch (platform) {
    case "win32":
      return common.shellsWindows;
    default:
      return common.shellsUnix;
  }
}

/**
 * Get the test fixtures for the current platform.
 *
 * @returns {object} All fixtures for the current platform.
 */
function getPlatformFixtures() {
  const platform = os.platform();
  switch (platform) {
    case "win32":
      return fixturesWindows;
    default:
      return fixturesUnix;
  }
}

/**
 * Get input-output examples for quoting and escaping for a particular shell.
 *
 * @param {string} shell The shell to get examples for.
 * @returns {object} All fixtures for the shell.
 */
function getShellFixtures(shell) {
  const fixtures = getPlatformFixtures();
  return {
    escape: Object.values(fixtures.escape[shell]).flat(),
    flag: Object.values(fixtures.flag[shell]).flat(),
    quote: Object.values(fixtures.quote[shell]).flat(),
  };
}

/**
 * Get the expected value for a certain configuration.
 *
 * @param {object} example The example object.
 * @param {boolean} interpolation To get the expected interpolation value.
 * @returns {string} The expected value for the given example.
 */
function getExpectedValue(example, interpolation) {
  if (interpolation === true) {
    return example.expected.interpolation;
  } else {
    return example.expected.noInterpolation;
  }
}

/**
 * Generate example fixtures for escaping for the current platform.
 *
 * @param {boolean} interpolation The `interpolation` option's value.
 * @yields Examples of the form `{ expected, input, shell }`.
 */
export function* escapeExamples(interpolation) {
  const shells = getPlatformShells();
  for (const shell of shells) {
    const shellFixtures = getShellFixtures(shell);
    for (const example of shellFixtures.escape) {
      const input = example.input;
      const expected = getExpectedValue(example, interpolation);
      yield { expected, input, shell };
    }
  }
}

/**
 * Generate example fixtures for escaping flags for the current platform.
 *
 * @yields Examples of the form `{ expected, input, shell }`.
 */
export function* escapeFlagExamples() {
  const shells = getPlatformShells();
  for (const shell of shells) {
    const shellFixtures = getShellFixtures(shell);
    for (const example of shellFixtures.flag) {
      const input = example.input;
      const expected = example.expected.unquoted;
      yield { expected, input, shell };
    }
  }
}

/**
 * Generate example fixtures for quoting for the current platform.
 *
 * @yields Examples of the form `{ expected, input, shell }`.
 */
export function* quoteExamples() {
  const shells = getPlatformShells();
  for (const shell of shells) {
    const shellFixtures = getShellFixtures(shell);
    for (const example of shellFixtures.quote) {
      const input = example.input;
      const expected = example.expected;
      yield { expected, input, shell };
    }
  }
}

/**
 * Generate example fixtures for quoting flags for the current platform.
 *
 * @yields Examples of the form `{ expected, input, shell }`.
 */
export function* quoteFlagExamples() {
  const shells = getPlatformShells();
  for (const shell of shells) {
    const shellFixtures = getShellFixtures(shell);
    for (const example of shellFixtures.flag) {
      const input = example.input;
      const expected = example.expected.quoted;
      yield { expected, input, shell };
    }
  }
}
