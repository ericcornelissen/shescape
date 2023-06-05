/**
 * @overview Contains unit tests the escaping logic of `./src/main.js`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary, constants, macros } from "./_.js";

import { resolveExecutable } from "../../../src/executables.js";

import { escapeShellArg } from "../../../src/main.js";

test.beforeEach((t) => {
  const getDefaultShell = sinon.stub();
  const getEscapeFunction = sinon.stub();
  const getShellName = sinon.stub();

  const escapeFunction = sinon.stub();
  const stripFlagPrefix = sinon.stub();

  getEscapeFunction.returns(escapeFunction);
  escapeFunction.returns("");

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
    getShellName,

    escapeFunction,
    stripFlagPrefix,
  };
});

testProp("the return value", [fc.string()], (t, escapedArg) => {
  t.context.deps.escapeFunction.returns(escapedArg);

  const result = escapeShellArg(t.context.args, t.context.deps);
  t.is(result, escapedArg);
});

testProp("getting the escape function", [fc.string()], (t, shellName) => {
  t.context.deps.getEscapeFunction.resetHistory();

  t.context.deps.getShellName.returns(shellName);

  escapeShellArg(t.context.args, t.context.deps);

  t.is(t.context.deps.getEscapeFunction.callCount, 1);
  t.true(
    t.context.deps.getEscapeFunction.alwaysCalledWithExactly(
      shellName,
      sinon.match.any
    )
  );
});

testProp("escaping", [fc.string()], (t, inputArg) => {
  t.context.args.arg = inputArg;

  escapeShellArg(t.context.args, t.context.deps);

  t.true(t.context.deps.escapeFunction.calledWithExactly(inputArg));
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

testProp(
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

test("shell name helpers", (t) => {
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
      t.context.deps.getEscapeFunction.calledWithExactly(
        sinon.match.any,
        sinon.match({ interpolation: false })
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
        t.context.deps.getEscapeFunction.calledWithExactly(
          sinon.match.any,
          sinon.match({ interpolation: interpolation ? true : false })
        )
      );
    }
  );
}

testProp(
  "flagProtection option is omitted",
  [arbitrary.shescapeOptions()],
  (t, options = {}) => {
    delete options.flagProtection;
    t.context.args.options = options;

    escapeShellArg(t.context.args, t.context.deps);
    t.is(t.context.deps.stripFlagPrefix.callCount, 0);
  }
);

for (const flagProtection of [undefined, true, false]) {
  testProp(
    `flagProtection is set to ${flagProtection}`,
    [arbitrary.shescapeOptions()],
    (t, options = {}) => {
      t.context.deps.stripFlagPrefix.resetHistory();

      options.flagProtection = flagProtection;
      t.context.args.options = options;

      escapeShellArg(t.context.args, t.context.deps);
      t.is(t.context.deps.stripFlagPrefix.callCount, flagProtection ? 1 : 0);
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

for (const { description, value } of constants.illegalArguments) {
  test(description, macros.escapeTypeError, {
    input: value,
    fn: escapeShellArg,
  });
}

test(macros.prototypePollution, (t, payload) => {
  t.context.args.options = payload;
  escapeShellArg(t.context.args, t.context.deps);
});
