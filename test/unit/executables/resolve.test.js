/**
 * @overview Contains unit tests for the functionality to resolve executables.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import * as path from "node:path/posix";
import { beforeEach, suite, test } from "node:test";

import * as fc from "fast-check";
import * as ppTestKit from "pp-test-kit/simulate";
import * as sinon from "sinon";

import { resolveExecutable } from "../../../src/internal/executables.js";

import { arbitrary } from "./_.js";

suite("resolve", () => {
  const executable = "/bin/sh";
  const resolvedExecutable = "/path/to/sh";
  const linkedExecutable = "/bin/bash";

  const deps = {};
  const env = {
    PATH: "/bin:/usr/bin",
  };

  beforeEach(() => {
    deps.dirname = path.dirname;
    deps.exists = sinon.stub().returns(true);
    deps.readlink = sinon.stub().throws();
    deps.resolve = path.resolve;
    deps.which = sinon.stub();
  });

  test("pre-condition", () => {
    /* eslint-disable test/no-constant-assertion */
    assert.notEqual(executable, resolvedExecutable);
    assert.notEqual(executable, linkedExecutable);
    assert.notEqual(resolvedExecutable, linkedExecutable);
    /* eslint-enable test/no-constant-assertion */
  });

  test("env.PATH is defined", () => {
    fc.assert(
      fc.property(
        arbitrary.env({ keys: ["PATH", "Path"] }),
        fc.string(),
        (env, envPath) => {
          deps.which.resetHistory();

          env.PATH = envPath;

          const args = { env, executable };

          resolveExecutable(args, deps);
          assert.equal(deps.which.callCount, 1);
          assert.ok(
            deps.which.calledWithExactly(sinon.match.any, {
              path: env.PATH,
            }),
          );
        },
      ),
    );
  });

  test("env.Path is defined (not env.PATH)", () => {
    fc.assert(
      fc.property(
        arbitrary.env({ keys: ["PATH", "Path"] }),
        fc.string(),
        (env, envPath) => {
          deps.which.resetHistory();

          delete env.PATH;
          env.Path = envPath;

          const args = { env, executable };

          resolveExecutable(args, deps);
          assert.equal(deps.which.callCount, 1);
          assert.ok(
            deps.which.calledWithExactly(sinon.match.any, {
              path: env.Path,
            }),
          );
        },
      ),
    );
  });

  test("env.PATH and env.Path are missing", () => {
    fc.assert(
      fc.property(arbitrary.env(), (env) => {
        deps.which.resetHistory();

        delete env.PATH;
        delete env.Path;

        const args = { env, executable };

        resolveExecutable(args, deps);
        assert.equal(deps.which.callCount, 1);
        assert.ok(
          deps.which.calledWithExactly(sinon.match.any, {
            path: undefined,
          }),
        );
      }),
    );
  });

  test("env.PATH is polluted", () => {
    fc.assert(
      fc.property(
        arbitrary.env({ keys: ["PATH", "Path"] }),
        fc.constantFrom("PATH", "Path"),
        fc.string(),
        (env, pathName, prototypePath) => {
          fc.pre(env.PATH !== prototypePath && env.Path !== prototypePath);

          deps.which.resetHistory();

          env = ppTestKit.simulatePollution(env, {
            property: pathName,
            value: prototypePath,
          });

          const args = { env, executable };

          resolveExecutable(args, deps);
          assert.equal(deps.which.callCount, 1);
          assert.ok(
            !deps.which.calledWithExactly(sinon.match.any, {
              path: prototypePath,
            }),
          );
        },
      ),
    );
  });

  test("the executable cannot be resolved", () => {
    const args = { env, executable };

    deps.which.throws();

    assert.throws(
      () => {
        resolveExecutable(args, deps);
      },
      {
        name: "Error",
        message: `No executable could be found for ${executable}`,
      },
    );

    assert.equal(deps.which.callCount, 1);
    assert.ok(deps.which.calledWithExactly(executable, sinon.match.any));

    assert.equal(deps.exists.callCount, 0);
    assert.equal(deps.readlink.callCount, 0);
  });

  test("the executable doesn't exist", () => {
    const args = { env, executable };

    deps.exists.returns(false);
    deps.which.returns(resolvedExecutable);

    assert.throws(
      () => {
        resolveExecutable(args, deps);
      },
      {
        name: "Error",
        message: `No executable could be found for ${executable}`,
      },
    );

    assert.equal(deps.exists.callCount, 1);
    assert.ok(deps.exists.calledWithExactly(resolvedExecutable));

    assert.equal(deps.which.callCount, 1);
    assert.equal(deps.readlink.callCount, 0);
  });

  test("the executable exists and is not a (sym)link", () => {
    const args = { env, executable };

    deps.exists.returns(true);
    deps.readlink.throws();
    deps.which.returns(resolvedExecutable);

    const result = resolveExecutable(args, deps);
    assert.equal(result, resolvedExecutable);

    assert.equal(deps.readlink.callCount, 1);
    assert.ok(deps.exists.calledWithExactly(resolvedExecutable));

    assert.equal(deps.which.callCount, 1);
    assert.equal(deps.exists.callCount, 1);
  });

  test("the executable exists as a (sym)link", () => {
    const args = { env, executable };

    deps.exists.returns(true);
    deps.which.returns(resolvedExecutable);

    deps.readlink.onCall(0).returns(linkedExecutable);
    deps.readlink.onCall(1).throws();

    const result = resolveExecutable(args, deps);
    assert.equal(result, linkedExecutable);

    assert.equal(deps.readlink.callCount, 2);
    assert.ok(deps.readlink.calledWithExactly(resolvedExecutable));

    assert.equal(deps.which.callCount, 1);
    assert.equal(deps.exists.callCount, 1);
  });

  test("the executable exists as a (sym)link to a (sym)link (absolute)", () => {
    const args = { env, executable };
    const intermediaryLink = "/path/to/link-to-link";

    deps.exists.returns(true);
    deps.which.returns(resolvedExecutable);

    deps.readlink.onCall(0).returns(intermediaryLink);
    deps.readlink.onCall(1).returns(linkedExecutable);
    deps.readlink.onCall(2).throws();

    const result = resolveExecutable(args, deps);
    assert.equal(result, linkedExecutable);

    assert.equal(deps.readlink.callCount, 3);
    assert.ok(deps.readlink.calledWithExactly(resolvedExecutable));
    assert.ok(deps.readlink.calledWithExactly(intermediaryLink));

    assert.equal(deps.which.callCount, 1);
    assert.equal(deps.exists.callCount, 1);
  });

  test("the executable exists as a (sym)link to a (sym)link (relative)", () => {
    const args = { env, executable };
    const intermediaryLink = "./link-to-link";

    deps.exists.returns(true);
    deps.which.returns(resolvedExecutable);

    deps.readlink.onCall(0).returns(intermediaryLink);
    deps.readlink.onCall(1).returns(linkedExecutable);
    deps.readlink.onCall(2).throws();

    const result = resolveExecutable(args, deps);
    assert.equal(result, linkedExecutable);

    assert.equal(deps.readlink.callCount, 3);
    assert.ok(deps.readlink.calledWithExactly(resolvedExecutable));
    assert.ok(deps.readlink.calledWithExactly("/path/to/link-to-link"));

    assert.equal(deps.which.callCount, 1);
    assert.equal(deps.exists.callCount, 1);
  });

  test("the executable exists but there is a link cycle", () => {
    fc.assert(
      fc.property(
        fc.array(fc.stringMatching(/^\/[a-z]{2,}$/u), {
          minLength: 1,
          maxLength: 64,
        }),
        (links) => {
          const args = { env, executable };

          deps.exists.returns(true);
          deps.which.returns(resolvedExecutable);

          deps.readlink = sinon.stub();
          for (const index in links) {
            deps.readlink.onCall(index).returns(links[index]);
          }
          deps.readlink.onCall(links.length).returns(links[0]);

          assert.throws(
            () => {
              resolveExecutable(args, deps);
            },
            {
              name: "Error",
              message: `${executable} points to a link loop, cannot resolve shell`,
            },
          );
        },
      ),
    );
  });
});
