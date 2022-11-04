/**
 * @overview Contains unit tests for the getting a shell's name.
 * @license Unlicense
 */

import test from "ava";
import sinon from "sinon";

import { getShellName } from "../../../src/tmp.js";

test.beforeEach((t) => {
  const getBasename = sinon.stub();
  getBasename.returns("foo");

  const getEscapeFunction = sinon.stub();
  getEscapeFunction.returns(() => {});

  const getFallbackShell = sinon.stub();
  getFallbackShell.returns("bar");

  const resolveExecutable = sinon.stub();
  resolveExecutable.returns("foobar");

  t.context.deps = {
    getBasename,
    getEscapeFunction,
    getFallbackShell,
    resolveExecutable,
  };
});

test("the value being resolved", (t) => {
  const shell = "foobar";

  getShellName({ shell }, t.context.deps);
  t.true(
    t.context.deps.resolveExecutable.calledWithExactly(
      { executable: shell },
      sinon.match.any
    )
  );
});

test("the resolved shell is supported", (t) => {
  const shell = "foobar";
  const shellBasename = "bar";

  t.context.deps.getBasename.returns(shellBasename);
  t.context.deps.getEscapeFunction.returns(() => {});

  const result = getShellName({ shell }, t.context.deps);
  t.is(result, shellBasename);
});

test("the resolved shell is unsupported", (t) => {
  const shell = "foo";
  const fallback = "bar";

  t.context.deps.getEscapeFunction.returns(null);
  t.context.deps.getFallbackShell.returns(fallback);

  const result = getShellName({ shell }, t.context.deps);
  t.is(result, fallback);
  t.is(t.context.deps.getFallbackShell.callCount, 1);
});

test("the value provided to `getBasename`", (t) => {
  const shell = "foo";
  const resolvedShell = "bar";

  t.context.deps.resolveExecutable.returns(resolvedShell);

  getShellName({ shell }, t.context.deps);
  t.true(t.context.deps.getBasename.calledWithExactly(resolvedShell));
});

test("the helpers provided to `resolveExecutable`", (t) => {
  const shell = "foobar";

  getShellName({ shell }, t.context.deps);
  t.true(
    t.context.deps.resolveExecutable.calledWithExactly(sinon.match.any, {
      exists: sinon.match.func,
      readlink: sinon.match.func,
      which: sinon.match.func,
    })
  );
});
