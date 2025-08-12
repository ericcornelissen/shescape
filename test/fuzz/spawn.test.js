/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `spawn` / `spawnSync`.
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
      await runners.spawn({ arg, shell });
      runners.spawnSync({ arg, shell });

      t.pass();
    } catch (error) {
      common.extendCorpus(arg);
      t.fail(`${error}`);
    }
  },
  { seed: 401795192, path: "739", endOnFailure: true },
  // { seed: -449789356, path: "554", endOnFailure: true },
);
