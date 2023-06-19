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
 * @returns {object} All test fixtures for the current platform.
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
 * Get the test fixtures for a given shell.
 *
 * @param {string} shell The shell to get examples for.
 * @returns {object} All test fixtures for `shell`.
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
 * Generate example fixtures for escaping for the current platform.
 *
 * @yields Examples of the form `{ expected, input, options }`.
 */
export function* escapeExamples() {
  const shells = getPlatformShells();
  for (const shell of shells) {
    const shellFixtures = getShellFixtures(shell);
    for (const example of shellFixtures.escape) {
      const input = example.input;

      {
        const expected = example.expected.interpolation;
        const options = { flagProtection: false, interpolation: true, shell };
        yield { expected, input, options };
      }

      {
        const expected = example.expected.noInterpolation;
        const options = { flagProtection: false, interpolation: false, shell };
        yield { expected, input, options };
      }
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
