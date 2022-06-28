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

function getPlatformShells() {
  const platform = os.platform();
  if (platform === "win32") {
    return common.shellsWindows;
  } else {
    return common.shellsUnix;
  }
}

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

function getExpectedValue(example, interpolation) {
  if (interpolation === false) {
    return example.expected.noInterpolation;
  } else if (interpolation === true) {
    return example.expected.interpolation;
  } else {
    return example.expected.noInterpolation;
  }
}

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

module.exports.escape = test.macro({
  exec: function (t, { escape, interpolation }) {
    for (const { expected, input, shell } of escapeFixtures(interpolation)) {
      const result = escape(input, { shell, interpolation });
      t.is(result, expected);
    }

    t.notThrows(() => escape("foobar", { shell: undefined }));
    t.notThrows(() => escape("foobar", { shell: false }));
    t.notThrows(() => escape("foobar", { shell: true }));

    t.throws(() => escape(undefined));
    t.throws(() => escape(null));
    t.throws(() => escape({ toString: null }));
    t.throws(() => escape({ toString: () => null }));
  },
  title: function (_, { interpolation }) {
    if (interpolation === true) {
      return "with interpolation";
    } else if (interpolation === false) {
      return "without interpolation";
    } else {
      return "with default interpolation";
    }
  },
});

module.exports.escapeAll = test.macro({
  exec: function (t, { escapeAll, interpolation }) {
    for (const { expected, input, shell } of escapeFixtures(interpolation)) {
      const result = escapeAll([input], { shell, interpolation });
      t.deepEqual(result, [expected]);
    }

    for (const { expected, input, shell } of escapeFixtures(interpolation)) {
      const result = escapeAll(input, { shell, interpolation });
      t.deepEqual(result, [expected]);
    }

    t.notThrows(() => escapeAll(["foo", "bar"], { shell: undefined }));
    t.notThrows(() => escapeAll(["foo", "bar"], { shell: false }));
    t.notThrows(() => escapeAll(["foo", "bar"], { shell: true }));

    t.throws(() => escapeAll([undefined]));
    t.throws(() => escapeAll([null]));
    t.throws(() => escapeAll([{ toString: null }]));
    t.throws(() => escapeAll([{ toString: () => null }]));
  },
  title: function (_, { interpolation }) {
    if (interpolation === true) {
      return "with interpolation";
    } else if (interpolation === false) {
      return "without interpolation";
    } else {
      return "with default interpolation";
    }
  },
});

module.exports.quote = test.macro({
  exec: function (t, { quote }) {
    for (const { expected, input, shell } of escapeFixtures(false)) {
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

    t.throws(() => quote(undefined));
    t.throws(() => quote(null));
    t.throws(() => quote({ toString: null }));
    t.throws(() => quote({ toString: () => null }));
  },
  title: function () {
    return "input is escaped";
  },
});

module.exports.quoteAll = test.macro({
  exec: function (t, { quoteAll }) {
    for (const { expected, input, shell } of escapeFixtures(false)) {
      const result = quoteAll([input], { shell });
      t.true(result[0].includes(expected));
    }

    for (const { expected, input, shell } of escapeFixtures(false)) {
      const result = quoteAll(input, { shell });
      t.true(result[0].includes(expected));
    }

    for (const { expected, input, shell } of quoteFixtures()) {
      const result = quoteAll([input], { shell });
      t.true(result.includes(expected));
    }

    t.notThrows(() => quoteAll(["foo", "bar"], { shell: undefined }));
    t.notThrows(() => quoteAll(["foo", "bar"], { shell: false }));
    t.notThrows(() => quoteAll(["foo", "bar"], { shell: true }));

    t.throws(() => quoteAll([undefined]));
    t.throws(() => quoteAll([null]));
    t.throws(() => quoteAll([{ toString: null }]));
    t.throws(() => quoteAll([{ toString: () => null }]));
  },
  title: function () {
    return "input is escaped";
  },
});

module.exports.prototypePollution =
  require("../_macros.cjs").prototypePollution;
