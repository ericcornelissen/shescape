/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import fc from "fast-check";

import { common, runners } from "./_.js";

fc.configureGlobal({
  numRuns: common.getIterations(),
  timeout: 10_000,
});

test("prerequisites", (t) => {
  const shell = common.getFuzzShell();
  t.not(shell, false, "Fuzzing exec requires a shell");
});

testProp(
  "fuzz",
  [fc.string()],
  async (t, arg) => {
    const shell = common.getFuzzShell();

    try {
      await runners.execQuote({ arg, shell });
      await runners.execEscape({ arg, shell });
      runners.execSyncQuote({ arg, shell });
      runners.execSyncEscape({ arg, shell });

      t.pass();
    } catch (error) {
      common.extendCorpus(arg);
      t.fail(`${error}`);
    }
  },
  { seed: 1489024367, path: "241", endOnFailure: true },
);
