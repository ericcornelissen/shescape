/**
 * @overview Contains property tests for the getting a shell's name on Windows
 * systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { testProp } from "ava-fast-check";
import * as fc from "fast-check";
import sinon from "sinon";

import * as arbitraries from "./_arbitraries.js";
import * as common from "../common.js";

import { getShellName } from "../../../src/win.js";

testProp.before(common.configureFastCheck);

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
    t.is(result, common.binCmd);
  }
);
