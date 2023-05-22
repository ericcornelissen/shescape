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
import * as win from "../../../src/win/index.js";
import * as powershell from "../../../src/win/powershell.js";

testProp(
  "the default shell when %COMSPEC% is defined",
  [arbitrary.env(), arbitrary.windowsPath()],
  (t, env, ComSpec) => {
    env.ComSpec = ComSpec;

    const result = win.getDefaultShell({ env });
    t.is(result, ComSpec);
  }
);

test("the default shell when %COMSPEC% is an empty string", (t) => {
  const ComSpec = "";
  const env = { ComSpec };

  const result = win.getDefaultShell({ env });
  t.is(result, ComSpec);
});

testProp(
  `the default shell when %COMSPEC% is not defined`,
  [arbitrary.env()],
  (t, env) => {
    delete env.ComSpec;

    const result = win.getDefaultShell({ env });
    t.is(result, constants.binCmd);
  }
);

test("escape function for CMD", (t) => {
  let options = { interpolation: false, quoted: false };
  t.is(
    win.getEscapeFunction(constants.binCmd, options),
    cmd.getEscapeFunction(options)
  );

  options = { interpolation: true, quoted: false };
  t.is(
    win.getEscapeFunction(constants.binCmd, options),
    cmd.getEscapeFunction(options)
  );

  options = { interpolation: false, quoted: true };
  t.is(
    win.getEscapeFunction(constants.binCmd, options),
    cmd.getEscapeFunction(options)
  );
});

test("escape function for PowerShell", (t) => {
  let options = { interpolation: false, quoted: false };
  t.is(
    win.getEscapeFunction(constants.binPowerShell, options),
    powershell.getEscapeFunction(options)
  );

  options = { interpolation: true, quoted: false };
  t.is(
    win.getEscapeFunction(constants.binPowerShell, options),
    powershell.getEscapeFunction(options)
  );

  options = { interpolation: false, quoted: true };
  t.is(
    win.getEscapeFunction(constants.binPowerShell, options),
    powershell.getEscapeFunction(options)
  );
});

testProp(
  "escape function for unsupported shell",
  [arbitrary.unsupportedWindowsShell(), fc.boolean(), fc.boolean()],
  (t, shellName, interpolation, quoted) => {
    const result = win.getEscapeFunction(shellName, { interpolation, quoted });
    t.is(result, undefined);
  }
);

test("quote function for CMD", (t) => {
  const actual = win.getQuoteFunction(constants.binCmd);
  const expected = cmd.getQuoteFunction();
  t.is(actual, expected);
});

test("quote function for PowerShell", (t) => {
  const actual = win.getQuoteFunction(constants.binPowerShell);
  const expected = powershell.getQuoteFunction();
  t.is(actual, expected);
});

testProp(
  "quote function for unsupported shell",
  [arbitrary.unsupportedWindowsShell()],
  (t, shellName) => {
    const result = win.getQuoteFunction(shellName);
    t.is(result, undefined);
  }
);

testProp(
  "get shell name for supported shell",
  [arbitrary.env(), arbitrary.windowsPath(), arbitrary.windowsShell()],
  (t, env, basePath, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns(path.join(basePath, shell));

    const result = win.getShellName({ env, shell }, { resolveExecutable });
    t.is(result, shell);
  }
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
  }
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
        }
      )
    );
  }
);
