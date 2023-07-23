/**
 * @overview Contains unit tests for the general Unix-specific functionality.
 * @license MIT
 */

import path from "node:path";

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary, constants } from "./_.js";

import * as bash from "../../../src/unix/bash.js";
import * as csh from "../../../src/unix/csh.js";
import * as dash from "../../../src/unix/dash.js";
import * as unix from "../../../src/unix.js";
import * as zsh from "../../../src/unix/zsh.js";

const shells = [
  { module: bash, shellName: constants.binBash },
  { module: csh, shellName: constants.binCsh },
  { module: dash, shellName: constants.binDash },
  { module: zsh, shellName: constants.binZsh },
];

test("the default shell", (t) => {
  const result = unix.getDefaultShell();
  t.is(result, "/bin/sh");
});

for (const { module, shellName } of shells) {
  test(`escape function for ${shellName}`, (t) => {
    let options = { interpolation: false };
    t.is(
      unix.getEscapeFunction(shellName, options),
      module.getEscapeFunction(options),
    );

    options = { interpolation: true };
    t.is(
      unix.getEscapeFunction(shellName, options),
      module.getEscapeFunction(options),
    );
  });
}

testProp(
  "escape function for unsupported shell",
  [arbitrary.unsupportedUnixShell(), fc.boolean()],
  (t, shellName, interpolation) => {
    const result = unix.getEscapeFunction(shellName, { interpolation });
    t.is(result, undefined);
  },
);

for (const { module, shellName } of shells) {
  test(`quote function for ${shellName}`, (t) => {
    const actual = unix.getQuoteFunction(shellName);
    const expected = module.getQuoteFunction();
    t.deepEqual(actual, expected);
  });
}

testProp(
  "quote function for unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = unix.getQuoteFunction(shellName);
    t.is(result, undefined);
  },
);

testProp(
  "get shell name for supported shell",
  [arbitrary.env(), arbitrary.unixPath(), arbitrary.unixShell()],
  (t, env, basePath, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns(path.join(basePath, shell));

    const result = unix.getShellName({ env, shell }, { resolveExecutable });
    t.is(result, shell);
  },
);

testProp(
  "get shell name for unsupported shell",
  [arbitrary.env(), arbitrary.unixPath(), arbitrary.unsupportedUnixShell()],
  (t, env, basePath, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns(path.join(basePath, shell));

    const result = unix.getShellName({ env, shell }, { resolveExecutable });
    t.is(result, constants.binBash);
  },
);

testProp(
  "resolving the shell",
  [arbitrary.env(), fc.string()],
  (t, env, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns("foobar");

    unix.getShellName({ env, shell }, { resolveExecutable });
    t.true(
      resolveExecutable.calledWithExactly(
        { executable: shell },
        {
          exists: sinon.match.func,
          readlink: sinon.match.func,
          which: sinon.match.func,
        },
      ),
    );
  },
);

for (const { module, shellName } of shells) {
  test(`flag protection function for ${shellName}`, (t) => {
    const actual = unix.getFlagProtectionFunction(shellName);
    const expected = module.getFlagProtectionFunction();
    t.is(actual, expected);
  });
}

testProp(
  "flag protection function for unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = unix.getFlagProtectionFunction(shellName);
    t.is(result, undefined);
  },
);
