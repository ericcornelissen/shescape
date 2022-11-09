/**
 * @overview Contains unit tests for the quoting functionality on Unix systems.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, fixtures, macros } from "./_.js";

import * as unix from "../../../src/unix.js";

Object.entries(fixtures.quote).forEach(([shellName, scenarios]) => {
  const cases = Object.values(scenarios).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.quote, {
      expected: expected.notEscaped,
      input,
      platform: unix,
      shellName,
    });
  });
});

testProp(
  "supported shell",
  [arbitrary.unixShell(), fc.string()],
  (t, shellName, input) => {
    const quoteFn = unix.getQuoteFunction(shellName);
    const result = quoteFn(input);
    t.is(typeof result, "string");
    t.is(result.substring(1, input.length + 1), input);
    t.regex(result, /^(".*"|'.*')$/u);
  }
);

testProp(
  "unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = unix.getQuoteFunction(shellName);
    t.is(result, null);
  }
);
