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
  let quote = fixturesUnix.quote;
  if (platform === "win32") {
    escape = fixturesWindows.escape;
    quote = fixturesWindows.quote;
  }

  return {
    escapeExamples: Object.values(escape[shell]).flat(),
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
 * The escapeAllNonArray macro tests the behaviour of `shescape.escapeAll` when
 * provided with a non-array value for the `args` parameter.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.escapeAll The `escapeAll` function.
 */
export const escapeAllNonArray = test.macro({
  exec: function (t, { escapeAll }) {
    for (const interpolation of [undefined, true, false]) {
      for (const { expected, input, shell } of escapeFixtures(interpolation)) {
        const result = escapeAll(input, { interpolation, shell });
        t.deepEqual(result, [expected]);
      }
    }
  },
  title: function (providedTitle) {
    return `non-array arguments (${providedTitle})`;
  },
});

/**
 * Pairs of flag/option inputs and expected outputs **if** flag protection is
 * enabled.
 */
const flagFixtures = [
  {
    input: "--foo",
    expected: {
      unquoted: { unix: "foo", win: "foo" },
      quoted: { unix: "'foo'", win: '"foo"' },
    },
  },
  {
    input: "--bar",
    expected: {
      unquoted: { unix: "bar", win: "bar" },
      quoted: { unix: "'bar'", win: '"bar"' },
    },
  },
  {
    input: "-foo",
    expected: {
      unquoted: { unix: "foo", win: "foo" },
      quoted: { unix: "'foo'", win: '"foo"' },
    },
  },
  {
    input: "-bar",
    expected: {
      unquoted: { unix: "bar", win: "bar" },
      quoted: { unix: "'bar'", win: '"bar"' },
    },
  },
  {
    input: "--foo=bar",
    expected: {
      unquoted: { unix: "foo=bar", win: "foo=bar" },
      quoted: { unix: "'foo=bar'", win: '"foo=bar"' },
    },
  },
  {
    input: "---foobar",
    expected: {
      unquoted: { unix: "foobar", win: "foobar" },
      quoted: { unix: "'foobar'", win: '"foobar"' },
    },
  },
  {
    input: "\0--a",
    expected: {
      unquoted: { unix: "a", win: "a" },
      quoted: { unix: "'a'", win: '"a"' },
    },
  },
  {
    input: "/foo",
    expected: {
      unquoted: { unix: "/foo", win: "foo" },
      quoted: { unix: "'/foo'", win: '"foo"' },
    },
  },
  {
    input: "/bar",
    expected: {
      unquoted: { unix: "/bar", win: "bar" },
      quoted: { unix: "'/bar'", win: '"bar"' },
    },
  },
  {
    input: "/foo=bar",
    expected: {
      unquoted: { unix: "/foo=bar", win: "foo=bar" },
      quoted: { unix: "'/foo=bar'", win: '"foo=bar"' },
    },
  },
  {
    input: "//foobar",
    expected: {
      unquoted: { unix: "//foobar", win: "foobar" },
      quoted: { unix: "'//foobar'", win: '"foobar"' },
    },
  },
  {
    input: "\0/a",
    expected: {
      unquoted: { unix: "/a", win: "a" },
      quoted: { unix: "'/a'", win: '"a"' },
    },
  },
];

/**
 * Get the expected value from an expected object of the `flagFixtures` for the
 * current platform.
 *
 * @param {object} expected The expected object from `flagFixtures`.
 * @param {boolean} quoted Whether to get the quoted expected value or not.
 * @returns {string} The expected string.
 */
function getExpectedEscapedFlag(expected, quoted) {
  const expectedValues = quoted ? expected.quoted : expected.unquoted;
  if (os.platform() === "win32") {
    return expectedValues.win;
  } else {
    return expectedValues.unix;
  }
}

/**
 * The escapeFlags macro tests the behaviour of `shescape.escape` and
 * `shescape.quote` with values that could be flags.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.fn The `escape` function.
 * @param {Function} [args.quotes=false] Whether or not `fn` quotes.
 */
export const escapeFlags = test.macro({
  exec: function (t, { fn, quotes }) {
    const flagProtection = true;

    for (const shell of getPlatformShells()) {
      for (const interpolation of [undefined, true, false]) {
        for (const { expected, input } of flagFixtures) {
          const result = fn(input, {
            flagProtection,
            interpolation,
            shell,
          });
          t.is(result, getExpectedEscapedFlag(expected, quotes));
        }
      }
    }
  },
  title: function (providedTitle) {
    return `flag is escaped (${providedTitle})`;
  },
});

/**
 * The escapeAllFlags macro tests the behaviour of `shescape.escapeAll` and
 * `shescape.quoteAll` with values that could be flags.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.fn The `escape` function.
 * @param {Function} [args.quotes=false] Whether or not `fn` quotes.
 */
export const escapeAllFlags = test.macro({
  exec: function (t, { fn, quotes }) {
    const flagProtection = true;

    for (const shell of getPlatformShells()) {
      for (const interpolation of [undefined, true, false]) {
        for (const { expected, input } of flagFixtures) {
          const result = fn([input], {
            flagProtection,
            interpolation,
            shell,
          });
          t.deepEqual(result, [getExpectedEscapedFlag(expected, quotes)]);
        }
      }
    }
  },
  title: function (providedTitle) {
    return `flag is escaped (${providedTitle})`;
  },
});

export { prototypePollution } from "../_macros.js";
