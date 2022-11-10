/**
 * @overview Contains unit tests for the getting a shell's name on Windows
 * systems.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";

import { arbitrary, constants } from "./_.js";

import { getShellName } from "../../../src/win.js";

testProp(
  "supported shell",
  [arbitrary.windowsPath(), arbitrary.windowsShell()],
  (t, path, shell) => {
    const fullPath = `${path}\\${shell}`;

    const result = getShellName(fullPath);
    t.is(result, shell);
  }
);

testProp(
  "unsupported shell",
  [arbitrary.windowsPath(), arbitrary.unsupportedWindowsShell()],
  (t, path, shell) => {
    const fullPath = `${path}\\${shell}`;

    const result = getShellName(fullPath);
    t.is(result, constants.binCmd);
  }
);
