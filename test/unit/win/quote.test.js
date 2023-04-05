/**
 * @overview Contains unit tests for the quoting functionality on Windows
 * systems.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, fixtures, macros } from "./_.js";

import * as win from "../../../src/win.js";

Object.entries(fixtures.quote).forEach(([shellName, scenarios]) => {
  const cases = Object.values(scenarios).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.quote, {
      expected: expected.notEscaped,
      input,
      platform: win,
      shellName,
    });
  });
});

testProp(
  "supported shell",
  [arbitrary.windowsShell(), fc.string()],
  (t, shellName, input) => {
    const quoteFn = win.getQuoteFunction(shellName);
    const result = quoteFn(input);
    t.is(typeof result, "string");
    t.is(result.substring(1, input.length + 1), input);
    t.regex(result, /^(".*"|'.*')$/u);
  }
);

testProp(
  "unsupported shell",
  [arbitrary.unsupportedWindowsShell()],
  (t, shellName) => {
    const result = win.getQuoteFunction(shellName);
    t.is(result, undefined);
  }
);
