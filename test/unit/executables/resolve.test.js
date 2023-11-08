/**
 * @overview Contains unit tests for the functionality to resolve executables.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary } from "./_.js";

import { resolveExecutable } from "../../../src/executables.js";

test.before((t) => {
  const executable = "/bin/sh";
  const resolvedExecutable = "/path/to/sh";
  const linkedExecutable = "/bin/bash";
  t.not(executable, resolvedExecutable);
  t.not(executable, linkedExecutable);
  t.not(resolvedExecutable, linkedExecutable);

  const env = {
    PATH: "/bin:/usr/bin",
  };

  t.context = { env, executable, linkedExecutable, resolvedExecutable };
});

test.beforeEach((t) => {
  const exists = sinon.stub().returns(true);
  const readlink = sinon.stub();
  const which = sinon.stub();

  t.context.deps = { exists, readlink, which };
});

testProp(
  "env.PATH is defined",
  [arbitrary.env(), fc.string()],
  (t, env, envPath) => {
    t.context.deps.which.resetHistory();

    env.PATH = envPath;

    const { executable } = t.context;
    const args = { env, executable };

    resolveExecutable(args, t.context.deps);
    t.is(t.context.deps.which.callCount, 1);
    t.true(
      t.context.deps.which.calledWithExactly(sinon.match.any, {
        path: env.PATH,
      }),
    );
  },
);

testProp(
  "env.Path is defined (not env.PATH)",
  [arbitrary.env(), fc.string()],
  (t, env, envPath) => {
    t.context.deps.which.resetHistory();

    delete env.PATH;
    env.Path = envPath;

    const { executable } = t.context;
    const args = { env, executable };

    resolveExecutable(args, t.context.deps);
    t.is(t.context.deps.which.callCount, 1);
    t.true(
      t.context.deps.which.calledWithExactly(sinon.match.any, {
        path: env.Path,
      }),
    );
  },
);

testProp("env.PATH and env.Path are missing", [arbitrary.env()], (t, env) => {
  t.context.deps.which.resetHistory();

  delete env.PATH;
  delete env.Path;

  const { executable } = t.context;
  const args = { env, executable };

  resolveExecutable(args, t.context.deps);
  t.is(t.context.deps.which.callCount, 1);
  t.true(
    t.context.deps.which.calledWithExactly(sinon.match.any, {
      path: undefined,
    }),
  );
});

testProp(
  "env.PATH is polluted",
  [arbitrary.env(), fc.string()],
  (t, env, prototypePath) => {
    t.context.deps.which.resetHistory();

    env = Object.assign(Object.create({ PATH: prototypePath }), env);

    const { executable } = t.context;
    const args = { env, executable };

    resolveExecutable(args, t.context.deps);
    t.is(t.context.deps.which.callCount, 1);
    t.false(
      t.context.deps.which.calledWithExactly(sinon.match.any, {
        path: prototypePath,
      }),
    );
  },
);

testProp(
  "env.Path is polluted",
  [arbitrary.env(), fc.string()],
  (t, env, prototypePath) => {
    t.context.deps.which.resetHistory();

    env = Object.assign(Object.create({ Path: prototypePath }), env);

    const { executable } = t.context;
    const args = { env, executable };

    resolveExecutable(args, t.context.deps);
    t.is(t.context.deps.which.callCount, 1);
    t.false(
      t.context.deps.which.calledWithExactly(sinon.match.any, {
        path: prototypePath,
      }),
    );
  },
);

test("the executable cannot be resolved", (t) => {
  const { env, executable } = t.context;
  const args = { env, executable };

  t.context.deps.which.throws();

  t.throws(() => resolveExecutable(args, t.context.deps), {
    instanceOf: Error,
    message: `No executable could be found for ${executable}`,
  });

  t.is(t.context.deps.which.callCount, 1);
  t.true(t.context.deps.which.calledWithExactly(executable, sinon.match.any));

  t.is(t.context.deps.exists.callCount, 0);
  t.is(t.context.deps.readlink.callCount, 0);
});

test("the executable doesn't exist", (t) => {
  const { env, executable, resolvedExecutable } = t.context;
  const args = { env, executable };

  t.context.deps.exists.returns(false);
  t.context.deps.which.returns(resolvedExecutable);

  t.throws(() => resolveExecutable(args, t.context.deps), {
    instanceOf: Error,
    message: `No executable could be found for ${executable}`,
  });

  t.is(t.context.deps.exists.callCount, 1);
  t.true(t.context.deps.exists.calledWithExactly(resolvedExecutable));

  t.is(t.context.deps.which.callCount, 1);
  t.is(t.context.deps.readlink.callCount, 0);
});

test("the executable exists and is not a (sym)link", (t) => {
  const { env, executable, resolvedExecutable } = t.context;
  const args = { env, executable };

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
  const { env, executable, linkedExecutable, resolvedExecutable } = t.context;
  const args = { env, executable };

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
