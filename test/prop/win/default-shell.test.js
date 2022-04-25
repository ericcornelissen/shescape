/**
 * @overview Contains property tests for the default shell on Windows systems.
 * @license Unlicense
 */

import { testProp } from "ava-fast-check";

import { arbitrary, constants } from "./_.js";

import { getDefaultShell } from "../../../src/win.js";

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
  t.is(result, constants.binCmd);
});
