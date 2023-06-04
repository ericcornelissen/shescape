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
  [arbitrary.windowsShell(), fc.string()],
  (t, shellName, arg) => {
    let options = { interpolation: false };
    t.is(
      facade.getEscapeFunction(shellName)(arg, options),
      win.getEscapeFunction(shellName, options)(arg)
    );

    options = { interpolation: true };
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
  [arbitrary.windowsShell(), fc.string()],
  (t, shellName, arg) => {
    t.is(
      facade.getQuoteFunction(shellName)(arg),
      win.getQuoteFunction(shellName)(arg)
    );
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
