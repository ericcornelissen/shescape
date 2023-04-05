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
  const getEscapeFunction = sinon.stub();
  const getQuoteFunction = sinon.stub();
  const getShellName = sinon.stub();

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
    getDefaultShell,
    getEscapeFunction,
    getQuoteFunction,
    getShellName,

    escapeFunction,
    quoteFunction,
  };
});

testProp("the return value", [fc.string()], (t, escapedArg) => {
  t.context.deps.quoteFunction.returns(escapedArg);

  const result = quoteShellArg(t.context.args, t.context.deps);
  t.is(result, escapedArg);
});

testProp("getting the escape function", [fc.string()], (t, shellName) => {
  t.context.deps.getEscapeFunction.resetHistory();

  t.context.deps.getShellName.returns(shellName);

  quoteShellArg(t.context.args, t.context.deps);

  t.is(t.context.deps.getEscapeFunction.callCount, 1);
  t.true(t.context.deps.getEscapeFunction.alwaysCalledWithExactly(shellName));
});

testProp("getting the quote function", [fc.string()], (t, shellName) => {
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
  "the used interpolation value",
  [arbitrary.shescapeOptions()],
  (t, options = {}) => {
    t.context.args.options = options;

    quoteShellArg(t.context.args, t.context.deps);
    t.true(
      t.context.deps.escapeFunction.calledWithExactly(
        sinon.match.any,
        sinon.match({ interpolation: false })
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
        sinon.match({ quoted: true })
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

for (const { description, value } of constants.illegalArguments) {
  test(description, macros.escapeTypeError, {
    input: value,
    fn: quoteShellArg,
  });
}

test(macros.prototypePollution, (t, payload) => {
  t.context.args.options = payload;
  quoteShellArg(t.context.args, t.context.deps);
});
