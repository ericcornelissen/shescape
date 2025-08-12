/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `execFile` / `execFileSync`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import fc from "fast-check";

import { common, runners } from "./_.js";

fc.configureGlobal({
  numRuns: common.getIterations(),
  timeout: 10_000,
});

testProp(
  "fuzz",
  [fc.string()],
  async (t, arg) => {
    const shell = common.getFuzzShell();

    try {
      await runners.execFile({ arg, shell });
      runners.execFileSync({ arg, shell });

      t.pass();
    } catch (error) {
      common.extendCorpus(arg);
      t.fail(`${error}`);
    }
  },
  { seed: -383664195, path: "1651", endOnFailure: true },
);
