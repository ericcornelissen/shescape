/**
 * @overview Contains unit tests for the getting a shell's name on Windows
 * systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";
import sinon from "sinon";

import { binCmd, binPowerShell } from "../../common.js";

import * as win from "../../../src/win.js";

const supportedShells = [binCmd, binPowerShell];

test.beforeEach((t) => {
  const resolveExecutable = sinon.stub();
  resolveExecutable.returns("foobar");

  t.context.deps = { resolveExecutable };
});

test("the value being resolved", (t) => {
  const shell = "foobar";

  win.getShellName({ shell }, t.context.deps);
  t.true(
    t.context.deps.resolveExecutable.calledWithExactly(
      { executable: shell },
      sinon.match.any
    )
  );
});

for (const shell of supportedShells) {
  test(`the supported shell ${shell}`, (t) => {
    t.context.deps.resolveExecutable.returns(`C:\\Windows\\System32\\${shell}`);

    const result = win.getShellName({ shell }, t.context.deps);
    t.is(result, shell);
  });
}

test("the fallback for unsupported shells", (t) => {
  const shell = "foobar";

  t.context.deps.resolveExecutable.returns(`C:\\Windows\\System32\\${shell}`);

  const result = win.getShellName({ shell }, t.context.deps);
  t.is(result, binCmd);
});

test("the helpers provided to `resolveExecutable`", (t) => {
  const shell = "foobar";

  win.getShellName({ shell }, t.context.deps);
  t.true(
    t.context.deps.resolveExecutable.calledWithExactly(sinon.match.any, {
      exists: sinon.match.func,
      readlink: sinon.match.func,
      which: sinon.match.func,
    })
  );
});
