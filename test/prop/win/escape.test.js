/**
 * @overview Contains property tests for the escaping functionality on Windows
 * systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { testProp } from "ava-fast-check";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import { getEscapeFunction } from "../../../src/win.js";

testProp(
  "supported shell",
  [arbitrary.windowsShell(), arbitrary.arg(), fc.boolean()],
  (t, shellName, input, interpolation) => {
    const escapeFn = getEscapeFunction(shellName);
    const result = escapeFn(input, interpolation);
    t.is(typeof result, "string");
  }
);

testProp(
  "unsupported shell",
  [arbitrary.unsupportedWindowsShell()],
  (t, shellName) => {
    const result = getEscapeFunction(shellName);
    t.is(result, null);
  }
);
