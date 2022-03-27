/**
 * @overview Contains property tests for the quoting functionality on Unix
 * systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { testProp } from "ava-fast-check";
import * as fc from "fast-check";

import * as arbitrary from "../arbitraries.js";
import * as common from "../common.js";

import { getQuoteFunction } from "../../../src/unix.js";

testProp.before(common.configureFastCheck);

testProp(
  "supported shell",
  [arbitrary.unixShell(), arbitrary.arg()],
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
