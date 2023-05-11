/**
 * @overview Contains unit tests for the escaping functionality on Unix systems.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import * as unix from "../../../src/unix.js";
import * as unixNew from "../../../src/unix/index.js";

testProp(
  "supported shell",
  [arbitrary.unixShell(), fc.string()],
  (t, shellName, arg) => {
    let options = { interpolation: false, quoted: false };
    t.is(
      unix.getEscapeFunction(shellName)(arg, options),
      unixNew.getEscapeFunction(shellName, options)(arg)
    );

    options = { interpolation: true, quoted: false };
    t.is(
      unix.getEscapeFunction(shellName)(arg, options),
      unixNew.getEscapeFunction(shellName, options)(arg)
    );

    options = { interpolation: false, quoted: true };
    t.is(
      unix.getEscapeFunction(shellName)(arg, options),
      unixNew.getEscapeFunction(shellName, options)(arg)
    );
  }
);

testProp(
  "unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = unix.getEscapeFunction(shellName);
    t.is(result, undefined);
  }
);
