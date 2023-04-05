/**
 * @overview Contains unit tests for the default shell on Unix systems.
 * @license MIT
 */

import test from "ava";

import { getDefaultShell } from "../../../src/unix.js";

test("the default shell", (t) => {
  const result = getDefaultShell();
  t.is(result, "/bin/sh");
});
