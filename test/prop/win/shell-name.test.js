/**
 * @overview Contains property tests for the `getShellName` function in
 * `./src/win.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { testProp } from "ava-fast-check";
import * as fc from "fast-check";
import sinon from "sinon";

import * as arbitraries from "./_arbitraries.js";
import { binCmd } from "../../common.cjs";

import { getShellName } from "../../../src/win.js";

testProp.before(() => {
  fc.configureGlobal({
    numRuns: 10 ** 5,
    interruptAfterTimeLimit: 2000,
    markInterruptAsFailure: false,
  });
});

testProp.before((t) => {
  const resolveExecutable = sinon.stub();
  resolveExecutable.returns("a");

  t.context.deps = { resolveExecutable };
});

testProp(
  "resolving the shell",
  [arbitraries.env(), fc.string()],
  (t, env, shell) => {
    getShellName({ env, shell }, t.context.deps);
    t.true(
      t.context.deps.resolveExecutable.calledWithExactly(
        { executable: shell },
        sinon.match.any
      )
    );
  }
);

testProp(
  "supported shell",
  [arbitraries.env(), arbitraries.winPath(), arbitraries.winShell()],
  (t, env, path, shell) => {
    t.context.deps.resolveExecutable.returns(`${path}\\${shell}`);

    const result = getShellName({ env, shell }, t.context.deps);
    t.is(result, shell);
  }
);

testProp(
  "unsupported shell",
  [arbitraries.env(), arbitraries.winPath(), arbitraries.notWinShell()],
  (t, env, path, shell) => {
    t.context.deps.resolveExecutable.returns(`${path}\\${shell}`);

    const result = getShellName({ env, shell }, t.context.deps);
    t.is(result, binCmd);
  }
);
