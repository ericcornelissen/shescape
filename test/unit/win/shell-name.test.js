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

test.before((t) => {
  t.context.resolveExecutable = sinon.stub();
});

test.beforeEach((t) => {
  sinon.reset();

  t.context.resolveExecutable.returns("foobar");
});

test("resolves the provided shell", (t) => {
  const shell = "foobar";

  win.getShellName({ shell }, t.context);
  t.true(
    t.context.resolveExecutable.calledWithExactly(
      { executable: shell },
      sinon.match.any
    )
  );
});

for (const shell of supportedShells) {
  test(`return value for ${shell}`, (t) => {
    t.context.resolveExecutable.returns(`C:\\Windows\\System32\\${shell}`);

    const result = win.getShellName({ shell }, t.context);
    t.is(result, shell);
  });
}

test("fallback for unsupported shells", (t) => {
  const shell = "foobar";

  t.context.resolveExecutable.returns(`C:\\Windows\\System32\\${shell}`);

  const result = win.getShellName({ shell }, t.context);
  t.is(result, binCmd);
});

test("helpers provided to `resolveExecutable`", (t) => {
  const shell = "foobar";

  win.getShellName({ shell }, t.context);
  t.true(
    t.context.resolveExecutable.calledWithExactly(sinon.match.any, {
      exists: sinon.match.func,
      readlink: sinon.match.func,
      which: sinon.match.func,
    })
  );
});
