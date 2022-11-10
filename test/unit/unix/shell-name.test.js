/**
 * @overview Contains unit tests for the getting a shell's name on Unix systems.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";

import { arbitrary, constants } from "./_.js";

import { getShellName } from "../../../src/unix.js";

testProp(
  "supported shell",
  [arbitrary.unixPath(), arbitrary.unixShell()],
  (t, path, shell) => {
    const fullPath = `${path}/${shell}`;

    const result = getShellName(fullPath);
    t.is(result, shell);
  }
);

testProp(
  "unsupported shell",
  [arbitrary.unixPath(), arbitrary.unsupportedUnixShell()],
  (t, path, shell) => {
    const fullPath = `${path}/${shell}`;

    const result = getShellName(fullPath);
    t.is(result, constants.binBash);
  }
);
