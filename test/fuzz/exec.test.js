/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import fc from "fast-check";

import { common, runners } from "./_.js";

fc.configureGlobal({ numRuns: common.getIterations() });

test("prerequisites", (t) => {
  const shell = common.getFuzzShell();
  t.not(shell, false, "Fuzzing exec requires a shell");
});

testProp(
  "fuzz",
  [fc.string()],
  async (t, arg) => {
    t.timeout(10_000);

    const shell = common.getFuzzShell();

    await runners.execQuote({ arg, shell });
    await runners.execEscape({ arg, shell });
    runners.execSyncQuote({ arg, shell });
    runners.execSyncEscape({ arg, shell });

    t.pass();
  },
  {
    examples: common.corpus(),
  },
);
