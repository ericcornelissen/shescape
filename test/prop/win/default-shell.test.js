/**
 * @overview Contains property tests for the `getDefaultShell` function in
 * `./src/win.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { testProp } from "ava-fast-check";
import * as fc from "fast-check";

import * as arbitraries from "./arbitraries.js";
import { binCmd } from "../../common.js";

import * as win from "../../../src/win.js";

testProp.before(() => {
  fc.configureGlobal({
    numRuns: 10 ** 5,
    interruptAfterTimeLimit: 2000,
    markInterruptAsFailure: false,
  });
});

testProp("return value", [arbitraries.env()], (t, env) => {
  const result = win.getDefaultShell({ env });
  t.true(typeof result === "string");
});

testProp(
  "%COMSPEC% is defined",
  [arbitraries.env(), fc.string()],
  (t, env, ComSpec) => {
    env.ComSpec = ComSpec;

    const result = win.getDefaultShell({ env });
    t.is(result, ComSpec);
  }
);

testProp(`%COMSPEC% is not defined`, [arbitraries.env()], (t, env) => {
  delete env.ComSpec;

  const result = win.getDefaultShell({ env });
  t.is(result, binCmd);
});
