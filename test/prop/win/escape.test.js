/**
 * @overview Contains property tests for the `getEscapeFunction` function in
 * `./src/win.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { testProp } from "ava-fast-check";
import * as fc from "fast-check";

import * as arbitraries from "./_arbitraries.js";

import { getEscapeFunction } from "../../../src/win.js";

testProp.before(() => {
  fc.configureGlobal({
    numRuns: 10 ** 5,
    interruptAfterTimeLimit: 2000,
    markInterruptAsFailure: false,
  });
});

testProp(
  "supported shell",
  [arbitraries.winShell(), fc.string()],
  (t, shellName, input) => {
    const escapeFn = getEscapeFunction(shellName);
    const result = escapeFn(input);
    t.is(typeof result, "string");
  }
);

testProp("unsupported shell", [arbitraries.notWinShell()], (t, shellName) => {
  const result = getEscapeFunction(shellName);
  t.is(result, null);
});
