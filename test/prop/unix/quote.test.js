/**
 * @overview Contains property tests for the quoting functionality on Unix
 * systems.
 * @license Unlicense
 */

import { testProp } from "ava-fast-check";

import { arbitrary } from "./_.js";

import { getQuoteFunction } from "../../../src/unix.js";

testProp(
  "supported shell",
  [arbitrary.unixShell(), arbitrary.shescapeArg()],
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
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = getQuoteFunction(shellName);
    t.is(result, null);
  }
);
