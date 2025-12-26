/**
 * @overview Contains unit tests for the general Windows-specific functionality.
 * @license MIT
 */

import path from "node:path/win32";

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import * as ppTestKit from "pp-test-kit/simulate";
import * as sinon from "sinon";

import { noShell } from "../../../src/internal/options.js";
import * as cmd from "../../../src/internal/win/cmd.js";
import * as nosh from "../../../src/internal/win/no-shell.js";
import * as powershell from "../../../src/internal/win/powershell.js";
import * as win from "../../../src/internal/win.js";

import { arbitrary, constants } from "./_.js";

const shells = [
  { module: cmd, shellName: "cmd.exe" },
  { module: powershell, shellName: "powershell.exe" },
  { module: cmd, shellName: "cmd.EXE" },
  { module: powershell, shellName: "powershell.EXE" },
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

testProp(
  "the default shell when %COMSPEC% is polluted",
  [arbitrary.env({ keys: ["ComSpec"] }), fc.string()],
  (t, env, prototypeComSpec) => {
    fc.pre(env.ComSpec !== prototypeComSpec);

    env = ppTestKit.simulatePollution(env, {
      property: "ComSpec",
      value: prototypeComSpec,
    });

    const result = win.getDefaultShell({ env });
    t.not(result, prototypeComSpec);
  },
);

testProp("escape function for no shell", [fc.string()], (t, arg) => {
  const actual = win.getEscapeFunction(noShell)(arg);
  const expected = nosh.getEscapeFunction()(arg);
  t.is(actual, expected);
});

for (const { module, shellName } of shells) {
  testProp(`escape function for ${shellName}`, [fc.string()], (t, arg) => {
    const actual = win.getEscapeFunction(shellName)(arg);
    const expected = module.getEscapeFunction()(arg);
    t.is(actual, expected);
  });
}

testProp(
  "escape function for unsupported shell",
  [arbitrary.unsupportedWindowsShell()],
  (t, shellName) => {
    const result = win.getEscapeFunction(shellName);
    t.is(result, undefined);
  },
);

testProp("quote-escape function for no shell", [fc.string()], (t, arg) => {
  t.throws(() => {
    win.getQuoteFunction(noShell)[0](arg);
  });
});

testProp("quote-quote function for no shell", [fc.string()], (t, arg) => {
  t.throws(() => {
    win.getQuoteFunction(noShell)[1](arg);
  });
});

for (const { module, shellName } of shells) {
  testProp(
    `quote-escape function for ${shellName}`,
    [fc.string()],
    (t, arg) => {
      const actual = win.getQuoteFunction(shellName)[0](arg);
      const expected = module.getQuoteFunction()[0](arg);
      t.is(actual, expected);
    },
  );

  testProp(`quote-quote function for ${shellName}`, [fc.string()], (t, arg) => {
    const actual = win.getQuoteFunction(shellName)[1](arg);
    const expected = module.getQuoteFunction()[1](arg);
    t.is(actual, expected);
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
    const executable = shell.toLowerCase().endsWith(".exe")
      ? shell
      : `${shell}.exe`;

    const resolveExecutable = sinon.stub();
    resolveExecutable.returns(path.join(basePath, executable));

    const result = win.getShellName({ env, shell }, { resolveExecutable });
    t.is(result, executable);
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
    t.is(result, shell);
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
  const actual = win.getFlagProtectionFunction(noShell)(arg);
  const expected = nosh.getFlagProtectionFunction()(arg);
  t.is(actual, expected);
});

for (const { module, shellName } of shells) {
  testProp(
    `flag protection function for ${shellName}`,
    [fc.string()],
    (t, arg) => {
      const actual = win.getFlagProtectionFunction(shellName)(arg);
      const expected = module.getFlagProtectionFunction()(arg);
      t.is(actual, expected);
    },
  );
}

testProp(
  "flag protection for unsupported shell",
  [arbitrary.unsupportedWindowsShell()],
  (t, shellName) => {
    const result = win.getFlagProtectionFunction(shellName);
    t.is(result, undefined);
  },
);

test("is shell supported, no shell", (t) => {
  const actual = win.isShellSupported(noShell);
  t.true(actual);
});

for (const { shellName } of shells) {
  test(`is shell supported, ${shellName}`, (t) => {
    const actual = win.isShellSupported(shellName);
    t.true(actual);
  });
}

testProp(
  "is shell supported for unsupported shell",
  [arbitrary.unsupportedWindowsShell()],
  (t, shellName) => {
    const result = win.isShellSupported(shellName);
    t.false(result);
  },
);
