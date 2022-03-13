/**
 * @overview Contains unit tests for the default shell on Unix systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import * as unix from "../../../src/unix.js";

test("returns '/bin/sh'", (t) => {
  const result = unix.getDefaultShell();
  t.is(result, "/bin/sh");
});
