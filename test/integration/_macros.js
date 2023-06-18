/**
 * @overview Provides AVA test macros for integration testing to enable running
 * the same suite of tests for both ESModule and CommonJS.
 * @license MIT
 */

import os from "node:os";

import test from "ava";

import * as fixturesUnix from "../fixtures/unix.js";
import * as fixturesWindows from "../fixtures/win.js";
import common from "../_constants.cjs";

/**
 * Get a list of the shells officially supported by Shescape for the current
 * platform.
 *
 * @returns {string[]} Support shells for the current platform.
 */
function getPlatformShells() {
  const platform = os.platform();
  if (platform === "win32") {
    return common.shellsWindows;
  } else {
    return common.shellsUnix;
  }
}

/**
 * Get input-output examples for quoting and escaping for a particular shell.
 *
 * @param {string} shell The shell to get examples for.
 * @returns {object} Example values for escaping and quote.
 */
function getPlatformExamples(shell) {
  const platform = os.platform();

  let escape = fixturesUnix.escape;
  let flag = fixturesUnix.flag;
  let quote = fixturesUnix.quote;
  if (platform === "win32") {
    escape = fixturesWindows.escape;
    flag = fixturesWindows.flag;
    quote = fixturesWindows.quote;
  }

  return {
    escapeExamples: Object.values(escape[shell]).flat(),
    flagExamples: Object.values(flag).flat(),
    quoteExamples: Object.values(quote[shell]).flat(),
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
 * Generate example fixtures for escaping.
 *
 * @param {boolean} interpolation The `interpolation` option's value.
 * @yields Examples of the form `{ expected, input, shell }`.
 */
function* escapeFixtures(interpolation) {
  const shells = getPlatformShells();
  for (const shell of shells) {
    const { escapeExamples } = getPlatformExamples(shell);
    for (const example of escapeExamples) {
      const input = example.input;
      const expected = getExpectedValue(example, interpolation);
      yield { expected, input, shell };
    }
  }
}

/**
 * The escapeSuccess macro tests the behaviour of `shescape.escape` with values
 * for which the function should succeed.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.escape The `escape` function.
 */
export const escapeSuccess = test.macro({
  exec: function (t, { escape }) {
    for (const interpolation of [undefined, true, false]) {
      for (const { expected, input, shell } of escapeFixtures(interpolation)) {
        const result = escape(input, { interpolation, shell });
        t.is(result, expected);
      }
    }

    t.notThrows(() => escape("foobar", { shell: undefined }));
    t.notThrows(() => escape("foobar", { shell: false }));
    t.notThrows(() => escape("foobar", { shell: true }));
  },
  title: function (providedTitle) {
    return `input is escaped (${providedTitle})`;
  },
});

/**
 * The escapeAllSuccess macro tests the behaviour of `shescape.escapeAll` with
 * values for which the function should succeed.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.escapeAll The `escapeAll` function.
 */
export const escapeAllSuccess = test.macro({
  exec: function (t, { escapeAll }) {
    for (const interpolation of [undefined, true, false]) {
      for (const { expected, input, shell } of escapeFixtures(interpolation)) {
        const result = escapeAll([input], { interpolation, shell });
        t.deepEqual(result, [expected]);
      }
    }

    t.notThrows(() => escapeAll(["foo", "bar"], { shell: undefined }));
    t.notThrows(() => escapeAll(["foo", "bar"], { shell: false }));
    t.notThrows(() => escapeAll(["foo", "bar"], { shell: true }));
  },
  title: function (providedTitle) {
    return `inputs are escaped (${providedTitle})`;
  },
});

/**
 * Generate example fixtures for escaping flags.
 *
 * @yields Examples of the form `{ expected, input, shell }`.
 */
function* flagFixtures() {
  const shells = getPlatformShells();
  for (const shell of shells) {
    const { flagExamples } = getPlatformExamples(shell);
    for (const example of flagExamples) {
      const input = example.input;
      const expected = example.expected;
      yield { expected, input, shell };
    }
  }
}

/**
 * The escapeFlags macro tests the behaviour of `shescape.escape` and with
 * values that could be flags.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.escape The `escape` function.
 */
export const escapeFlags = test.macro({
  exec: function (t, { escape }) {
    for (const { expected, input, shell } of flagFixtures()) {
      for (const interpolation of [undefined, true, false]) {
        const result = escape(input, {
          flagProtection: true,
          interpolation,
          shell,
        });
        t.is(result, expected);
      }
    }
  },
  title: function (providedTitle) {
    return `flag is escaped (${providedTitle})`;
  },
});

/**
 * The escapeAllFlags macro tests the behaviour of `shescape.escapeAll` and with
 * values that could be flags.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.escapeAll The `escapeAll` function.
 */
export const escapeAllFlags = test.macro({
  exec: function (t, { escapeAll }) {
    for (const { expected, input, shell } of flagFixtures()) {
      for (const interpolation of [undefined, true, false]) {
        const results = escapeAll([input], {
          flagProtection: true,
          interpolation,
          shell,
        });
        t.deepEqual(results, [expected]);
      }
    }
  },
  title: function (providedTitle) {
    return `flag is escaped (${providedTitle})`;
  },
});

/**
 * TODO: this is not a macro.
 *
 * Generate example fixtures for quoting for the current platform..
 *
 * @yields Examples of the form `{ expected, input, shell }`.
 */
export function* getQuoteExamples() {
  const shells = getPlatformShells();
  for (const shell of shells) {
    const { quoteExamples } = getPlatformExamples(shell);
    for (const { expected, input } of quoteExamples) {
      yield { expected, input, shell };
    }
  }
}

export { prototypePollution } from "../_macros.js";
