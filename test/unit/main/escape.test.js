/**
 * @overview Contains unit tests the escaping logic of `./src/main.js`.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary, macros } from "./_.js";

import { resolveExecutable } from "../../../src/executables.js";

import { escapeShellArg } from "../../../src/main.js";

test.beforeEach((t) => {
  const getBasename = sinon.stub();
  const getDefaultShell = sinon.stub();
  const getEscapeFunction = sinon.stub();
  const getFallbackShell = sinon.stub();

  const escapeFunction = sinon.stub();

  getEscapeFunction.returns(escapeFunction);

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
    getFallbackShell,

    escapeFunction,
  };
});

testProp("the return value", [fc.string()], (t, escapedArg) => {
  t.context.deps.escapeFunction.returns(escapedArg);

  const result = escapeShellArg(t.context.args, t.context.deps);
  t.is(result, escapedArg);
});

testProp.skip("getting the escape function", [fc.string()], (t, shellName) => {
  t.context.deps.getEscapeFunction.resetHistory();

  t.context.deps.getShellName.returns(shellName);

  escapeShellArg(t.context.args, t.context.deps);

  t.is(t.context.deps.getEscapeFunction.callCount, 1);
  t.true(t.context.deps.getEscapeFunction.alwaysCalledWithExactly(shellName));
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

      escapeShellArg(t.context.args, t.context.deps);

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

    escapeShellArg(t.context.args, t.context.deps);

    t.true(t.context.deps.getDefaultShell.notCalled);
    t.true(
      t.context.deps.getShellName.calledWithExactly(
        sinon.match({ shell }),
        sinon.match.any
      )
    );
  }
);

test.skip("shell name helpers", (t) => {
  escapeShellArg(t.context.args, t.context.deps);

  t.true(
    t.context.deps.getShellName.calledOnceWithExactly(sinon.match.any, {
      resolveExecutable,
    })
  );
});

testProp(
  "interpolation option is omitted",
  [arbitrary.shescapeOptions()],
  (t, options = {}) => {
    delete options.interpolation;
    t.context.args.options = options;

    escapeShellArg(t.context.args, t.context.deps);
    t.true(
      t.context.deps.escapeFunction.calledWithExactly(
        sinon.match.any,
        false,
        sinon.match.any
      )
    );
  }
);

for (const interpolation of [undefined, true, false]) {
  testProp(
    `interpolation is set to ${interpolation}`,
    [arbitrary.shescapeOptions()],
    (t, options = {}) => {
      options.interpolation = interpolation;
      t.context.args.options = options;

      escapeShellArg(t.context.args, t.context.deps);
      t.true(
        t.context.deps.escapeFunction.calledWithExactly(
          sinon.match.any,
          interpolation ? true : false,
          sinon.match.any
        )
      );
    }
  );
}

for (const quoted of [undefined, true, false]) {
  testProp(
    `quoted is ${quoted}`,
    [arbitrary.shescapeOptions()],
    (t, options = {}) => {
      options.quoted = quoted;
      t.context.args.options = options;

      escapeShellArg(t.context.args, t.context.deps);
      t.true(
        t.context.deps.escapeFunction.calledWithExactly(
          sinon.match.any,
          sinon.match.any,
          false
        )
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
      escapeShellArg(t.context.args, t.context.deps);
    });
  }
);

test(macros.escapeTypeError, { input: undefined, fn: escapeShellArg });
test(macros.escapeTypeError, { input: null, fn: escapeShellArg });
test("toString is missing", macros.escapeTypeError, {
  input: { toString: null },
  fn: escapeShellArg,
});
test("toString doesn't return a string", macros.escapeTypeError, {
  input: { toString: () => null },
  fn: escapeShellArg,
});

test(macros.prototypePollution, (t, payload) => {
  t.context.args.options = payload;
  escapeShellArg(t.context.args, t.context.deps);
});
