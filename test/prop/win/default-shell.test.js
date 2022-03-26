/**
 * @overview Contains property tests for the default shell on Windows systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { testProp } from "ava-fast-check";
import * as fc from "fast-check";

import * as arbitraries from "./_arbitraries.js";
import * as common from "../common.js";

import { getDefaultShell } from "../../../src/win.js";

testProp.before(common.configureFastCheck);

testProp("return value", [arbitraries.env()], (t, env) => {
  const result = getDefaultShell({ env });
  t.true(typeof result === "string");
});

testProp(
  "%COMSPEC% is defined",
  [arbitraries.env(), fc.string()],
  (t, env, ComSpec) => {
    env.ComSpec = ComSpec;

    const result = getDefaultShell({ env });
    t.is(result, ComSpec);
  }
);

testProp(`%COMSPEC% is not defined`, [arbitraries.env()], (t, env) => {
  delete env.ComSpec;

  const result = getDefaultShell({ env });
  t.is(result, common.binCmd);
});
