/**
 * @overview Contains AVA test macros for end-to-end testing to enable running
 * the same suite of tests for both ESModule and CommonJS.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const test = require("ava");
const os = require("os");

const examples = require("./_examples.cjs");
const common = require("../common.cjs");

function getPlatformShells() {
  const platform = os.platform();
  if (platform === "win32") {
    return [common.binCmd, common.binPowerShell];
  } else {
    return [common.binBash, common.binDash, common.binZsh];
  }
}

function getPlatformExamples(shell) {
  const platform = os.platform();

  let result = examples.unixEscape;
  if (platform === "win32") {
    result = examples.winEscape;
  }

  return Object.values(result[shell]).flat();
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

function* iteration(interpolation) {
  const shells = getPlatformShells();
  for (const shell of shells) {
    const shellExamples = getPlatformExamples(shell);
    for (const example of shellExamples) {
      const input = example.input;
      const expected = getExpectedValue(example, interpolation);
      yield { expected, input, shell };
    }
  }
}

module.exports.escape = test.macro({
  exec: function (t, { escape, interpolation }) {
    for (const { expected, input, shell } of iteration(interpolation)) {
      const result = escape(input, { shell, interpolation });
      t.is(result, expected);
    }
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
    for (const { expected, input, shell } of iteration(interpolation)) {
      const result = escapeAll([input], { shell, interpolation });
      t.deepEqual(result, [expected]);
    }
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
    for (const { expected, input, shell } of iteration(false)) {
      const result = quote(input, { shell });
      t.true(result.includes(expected));
      t.regex(result, /^(".*"|'.*')$/);
    }
  },
  title: function () {
    return "input is escaped";
  },
});

module.exports.quoteAll = test.macro({
  exec: function (t, { quoteAll }) {
    for (const { expected, input, shell } of iteration(false)) {
      const result = quoteAll([input], { shell });
      t.true(result[0].includes(expected));
      t.regex(result[0], /^(".*"|'.*')$/);
    }
  },
  title: function () {
    return "input is escaped";
  },
});
