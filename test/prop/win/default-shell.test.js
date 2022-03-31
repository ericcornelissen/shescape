/**
 * @overview Contains property tests for the default shell on Windows systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { testProp } from "ava-fast-check";

import * as arbitrary from "../arbitraries.js";
import * as common from "../common.js";

import { getDefaultShell } from "../../../src/win.js";

testProp.before(common.configureFastCheck);

testProp("return value", [arbitrary.env({ keys: ["ComSpec"] })], (t, env) => {
  const result = getDefaultShell({ env });
  t.true(typeof result === "string");
});

testProp(
  "%COMSPEC% is defined",
  [arbitrary.env(), arbitrary.windowsPath()],
  (t, env, ComSpec) => {
    env.ComSpec = ComSpec;

    const result = getDefaultShell({ env });
    t.is(result, ComSpec);
  }
);

testProp(`%COMSPEC% is not defined`, [arbitrary.env()], (t, env) => {
  delete env.ComSpec;

  const result = getDefaultShell({ env });
  t.is(result, common.binCmd);
});
