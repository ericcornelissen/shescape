/**
 * @overview Provides generators of test fixtures for the current platform.
 * @license MIT
 */

import os from "node:os";

import * as fixturesUnix from "../fixtures/unix.js";
import * as fixturesWindows from "../fixtures/win.js";
import common from "../_constants.cjs";

/**
 * Returns the `shell` option values officially supported by Shescape for the
 * current platform.
 *
 * @returns {(string | boolean)[]} Valid `shell` option values.
 */
function getPlatformShells() {
  const platform = os.platform();
  switch (platform) {
    case "win32":
      return [false, ...common.shellsWindows];
    default:
      return [false, ...common.shellsUnix];
  }
}

/**
 * Returns the test fixtures for the current platform.
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
 * Returns the test fixtures for a given shell.
 *
 * @param {string} shell The shell to get examples for.
 * @returns {object} All test fixtures for `shell`.
 */
function getShellFixtures(shell) {
  const fixtures = getPlatformFixtures();
  const shellName = shell === false ? null : shell;
  return {
    escape: Object.values(fixtures.escape[shellName]).flat(),
    flag: Object.values(fixtures.flag[shellName]).flat(),
    quote: Object.values(fixtures.quote[shellName]).flat(),
  };
}

/**
 * Generates example fixtures for escaping for the current platform.
 *
 * @yields Examples of the form `{ expected, input, options }`.
 */
export function* escapeExamples() {
  const shells = getPlatformShells();
  for (const shell of shells) {
    const shellFixtures = getShellFixtures(shell);

    for (const example of shellFixtures.escape) {
      const input = example.input;
      const expected = example.expected;
      const options = { flagProtection: false, shell };
      yield { expected, input, options };
    }

    for (const example of shellFixtures.flag) {
      const input = example.input;
      const expected = example.expected.unquoted;
      const options = { flagProtection: true, shell };
      yield { expected, input, options };
    }
  }
}
/**
 * Generates example fixtures for quoting for the current platform.
 *
 * @yields Examples of the form `{ expected, input, options }`.
 */
export function* quoteExamples() {
  const shells = getPlatformShells();
  for (const shell of shells.filter((shell) => !!shell)) {
    const shellFixtures = getShellFixtures(shell);

    for (const example of shellFixtures.quote) {
      const input = example.input;
      const expected = example.expected;
      const options = { flagProtection: false, shell };
      yield { expected, input, options };
    }

    for (const example of shellFixtures.flag) {
      const input = example.input;
      const expected = example.expected.quoted;
      const options = { flagProtection: true, shell };
      yield { expected, input, options };
    }
  }
}
