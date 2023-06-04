/**
 * @overview Contains unit tests for the `src/win.js` facade.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import * as facade from "../../../src/win.js";
import * as win from "../../../src/win/index.js";

testProp(
  "escape function for supported shell",
  [arbitrary.windowsShell(), fc.string(), fc.boolean(), fc.boolean()],
  (t, shellName, arg, flagProtection, interpolation) => {
    const options = { flagProtection, interpolation };
    t.is(
      facade.getEscapeFunction(shellName)(arg, options),
      win.getEscapeFunction(shellName, options)(arg)
    );
  }
);

testProp(
  "escape function for unsupported shell",
  [arbitrary.unsupportedWindowsShell()],
  (t, shellName) => {
    const result = facade.getEscapeFunction(shellName);
    t.is(result, undefined);
  }
);

testProp(
  "quote function for supported shell",
  [arbitrary.windowsShell(), fc.string(), fc.boolean()],
  (t, shellName, arg, flagProtection) => {
    const options = { flagProtection };
    const quoteFn = win.getQuoteFunction(shellName, options);
    t.is(typeof quoteFn, "function");
    const result = quoteFn(arg);
    t.is(typeof result, "string");
    t.regex(result, /^(".*"|'.*')$/u);
  }
);

testProp(
  "quote function for unsupported shell",
  [arbitrary.unsupportedWindowsShell()],
  (t, shellName) => {
    const result = win.getQuoteFunction(shellName);
    t.is(result, undefined);
  }
);
