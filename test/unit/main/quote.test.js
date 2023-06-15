/**
 * @overview Contains unit tests the quoting logic of `./src/main.js`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary, constants, macros } from "./_.js";

import { resolveExecutable } from "../../../src/executables.js";

import { quoteShellArg } from "../../../src/main.js";

test.beforeEach((t) => {
  const getDefaultShell = sinon.stub();
  const getQuoteFunction = sinon.stub();
  const getShellName = sinon.stub();
  const getFlagProtectionFunction = sinon.stub();

  const escapeFunction = sinon.stub();
  const quoteFunction = sinon.stub();
  const flagProtectionFunction = sinon.stub();

  getQuoteFunction.returns([escapeFunction, quoteFunction]);
  getFlagProtectionFunction.returns(flagProtectionFunction);
  escapeFunction.returns("");
  quoteFunction.returns("");

  t.context.args = {
    arg: "a",
    options: {
      shell: "b",
    },
    process: {
      env: {},
    },
  };
  t.context.deps = {
    getDefaultShell,
    getQuoteFunction,
    getShellName,
    getFlagProtectionFunction,

    escapeFunction,
    quoteFunction,
    flagProtectionFunction,
  };
});

testProp("the return value", [fc.string()], (t, escapedArg) => {
  t.context.deps.quoteFunction.returns(escapedArg);

  const result = quoteShellArg(t.context.args, t.context.deps);
  t.is(result, escapedArg);
});

testProp("getting the quote function", [fc.string()], (t, shellName) => {
  t.context.deps.getQuoteFunction.resetHistory();

  t.context.deps.getShellName.returns(shellName);

  quoteShellArg(t.context.args, t.context.deps);

  t.is(t.context.deps.getQuoteFunction.callCount, 1);
  t.true(t.context.deps.getQuoteFunction.alwaysCalledWithExactly(shellName));
});

testProp("quoting", [fc.string(), fc.string()], (t, inputArg, escapedArg) => {
  t.context.args.arg = inputArg;
  t.context.deps.escapeFunction.returns(escapedArg);

  quoteShellArg(t.context.args, t.context.deps);

  t.true(t.context.deps.escapeFunction.calledWithExactly(inputArg));
  t.true(t.context.deps.quoteFunction.calledWithExactly(escapedArg));
});

for (const shell of [undefined, true, false]) {
  testProp(
    `shell is \`${shell}\``,
    [arbitrary.shescapeOptions()],
    (t, options = {}) => {
      t.context.deps.getDefaultShell.resetHistory();
      t.context.deps.getShellName.resetHistory();

      options.shell = shell;
      t.context.args.options = options;

      const defaultShell = "foobar";
      t.context.deps.getDefaultShell.returns(defaultShell);

      quoteShellArg(t.context.args, t.context.deps);

      t.is(t.context.deps.getDefaultShell.callCount, 1);
      t.true(
        t.context.deps.getDefaultShell.calledWithExactly(
          sinon.match({ env: t.context.args.process.env })
        )
      );
      t.true(
        t.context.deps.getShellName.calledWithExactly(
          sinon.match({ shell: defaultShell }),
          sinon.match.any
        )
      );
    }
  );
}

testProp(
  "a shell is specified",
  [fc.string(), arbitrary.shescapeOptions()],
  (t, shell, options = {}) => {
    t.context.args.options = { ...options, shell };

    quoteShellArg(t.context.args, t.context.deps);

    t.true(t.context.deps.getDefaultShell.notCalled);
    t.true(
      t.context.deps.getShellName.calledWithExactly(
        sinon.match({ shell: t.context.args.options.shell }),
        sinon.match.any
      )
    );
  }
);

test("shell name helpers", (t) => {
  quoteShellArg(t.context.args, t.context.deps);

  t.true(
    t.context.deps.getShellName.calledOnceWithExactly(sinon.match.any, {
      resolveExecutable,
    })
  );
});

testProp(
  "flagProtection option is omitted",
  [arbitrary.shescapeOptions()],
  (t, options = {}) => {
    delete options.flagProtection;
    t.context.args.options = options;

    quoteShellArg(t.context.args, t.context.deps);
    t.is(t.context.deps.flagProtectionFunction.callCount, 0);
  }
);

for (const flagProtection of [undefined, true, false]) {
  testProp(
    `flagProtection is set to ${flagProtection}`,
    [arbitrary.shescapeOptions()],
    (t, options = {}) => {
      t.context.deps.flagProtectionFunction.resetHistory();

      options.flagProtection = flagProtection;
      t.context.args.options = options;

      quoteShellArg(t.context.args, t.context.deps);
      t.is(
        t.context.deps.flagProtectionFunction.callCount,
        flagProtection ? 1 : 0
      );
    }
  );
}

testProp(
  "the escaping of the argument",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options = {}) => {
    t.context.args.options = { ...options, arg };

    t.notThrows(() => {
      quoteShellArg(t.context.args, t.context.deps);
    });
  }
);

for (const { description, value } of constants.illegalArguments) {
  test(description, macros.escapeTypeError, {
    input: value,
    fn: quoteShellArg,
  });
}

test("''.toString() does not return a string", (t) => {
  const stringToStringBackup = String.prototype.toString;
  String.prototype.toString = () => null;

  t.notThrows(() => {
    quoteShellArg(t.context.args, t.context.deps);
  });

  String.prototype.toString = stringToStringBackup;
});

test(macros.prototypePollution, (t, payload) => {
  t.context.args.options = payload;
  quoteShellArg(t.context.args, t.context.deps);
});
