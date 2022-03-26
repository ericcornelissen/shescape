/**
 * @overview Contains property tests for the quoting functionality on Windows
 * systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { testProp } from "ava-fast-check";
import * as fc from "fast-check";

import * as arbitraries from "./_arbitraries.js";
import * as common from "../common.js";

import { getQuoteFunction } from "../../../src/win.js";

testProp.before(common.configureFastCheck);

testProp(
  "supported shell",
  [arbitraries.winShell(), fc.string()],
  (t, shellName, input) => {
    const quoteFn = getQuoteFunction(shellName);
    const result = quoteFn(input);
    t.is(typeof result, "string");
    t.is(result.substring(1, input.length + 1), input);
    t.regex(result, /^(".*"|'.*')$/);
  }
);

testProp("unsupported shell", [arbitraries.notWinShell()], (t, shellName) => {
  const result = getQuoteFunction(shellName);
  t.is(result, null);
});
