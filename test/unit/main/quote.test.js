/**
 * @overview Contains unit tests the quoting logic of `./src/main.js`.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary, macros } from "./_.js";

import { resolveExecutable } from "../../../src/executables.js";

import { quoteShellArg } from "../../../src/main.js";

test.beforeEach((t) => {
  const getBasename = sinon.stub();
  const getDefaultShell = sinon.stub();
  const getEscapeFunction = sinon.stub();
  const getQuoteFunction = sinon.stub();
  const getFallbackShell = sinon.stub();

  const escapeFunction = sinon.stub();
  const quoteFunction = sinon.stub();

  getEscapeFunction.returns(escapeFunction);
  getQuoteFunction.returns(quoteFunction);

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
    getBasename,
    getDefaultShell,
    getEscapeFunction,
    getQuoteFunction,
    getFallbackShell,

    escapeFunction,
    quoteFunction,
  };
});

testProp("the return value", [fc.string()], (t, escapedArg) => {
  t.context.deps.quoteFunction.returns(escapedArg);

  const result = quoteShellArg(t.context.args, t.context.deps);
  t.is(result, escapedArg);
});

testProp.skip("getting the escape function", [fc.string()], (t, shellName) => {
  t.context.deps.getEscapeFunction.resetHistory();

  t.context.deps.getShellName.returns(shellName);

  quoteShellArg(t.context.args, t.context.deps);

  t.is(t.context.deps.getEscapeFunction.callCount, 1);
  t.true(t.context.deps.getEscapeFunction.alwaysCalledWithExactly(shellName));
});

testProp.skip("getting the quote function", [fc.string()], (t, shellName) => {
  t.context.deps.getQuoteFunction.resetHistory();

  t.context.deps.getShellName.returns(shellName);

  quoteShellArg(t.context.args, t.context.deps);

  t.is(t.context.deps.getQuoteFunction.callCount, 1);
  t.true(t.context.deps.getQuoteFunction.alwaysCalledWithExactly(shellName));
});

testProp("quoting", [fc.string()], (t, escapedArg) => {
  t.context.deps.escapeFunction.returns(escapedArg);

  quoteShellArg(t.context.args, t.context.deps);

  t.true(t.context.deps.quoteFunction.calledWithExactly(escapedArg));
});

for (const shell of [undefined, true, false]) {
  testProp.skip(
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

testProp.skip(
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

test.skip("shell name helpers", (t) => {
  quoteShellArg(t.context.args, t.context.deps);

  t.true(
    t.context.deps.getShellName.calledOnceWithExactly(sinon.match.any, {
      resolveExecutable,
    })
  );
});

testProp(
  "the used interpolation value",
  [arbitrary.shescapeOptions()],
  (t, options = {}) => {
    t.context.args.options = options;

    quoteShellArg(t.context.args, t.context.deps);
    t.true(
      t.context.deps.escapeFunction.calledWithExactly(
        sinon.match.any,
        false,
        sinon.match.any
      )
    );
  }
);

testProp(
  "the used quoted value",
  [arbitrary.shescapeOptions()],
  (t, options = {}) => {
    t.context.args.options = options;

    quoteShellArg(t.context.args, t.context.deps);
    t.true(
      t.context.deps.escapeFunction.calledWithExactly(
        sinon.match.any,
        sinon.match.any,
        true
      )
    );
  }
);

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

test(macros.escapeTypeError, { input: undefined, fn: quoteShellArg });
test(macros.escapeTypeError, { input: null, fn: quoteShellArg });
test("toString is missing", macros.escapeTypeError, {
  input: { toString: null },
  fn: quoteShellArg,
});
test("toString doesn't return a string", macros.escapeTypeError, {
  input: { toString: () => null },
  fn: quoteShellArg,
});

test(macros.prototypePollution, (t, payload) => {
  t.context.args.options = payload;
  quoteShellArg(t.context.args, t.context.deps);
});
