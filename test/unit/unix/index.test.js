/**
 * @overview Contains unit tests for the general Unix-specific functionality.
 * @license MIT
 */

import path from "node:path";

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import * as sinon from "sinon";

import { noShell } from "../../../src/internal/options.js";
import * as bash from "../../../src/internal/unix/bash.js";
import * as busybox from "../../../src/internal/unix/busybox.js";
import * as csh from "../../../src/internal/unix/csh.js";
import * as dash from "../../../src/internal/unix/dash.js";
import * as nosh from "../../../src/internal/unix/no-shell.js";
import * as zsh from "../../../src/internal/unix/zsh.js";
import * as unix from "../../../src/internal/unix.js";

import { arbitrary, constants, fixtures, macros } from "./_.js";

const shells = [
  { module: bash, shellName: constants.binBash },
  { module: busybox, shellName: constants.binBusyBox },
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

for (const { input, expected } of Object.values(fixtures.flag.null).flat()) {
  test(macros.flag, {
    expected: expected.unquoted,
    input,
    getFlagProtectionFunction: unix.getFlagProtectionFunction,
    platform: "Unix",
  });
}

testProp("flag protection function return value", [fc.string()], (t, arg) => {
  const flagProtect = unix.getFlagProtectionFunction();
  const result = flagProtect(arg);
  t.is(typeof result, "string");
});

test("flag protection function performance", macros.duration, {
  arbitraries: [fc.string({ size: "xlarge" })],
  maxMillis: 50,
  setup: unix.getFlagProtectionFunction,
});

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
