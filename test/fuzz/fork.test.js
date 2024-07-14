/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `fork`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import fc from "fast-check";

import { common, runners } from "./_.js";

fc.configureGlobal({ numRuns: common.getIterations() });

test("prerequisites", (t) => {
  const shell = common.getFuzzShell();
  t.is(shell, false, "Fuzzing fork requires a falsy shell");
});

testProp(
  "fuzz",
  [fc.string()],
  async (t, arg) => {
    await runners.fork(arg);

    t.pass();
  },
  {
    examples: common.corpus(),
  },
);
