/**
 * @overview Contains property tests for the escaping functionality on Unix
 * systems.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import { getEscapeFunction } from "../../../src/unix.js";

testProp(
  "supported shell",
  [arbitrary.unixShell(), fc.string(), fc.boolean()],
  (t, shellName, input, interpolation) => {
    const escapeFn = getEscapeFunction(shellName);
    const result = escapeFn(input, interpolation);
    t.is(typeof result, "string");
  }
);

testProp(
  "unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = getEscapeFunction(shellName);
    t.is(result, null);
  }
);
