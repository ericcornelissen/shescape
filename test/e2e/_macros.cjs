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

  let escape = examples.unixEscape;
  let quote = examples.unixQuote;
  if (platform === "win32") {
    escape = examples.winEscape;
    quote = examples.winQuote;
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

function* iteration(interpolation) {
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

function* iteration2() {
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
    }

    for (const { expected, input, shell } of iteration2()) {
      const result = quote(input, { shell });
      t.is(result, expected);
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
    }

    for (const { expected, input, shell } of iteration2()) {
      const result = quoteAll([input], { shell });
      t.true(result.includes(expected));
    }
  },
  title: function () {
    return "input is escaped";
  },
});
