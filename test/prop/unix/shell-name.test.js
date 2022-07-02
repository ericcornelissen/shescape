/**
 * @overview Contains property tests for the getting a shell's name on Unix
 * systems.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary, constants } from "./_.js";

import { getShellName } from "../../../src/unix.js";

testProp.before((t) => {
  const resolveExecutable = sinon.stub();
  resolveExecutable.returns("a");

  t.context.deps = { resolveExecutable };
});

testProp(
  "resolving the shell",
  [arbitrary.env(), fc.string()],
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
  [arbitrary.env(), arbitrary.unixPath(), arbitrary.unixShell()],
  (t, env, path, shell) => {
    t.context.deps.resolveExecutable.returns(`${path}/${shell}`);

    const result = getShellName({ env, shell }, t.context.deps);
    t.is(result, shell);
  }
);

testProp(
  "unsupported shell",
  [arbitrary.env(), arbitrary.unixPath(), arbitrary.unsupportedUnixShell()],
  (t, env, path, shell) => {
    t.context.deps.resolveExecutable.returns(`${path}/${shell}`);

    const result = getShellName({ env, shell }, t.context.deps);
    t.is(result, constants.binBash);
  }
);
