/**
 * @overview Contains unit tests the escaping logic of `./src/main.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";
import sinon from "sinon";

import * as common from "./_common.js";
import * as macros from "./_macros.js";

import { resolveExecutable } from "../../../src/executables.js";

import { escapeShellArg } from "../../../src/main.js";

test.beforeEach(common.setupArgs);
test.beforeEach(common.setupStubs);

test("the return value", (t) => {
  const escapedArg = "foobar";
  t.context.deps.escapeFunction.returns(escapedArg);

  const result = escapeShellArg(t.context.args, t.context.deps);
  t.is(result, escapedArg);
});

test("getting the escape function", (t) => {
  const shellName = "foobar";
  t.context.deps.getShellName.returns(shellName);

  escapeShellArg(t.context.args, t.context.deps);

  t.is(t.context.deps.getEscapeFunction.callCount, 1);
  t.true(t.context.deps.getEscapeFunction.alwaysCalledWithExactly(shellName));
});

test("no shell is specified", (t) => {
  t.context.args.options = {};
  t.is(t.context.args.options.shell, undefined);

  const shell = "foobar";
  t.context.deps.getDefaultShell.returns(shell);

  escapeShellArg(t.context.args, t.context.deps);

  t.is(t.context.deps.getDefaultShell.callCount, 1);
  t.true(
    t.context.deps.getDefaultShell.calledWithExactly(
      sinon.match({ env: t.context.args.process.env })
    )
  );
  t.true(
    t.context.deps.getShellName.calledWithExactly(
      sinon.match({ shell }),
      sinon.match.any
    )
  );
});

test("a shell is specified", (t) => {
  t.context.args.options = { shell: "shell" };
  t.not(t.context.args.options.shell, undefined);

  escapeShellArg(t.context.args, t.context.deps);

  t.true(t.context.deps.getDefaultShell.notCalled);
  t.true(
    t.context.deps.getShellName.calledWithExactly(
      sinon.match({ shell: t.context.args.options.shell }),
      sinon.match.any
    )
  );
});

test("shell name helpers", (t) => {
  escapeShellArg(t.context.args, t.context.deps);

  t.true(
    t.context.deps.getShellName.calledOnceWithExactly(sinon.match.any, {
      resolveExecutable,
    })
  );
});

test("interpolation is omitted", (t) => {
  t.context.args.options = {};

  escapeShellArg(t.context.args, t.context.deps);
  t.true(
    t.context.deps.escapeFunction.calledWithExactly(sinon.match.any, false)
  );
});

for (const interpolation of [true, false]) {
  test(`interpolation is set to ${interpolation}`, (t) => {
    t.context.args.options = { interpolation };

    escapeShellArg(t.context.args, t.context.deps);
    t.true(
      t.context.deps.escapeFunction.calledWithExactly(
        sinon.match.any,
        interpolation
      )
    );
  });
}

test(macros.escapeSuccess, { input: "a", expected: "a", fn: escapeShellArg });
test(macros.escapeSuccess, { input: 42, expected: "42", fn: escapeShellArg });
test(macros.escapeSuccess, {
  input: true,
  expected: "true",
  fn: escapeShellArg,
});

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

test(macros.prototypePollution, { fn: escapeShellArg });
