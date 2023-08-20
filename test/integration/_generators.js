/**
 * @overview Provides generators of test fixtures for the current platform.
 * @license MIT
 */

import * as fixturesUnix from "../fixtures/unix.js";
import * as fixturesWindows from "../fixtures/win.js";
import common from "../_constants.cjs";

/**
 * Returns the `shell` option values officially supported by Shescape for the
 * current platform.
 *
 * @yields {string | boolean} Supported shells for the current platform.
 */
export function* platformShells() {
  if (common.isWindows) {
    yield* [false, ...common.shellsWindows];
  } else {
    yield* [false, ...common.shellsUnix];
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
 * @param {string} shell A shell name.
 * @yields Examples of the form `{ expected, input, options }`.
 */
export function* escapeExamples(shell) {
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

  for (const example of shellFixtures.flag) {
    const input = example.input;
    const expected = example.expected.unquoted;
    const options = { flagProtection: true, shell };
    yield { expected, input, options };
  }
}
/**
 * Generates example fixtures for quoting for the current platform.
 *
 * @param {string} shell A shell name.
 * @yields Examples of the form `{ expected, input, options }`.
 */
export function* quoteExamples(shell) {
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
