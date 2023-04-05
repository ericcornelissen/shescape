/**
 * @overview Contains unit tests for the functionality to resolve executables.
 * @license MIT
 */

import test from "ava";
import sinon from "sinon";

import { resolveExecutable } from "../../../src/executables.js";

test.before((t) => {
  const executable = "/bin/sh";
  const resolvedExecutable = "/path/to/sh";
  const linkedExecutable = "/bin/bash";
  t.not(executable, resolvedExecutable);
  t.not(executable, linkedExecutable);
  t.not(resolvedExecutable, linkedExecutable);

  t.context = { executable, linkedExecutable, resolvedExecutable };
});

test.beforeEach((t) => {
  const exists = sinon.stub();
  const readlink = sinon.stub();
  const which = sinon.stub();

  t.context.deps = { exists, readlink, which };
});

test("the executable cannot be resolved", (t) => {
  const { executable } = t.context;
  const args = { executable };

  t.context.deps.which.throws();

  const result = resolveExecutable(args, t.context.deps);
  t.is(result, executable);

  t.is(t.context.deps.which.callCount, 1);
  t.true(t.context.deps.which.calledWithExactly(executable));

  t.is(t.context.deps.exists.callCount, 0);
  t.is(t.context.deps.readlink.callCount, 0);
});

test("the executable doesn't exist", (t) => {
  const { executable, resolvedExecutable } = t.context;
  const args = { executable };

  t.context.deps.exists.returns(false);
  t.context.deps.which.returns(resolvedExecutable);

  const result = resolveExecutable(args, t.context.deps);
  t.is(result, resolvedExecutable);

  t.is(t.context.deps.exists.callCount, 1);
  t.true(t.context.deps.exists.calledWithExactly(resolvedExecutable));

  t.is(t.context.deps.which.callCount, 1);
  t.is(t.context.deps.readlink.callCount, 0);
});

test("the executable exists and is not a (sym)link", (t) => {
  const { executable, resolvedExecutable } = t.context;
  const args = { executable };

  t.context.deps.exists.returns(true);
  t.context.deps.readlink.throws();
  t.context.deps.which.returns(resolvedExecutable);

  const result = resolveExecutable(args, t.context.deps);
  t.is(result, resolvedExecutable);

  t.is(t.context.deps.readlink.callCount, 1);
  t.true(t.context.deps.exists.calledWithExactly(resolvedExecutable));

  t.is(t.context.deps.which.callCount, 1);
  t.is(t.context.deps.exists.callCount, 1);
});

test("the executable exists and is a (sym)link", (t) => {
  const { executable, linkedExecutable, resolvedExecutable } = t.context;
  const args = { executable };

  t.context.deps.exists.returns(true);
  t.context.deps.readlink.returns(linkedExecutable);
  t.context.deps.which.returns(resolvedExecutable);

  const result = resolveExecutable(args, t.context.deps);
  t.is(result, linkedExecutable);

  t.is(t.context.deps.readlink.callCount, 1);
  t.true(t.context.deps.exists.calledWithExactly(resolvedExecutable));

  t.is(t.context.deps.which.callCount, 1);
  t.is(t.context.deps.exists.callCount, 1);
});

test("input validation", (t) => {
  const args = { executable: "a" };

  t.throws(() =>
    resolveExecutable(args, {
      exists: t.context.deps.exists,
      readlink: t.context.deps.readlink,
    })
  );

  t.throws(() =>
    resolveExecutable(args, {
      exists: t.context.deps.exists,
      which: t.context.deps.which,
    })
  );

  t.throws(() =>
    resolveExecutable(args, {
      readlink: t.context.deps.readlink,
      which: t.context.deps.which,
    })
  );
});
