/**
 * @overview Provides AVA test macros for integration testing to enable running
 * the same suite of tests for both ESModule and CommonJS.
 * @license Unlicense
 */

const os = require("node:os");

const test = require("ava");

const fixturesUnix = require("../fixtures/unix.cjs");
const fixturesWindows = require("../fixtures/win.cjs");
const common = require("../_constants.cjs");

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
 * @param {string} shell The shell.
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
 * @param {boolean} quoted To get the expected quoted value.
 * @returns {string} The expected value.
 */
function getExpectedValue(example, interpolation, quoted) {
  if (quoted === true) {
    return example.expected.quoted || example.expected.noInterpolation;
  } else if (interpolation === false) {
    return example.expected.noInterpolation;
  } else if (interpolation === true) {
    return example.expected.interpolation;
  } else {
    return example.expected.noInterpolation;
  }
}

/**
 * Generate example fixtures for escaping.
 *
 * @param {boolean} interpolation The `interpolation` option's value.
 * @param {boolean} quoted The `quoted` option's value.
 * @yields Examples of the form `{ expected, input, shell }`.
 */
function* escapeFixtures(interpolation, quoted) {
  const shells = getPlatformShells();
  for (const shell of shells) {
    const { escapeExamples } = getPlatformExamples(shell);
    for (const example of escapeExamples) {
      const input = example.input;
      const expected = getExpectedValue(example, interpolation, quoted);
      yield { expected, input, shell };
    }
  }
}

/**
 * Generate example fixtures for quoting.
 *
 * @yields Examples of the form `{ expected, input, shell }`.
 */
function* quoteFixtures() {
  const shells = getPlatformShells();
  for (const shell of shells) {
    const { quoteExamples } = getPlatformExamples(shell);
    for (const example of quoteExamples) {
      const input = example.input;
      const expected = example.expected.escaped;
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
module.exports.escapeSuccess = test.macro({
  exec: function (t, { escape }) {
    for (const interpolation of [undefined, true, false]) {
      for (const { expected, input, shell } of escapeFixtures(interpolation)) {
        const result = escape(input, { shell, interpolation });
        t.is(result, expected);
      }
    }

    t.notThrows(() => escape("foobar", { shell: undefined }));
    t.notThrows(() => escape("foobar", { shell: false }));
    t.notThrows(() => escape("foobar", { shell: true }));
  },
  title: function () {
    return "input is escaped";
  },
});

/**
 * The escapeFailure macro tests the behaviour of `shescape.escape` with values
 * for which the function should throw an error.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.escape The `escape` function.
 */
module.exports.escapeFailure = test.macro({
  exec: function (t, { escape }) {
    t.throws(() => escape(undefined));
    t.throws(() => escape(null));
    t.throws(() => escape({ toString: null }));
    t.throws(() => escape({ toString: () => null }));
  },
  title: function () {
    return "invalid arguments";
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
module.exports.escapeAllSuccess = test.macro({
  exec: function (t, { escapeAll }) {
    for (const interpolation of [undefined, true, false]) {
      for (const { expected, input, shell } of escapeFixtures(interpolation)) {
        const result = escapeAll([input], { shell, interpolation });
        t.deepEqual(result, [expected]);
      }
    }

    t.notThrows(() => escapeAll(["foo", "bar"], { shell: undefined }));
    t.notThrows(() => escapeAll(["foo", "bar"], { shell: false }));
    t.notThrows(() => escapeAll(["foo", "bar"], { shell: true }));
  },
  title: function () {
    return "inputs are escaped";
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
module.exports.escapeAllNonArray = test.macro({
  exec: function (t, { escapeAll }) {
    for (const interpolation of [undefined, true, false]) {
      for (const { expected, input, shell } of escapeFixtures(interpolation)) {
        const result = escapeAll(input, { shell, interpolation });
        t.deepEqual(result, [expected]);
      }
    }
  },
  title: function () {
    return "non-array arguments";
  },
});

/**
 * The escapeAllFailure macro tests the behaviour of `shescape.escapeAll` with
 * values for which the function should throw an error.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.escapeAll The `escapeAll` function.
 */
module.exports.escapeAllFailure = test.macro({
  exec: function (t, { escapeAll }) {
    t.throws(() => escapeAll([undefined]));
    t.throws(() => escapeAll([null]));
    t.throws(() => escapeAll([{ toString: null }]));
    t.throws(() => escapeAll([{ toString: () => null }]));
  },
  title: function () {
    return "invalid arguments";
  },
});

/**
 * The quoteSuccess macro tests the behaviour of `shescape.quote` with values
 * for which the function should succeed.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.quote The quote function.
 */
module.exports.quoteSuccess = test.macro({
  exec: function (t, { quote }) {
    for (const { expected, input, shell } of escapeFixtures(false, true)) {
      const result = quote(input, { shell });
      t.true(result.includes(expected));
    }

    for (const { expected, input, shell } of quoteFixtures()) {
      const result = quote(input, { shell });
      t.is(result, expected);
    }

    t.notThrows(() => quote("foobar", { shell: undefined }));
    t.notThrows(() => quote("foobar", { shell: false }));
    t.notThrows(() => quote("foobar", { shell: true }));
  },
  title: function () {
    return "input is escaped";
  },
});

/**
 * The quoteFailure macro tests the behaviour of `shescape.quote` with values
 * for which the function should throw an error.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.quote The `quote` function.
 */
module.exports.quoteFailure = test.macro({
  exec: function (t, { quote }) {
    t.throws(() => quote(undefined));
    t.throws(() => quote(null));
    t.throws(() => quote({ toString: null }));
    t.throws(() => quote({ toString: () => null }));
  },
  title: function () {
    return "invalid arguments";
  },
});

/**
 * The quoteAllSuccess macro tests the behaviour of `shescape.quoteAll` with
 * values for which the function should succeed.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.quoteAll The `quoteAll` function.
 */
module.exports.quoteAllSuccess = test.macro({
  exec: function (t, { quoteAll }) {
    for (const { expected, input, shell } of escapeFixtures(false, true)) {
      const result = quoteAll([input], { shell });
      t.true(result[0].includes(expected));
    }

    for (const { expected, input, shell } of quoteFixtures()) {
      const result = quoteAll([input], { shell });
      t.true(result.includes(expected));
    }

    t.notThrows(() => quoteAll(["foo", "bar"], { shell: undefined }));
    t.notThrows(() => quoteAll(["foo", "bar"], { shell: false }));
    t.notThrows(() => quoteAll(["foo", "bar"], { shell: true }));
  },
  title: function () {
    return "input is escaped";
  },
});

/**
 * The quoteAllNonArray macro tests the behaviour of `shescape.quoteAll` when
 * provided with a non-array value for the `args` parameter.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.quoteAll The `quoteAll` function.
 */
module.exports.quoteAllNonArray = test.macro({
  exec: function (t, { quoteAll }) {
    for (const { expected, input, shell } of escapeFixtures(false, true)) {
      const result = quoteAll(input, { shell });
      t.true(result[0].includes(expected));
    }
  },
  title: function () {
    return "non-array arguments";
  },
});

/**
 * The quoteAllFailure macro tests the behaviour of `shescape.quoteAll` with
 * values for which the function should throw an error.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this macro.
 * @param {Function} args.quoteAll The `quoteAll` function.
 */
module.exports.quoteAllFailure = test.macro({
  exec: function (t, { quoteAll }) {
    t.throws(() => quoteAll([undefined]));
    t.throws(() => quoteAll([null]));
    t.throws(() => quoteAll([{ toString: null }]));
    t.throws(() => quoteAll([{ toString: () => null }]));
  },
  title: function () {
    return "invalid arguments";
  },
});

module.exports.prototypePollution =
  require("../_macros.cjs").prototypePollution;
