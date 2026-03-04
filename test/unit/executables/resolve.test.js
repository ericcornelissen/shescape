/**
 * @overview Contains unit tests for the functionality to resolve executables.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import * as ppTestKit from "pp-test-kit/simulate";
import * as sinon from "sinon";

import { resolveExecutable } from "../../../src/internal/executables.js";

import { arbitrary } from "./_.js";

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
  const readlink = sinon.stub().throws();
  const which = sinon.stub();

  t.context.deps = { exists, readlink, which };
});

testProp(
  "env.PATH is defined",
  [arbitrary.env({ keys: ["PATH", "Path"] }), fc.string()],
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
  [arbitrary.env({ keys: ["PATH", "Path"] }), fc.string()],
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
  [
    arbitrary.env({ keys: ["PATH", "Path"] }),
    fc.constantFrom("PATH", "Path"),
    fc.string(),
  ],
  (t, env, pathName, prototypePath) => {
    fc.pre(env.PATH !== prototypePath && env.Path !== prototypePath);

    t.context.deps.which.resetHistory();

    env = ppTestKit.simulatePollution(env, {
      property: pathName,
      value: prototypePath,
    });

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
  t.context.deps.which.returns(resolvedExecutable);

  t.context.deps.readlink.onCall(0).returns(linkedExecutable);
  t.context.deps.readlink.onCall(1).throws();

  const result = resolveExecutable(args, t.context.deps);
  t.is(result, linkedExecutable);

  t.is(t.context.deps.readlink.callCount, 2);
  t.true(t.context.deps.readlink.calledWithExactly(resolvedExecutable));

  t.is(t.context.deps.which.callCount, 1);
  t.is(t.context.deps.exists.callCount, 1);
});

test("the executable exists and is a (sym)link to a (sym)link (absolute)", (t) => {
  const { env, executable, linkedExecutable, resolvedExecutable } = t.context;
  const args = { env, executable };
  const intermediaryLink = "/path/to/link-to-link";

  t.context.deps.exists.returns(true);
  t.context.deps.which.returns(resolvedExecutable);

  t.context.deps.readlink.onCall(0).returns(intermediaryLink);
  t.context.deps.readlink.onCall(1).returns(linkedExecutable);
  t.context.deps.readlink.onCall(2).throws();

  const result = resolveExecutable(args, t.context.deps);
  t.is(result, linkedExecutable);

  t.is(t.context.deps.readlink.callCount, 3);
  t.true(t.context.deps.readlink.calledWithExactly(resolvedExecutable));
  t.true(t.context.deps.readlink.calledWithExactly(intermediaryLink));

  t.is(t.context.deps.which.callCount, 1);
  t.is(t.context.deps.exists.callCount, 1);
});

test("the executable exists and is a (sym)link to a (sym)link (relative)", (t) => {
  const { env, executable, linkedExecutable, resolvedExecutable } = t.context;
  const args = { env, executable };
  const intermediaryLink = "./link-to-link";

  t.context.deps.exists.returns(true);
  t.context.deps.which.returns(resolvedExecutable);

  t.context.deps.readlink.onCall(0).returns(intermediaryLink);
  t.context.deps.readlink.onCall(1).returns(linkedExecutable);
  t.context.deps.readlink.onCall(2).throws();

  const result = resolveExecutable(args, t.context.deps);
  t.is(result, linkedExecutable);

  t.is(t.context.deps.readlink.callCount, 3);
  t.true(t.context.deps.readlink.calledWithExactly(resolvedExecutable));
  t.true(t.context.deps.readlink.calledWithExactly("/path/to/link-to-link"));

  t.is(t.context.deps.which.callCount, 1);
  t.is(t.context.deps.exists.callCount, 1);
});

testProp(
  "the executable exists but there is a link cycle",
  [
    fc.array(fc.stringMatching(/^\/[a-z]{2,}$/u), {
      minLength: 1,
      maxLength: 64,
    }),
  ],
  (t, links) => {
    const { env, executable, resolvedExecutable } = t.context;
    const args = { env, executable };

    t.context.deps.exists.returns(true);
    t.context.deps.which.returns(resolvedExecutable);

    t.context.deps.readlink = sinon.stub();
    for (const index in links) {
      t.context.deps.readlink.onCall(index).returns(links[index]);
    }
    t.context.deps.readlink.onCall(links.length).returns(links[0]);

    t.throws(() => resolveExecutable(args, t.context.deps), {
      instanceOf: Error,
      message: `${executable} points to a link loop, cannot resolve shell`,
    });
  },
);
