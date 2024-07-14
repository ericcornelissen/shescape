/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `spawn` / `spawnSync`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import fc from "fast-check";

import { common, runners } from "./_.js";

fc.configureGlobal({ numRuns: common.getIterations() });

testProp(
  "fuzz",
  [fc.string()],
  async (t, arg) => {
    const shell = common.getFuzzShell();

    await runners.spawn({ arg, shell });
    runners.spawnSync({ arg, shell });

    t.pass();
  },
  {
    examples: common.corpus(),
  },
);
