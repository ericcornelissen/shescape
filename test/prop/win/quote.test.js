/**
 * @overview Contains property tests for the quoting functionality on Windows
 * systems.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import { getQuoteFunction } from "../../../src/win.js";

testProp(
  "supported shell",
  [arbitrary.windowsShell(), fc.string()],
  (t, shellName, input) => {
    const quoteFn = getQuoteFunction(shellName);
    const result = quoteFn(input);
    t.is(typeof result, "string");
    t.is(result.substring(1, input.length + 1), input);
    t.regex(result, /^(".*"|'.*')$/);
  }
);

testProp(
  "unsupported shell",
  [arbitrary.unsupportedWindowsShell()],
  (t, shellName) => {
    const result = getQuoteFunction(shellName);
    t.is(result, null);
  }
);
