/**
 * @overview Contains property tests for the getting a shell's name.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { getShellName } from "../../../src/tmp.js";

testProp.before((t) => {
  const getBasename = sinon.stub();
  getBasename.returns("a");

  const getEscapeFunction = sinon.stub();
  getEscapeFunction.returns(() => {});

  const getFallbackShell = sinon.stub();
  getFallbackShell.returns("b");

  const resolveExecutable = sinon.stub();
  resolveExecutable.returns("c");

  t.context.deps = {
    getBasename,
    getEscapeFunction,
    getFallbackShell,
    resolveExecutable,
  };
});

testProp("resolving the shell", [fc.string()], (t, shell) => {
  getShellName({ shell }, t.context.deps);
  t.true(
    t.context.deps.resolveExecutable.calledWithExactly(
      { executable: shell },
      sinon.match.any
    )
  );
});

testProp(
  "supported shell",
  [fc.string(), fc.string()],
  (t, shell, shellName) => {
    t.context.deps.getBasename.returns(shellName);
    t.context.deps.getEscapeFunction.returns(() => {});

    const result = getShellName({ shell }, t.context.deps);
    t.is(result, shellName);
  }
);

testProp(
  "unsupported shell",
  [fc.string(), fc.string()],
  (t, shell, fallbackShell) => {
    t.context.deps.getEscapeFunction.returns(null);
    t.context.deps.getFallbackShell.returns(fallbackShell);

    const result = getShellName({ shell }, t.context.deps);
    t.is(result, fallbackShell);
  }
);
