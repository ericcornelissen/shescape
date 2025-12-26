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

import { arbitrary, constants } from "./_.js";

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

testProp("escape function for no shell", [fc.string()], (t, arg) => {
  const actual = unix.getEscapeFunction(noShell)(arg);
  const expected = nosh.getEscapeFunction()(arg);
  t.is(actual, expected);
});

for (const { module, shellName } of shells) {
  testProp(`escape function for ${shellName}`, [fc.string()], (t, arg) => {
    const actual = unix.getEscapeFunction(shellName)(arg);
    const expected = module.getEscapeFunction()(arg);
    t.is(actual, expected);
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

testProp("quote-escape function for no shell", [fc.string()], (t, arg) => {
  t.throws(() => {
    unix.getQuoteFunction(noShell)[0](arg);
  });
});

testProp("quote-quote function for no shell", [fc.string()], (t, arg) => {
  t.throws(() => {
    unix.getQuoteFunction(noShell)[1](arg);
  });
});

for (const { module, shellName } of shells) {
  testProp(
    `quote-escape function for ${shellName}`,
    [fc.string()],
    (t, arg) => {
      const actual = unix.getQuoteFunction(shellName)[0](arg);
      const expected = module.getQuoteFunction()[0](arg);
      t.is(actual, expected);
    },
  );

  testProp(`quote-quote function for ${shellName}`, [fc.string()], (t, arg) => {
    const actual = unix.getQuoteFunction(shellName)[1](arg);
    const expected = module.getQuoteFunction()[1](arg);
    t.is(actual, expected);
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

testProp("flag protection function for no shell", [fc.string()], (t, arg) => {
  const actual = unix.getFlagProtectionFunction(noShell)(arg);
  const expected = nosh.getFlagProtectionFunction()(arg);
  t.is(actual, expected);
});

for (const { module, shellName } of shells) {
  testProp(
    `flag protection function for ${shellName}`,
    [fc.string()],
    (t, arg) => {
      const actual = unix.getFlagProtectionFunction(shellName)(arg);
      const expected = module.getFlagProtectionFunction()(arg);
      t.is(actual, expected);
    },
  );
}

testProp(
  "flag protection function for unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = unix.getFlagProtectionFunction(shellName);
    t.is(result, undefined);
  },
);

test("is shell supported, no shell", (t) => {
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
