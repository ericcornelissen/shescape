/**
 * @overview Provides generators of test fixtures for the current platform.
 * @license MIT
 */

import * as fixturesUnix from "../fixtures/unix.js";
import * as fixturesWindows from "../fixtures/win.js";
import common from "../_constants.cjs";

/**
 * Returns the shells officially supported by Shescape for the current platform.
 *
 * @returns {string[]} Supported shells for the current platform.
 */
function getPlatformShells() {
  if (common.isWindows) {
    return common.shellsWindows;
  } else {
    return common.shellsUnix;
  }
}

/**
 * Returns the test fixtures for the current platform.
 *
 * @returns {object} All test fixtures for the current platform.
 */
function getPlatformFixtures() {
  if (common.isWindows) {
    return fixturesWindows;
  } else {
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

  shell = shell.toLowerCase();
  if (common.isWindows) {
    shell = shell.toLowerCase().endsWith(".exe") ? shell : `${shell}.exe`;
  }

  return {
    escape: Object.values(fixtures.escape[shell]).flat(),
    flag: Object.values(fixtures.flag[shell]).flat(),
    quote: Object.values(fixtures.quote[shell]).flat(),
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
  for (const shell of shells) {
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
