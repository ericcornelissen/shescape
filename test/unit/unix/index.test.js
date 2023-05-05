/**
 * @overview Contains unit tests for the general Unix-specific functionality.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import * as unix from "../../../src/unix/index.js";

test("the default shell", (t) => {
  const result = unix.getDefaultShell();
  t.is(result, "/bin/sh");
});

testProp(
  "escape function for supported shell",
  [arbitrary.unixShell(), fc.boolean(), fc.boolean(), fc.string()],
  (t, shellName, interpolation, quoted, arg) => {
    const escapeFn = unix.getEscapeFunction(shellName, {
      interpolation,
      quoted,
    });
    t.is(typeof escapeFn, "function");
    const result = escapeFn(arg);
    t.is(typeof result, "string");
  }
);

testProp(
  "escape function for unsupported shell",
  [arbitrary.unsupportedUnixShell(), fc.boolean(), fc.boolean()],
  (t, shellName, interpolation, quoted) => {
    const result = unix.getEscapeFunction(shellName, { interpolation, quoted });
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
