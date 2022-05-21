/**
 * @overview Contains property tests for the default shell on Unix systems.
 * @license Unlicense
 */

import { testProp } from "ava-fast-check";

import { arbitrary } from "./_.js";

import { getDefaultShell } from "../../../src/unix.js";

testProp("return value", [arbitrary.env()], (t, env) => {
  const result = getDefaultShell({ env });
  t.is(result, "/bin/sh");
});
