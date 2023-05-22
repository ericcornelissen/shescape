/**
 * @overview Contains unit tests for the `src/unix.js` facade.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import * as facade from "../../../src/unix.js";
import * as unix from "../../../src/unix/index.js";

testProp(
  "escape function for supported shell",
  [arbitrary.unixShell(), fc.string()],
  (t, shellName, arg) => {
    let options = { interpolation: false, quoted: false };
    t.is(
      facade.getEscapeFunction(shellName)(arg, options),
      unix.getEscapeFunction(shellName, options)(arg)
    );

    options = { interpolation: true, quoted: false };
    t.is(
      facade.getEscapeFunction(shellName)(arg, options),
      unix.getEscapeFunction(shellName, options)(arg)
    );

    options = { interpolation: false, quoted: true };
    t.is(
      facade.getEscapeFunction(shellName)(arg, options),
      unix.getEscapeFunction(shellName, options)(arg)
    );
  }
);

testProp(
  "escape function for unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = facade.getEscapeFunction(shellName);
    t.is(result, undefined);
  }
);

testProp(
  "quote function for supported shell",
  [arbitrary.unixShell(), fc.string()],
  (t, shellName, arg) => {
    const quoteFn = unix.getQuoteFunction(shellName);
    t.is(typeof quoteFn, "function");
    const result = quoteFn(arg);
    t.is(typeof result, "string");
    t.is(result.substring(1, arg.length + 1), arg);
    t.regex(result, /^(".*"|'.*')$/u);
  }
);

testProp(
  "quote function for unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = unix.getQuoteFunction(shellName);
    t.is(result, undefined);
  }
);
