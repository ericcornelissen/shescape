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

import * as unix from "../../../src/internal/unix.js";
import * as bash from "../../../src/internal/unix/bash.js";
import * as csh from "../../../src/internal/unix/csh.js";
import * as dash from "../../../src/internal/unix/dash.js";
import * as nosh from "../../../src/internal/unix/no-shell.js";
import * as zsh from "../../../src/internal/unix/zsh.js";
import { noShell } from "../../../src/internal/options.js";

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

test("escape function for no shell", (t) => {
  const actual = unix.getEscapeFunction(noShell);
  const expected = nosh.getEscapeFunction();
  t.deepEqual(actual, expected);
});

for (const { module, shellName } of shells) {
  test(`escape function for ${shellName}`, (t) => {
    const actual = unix.getEscapeFunction(shellName);
    const expected = module.getEscapeFunction();
    t.deepEqual(actual, expected);
  });
}

testProp(
  "escape function for unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = unix.getEscapeFunction(shellName);
    t.is(result, undefined);
  },
);

test("quote function for no shell", (t) => {
  const actual = unix.getQuoteFunction(noShell);
  const expected = nosh.getQuoteFunction();
  t.deepEqual(actual, expected);
});

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
    t.is(result, shell);
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
        { env, executable: shell },
        {
          exists: sinon.match.func,
          readlink: sinon.match.func,
          which: sinon.match.func,
        },
      ),
    );
  },
);

test("flag protection function for no shell", (t) => {
  const actual = unix.getFlagProtectionFunction(noShell);
  const expected = nosh.getFlagProtectionFunction();
  t.is(actual, expected);
});

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

test(`is shell supported, no shell`, (t) => {
  const actual = unix.isShellSupported(noShell);
  t.true(actual);
});

for (const { shellName } of shells) {
  test(`is shell supported, ${shellName}`, (t) => {
    const actual = unix.isShellSupported(shellName);
    t.true(actual);
  });
}

testProp(
  "is shell supported for unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = unix.isShellSupported(shellName);
    t.false(result);
  },
);
