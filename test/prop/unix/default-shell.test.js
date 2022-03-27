/**
 * @overview Contains property tests for the default shell on Unix systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { testProp } from "ava-fast-check";

import * as arbitrary from "../arbitraries.js";
import * as common from "../common.js";

import { getDefaultShell } from "../../../src/unix.js";

testProp.before(common.configureFastCheck);

testProp("return value", [arbitrary.env()], (t, env) => {
  const result = getDefaultShell({ env });
  t.is(result, "/bin/sh");
});
