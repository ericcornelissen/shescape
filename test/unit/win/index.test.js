/**
 * @overview Contains unit tests for the general Windows-specific functionality.
 * @license MIT
 */

import path from "node:path/win32";

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary, constants } from "./_.js";

import * as cmd from "../../../src/win/cmd.js";
import * as win from "../../../src/win.js";
import * as powershell from "../../../src/win/powershell.js";

const shells = [
  { module: cmd, shellName: constants.binCmd },
  { module: powershell, shellName: constants.binPowerShell },
];

testProp(
  "the default shell when %COMSPEC% is defined",
  [arbitrary.env(), arbitrary.windowsPath()],
  (t, env, ComSpec) => {
    env.ComSpec = ComSpec;

    const result = win.getDefaultShell({ env });
    t.is(result, ComSpec);
  },
);

test("the default shell when %COMSPEC% is an empty string", (t) => {
  const ComSpec = "";
  const env = { ComSpec };

  const result = win.getDefaultShell({ env });
  t.is(result, ComSpec);
});

testProp(
  "the default shell when %COMSPEC% is not defined",
  [arbitrary.env()],
  (t, env) => {
    delete env.ComSpec;

    const result = win.getDefaultShell({ env });
    t.is(result, constants.binCmd);
  },
);

test("escape function for no shell", (t) => {
  let options = { interpolation: false };
  t.is(win.getEscapeFunction(null, options), cmd.getEscapeFunction(options));

  options = { interpolation: true };
  t.is(win.getEscapeFunction(null, options), cmd.getEscapeFunction(options));
});

for (const { module, shellName } of shells) {
  test(`escape function for ${shellName}`, (t) => {
    let options = { interpolation: false };
    t.is(
      win.getEscapeFunction(shellName, options),
      module.getEscapeFunction(options),
    );

    options = { interpolation: true };
    t.is(
      win.getEscapeFunction(shellName, options),
      module.getEscapeFunction(options),
    );
  });
}

testProp(
  "escape function for unsupported shell",
  [arbitrary.unsupportedWindowsShell(), fc.boolean()],
  (t, shellName, interpolation) => {
    const result = win.getEscapeFunction(shellName, { interpolation });
    t.is(result, undefined);
  },
);

test("quote function for no shell", (t) => {
  const actual = win.getQuoteFunction(null);
  const expected = cmd.getQuoteFunction();
  t.deepEqual(actual, expected);
});

for (const { module, shellName } of shells) {
  test(`quote function for ${shellName}`, (t) => {
    const actual = win.getQuoteFunction(shellName);
    const expected = module.getQuoteFunction();
    t.deepEqual(actual, expected);
  });
}

testProp(
  "quote function for unsupported shell",
  [arbitrary.unsupportedWindowsShell()],
  (t, shellName) => {
    const result = win.getQuoteFunction(shellName);
    t.is(result, undefined);
  },
);

testProp(
  "get shell name for supported shell",
  [arbitrary.env(), arbitrary.windowsPath(), arbitrary.windowsShell()],
  (t, env, basePath, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns(path.join(basePath, shell));

    const result = win.getShellName({ env, shell }, { resolveExecutable });
    t.is(result, shell);
  },
);

testProp(
  "get shell name for unsupported shell",
  [
    arbitrary.env(),
    arbitrary.windowsPath(),
    arbitrary.unsupportedWindowsShell(),
  ],
  (t, env, basePath, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns(path.join(basePath, shell));

    const result = win.getShellName({ env, shell }, { resolveExecutable });
    t.is(result, constants.binCmd);
  },
);

testProp(
  "resolving the shell",
  [arbitrary.env(), fc.string()],
  (t, env, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns("foobar");

    win.getShellName({ env, shell }, { resolveExecutable });
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

test("flag protection function for no shell", (t) => {
  const actual = win.getFlagProtectionFunction(null);
  const expected = cmd.getFlagProtectionFunction();
  t.is(actual, expected);
});

for (const { module, shellName } of shells) {
  test(`flag protection function for ${shellName}`, (t) => {
    const actual = win.getFlagProtectionFunction(shellName);
    const expected = module.getFlagProtectionFunction();
    t.is(actual, expected);
  });
}

testProp(
  "flag protection for unsupported shell",
  [arbitrary.unsupportedWindowsShell()],
  (t, shellName) => {
    const result = win.getFlagProtectionFunction(shellName);
    t.is(result, undefined);
  },
);
