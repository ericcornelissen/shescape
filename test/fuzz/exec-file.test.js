/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `execFile` / `execFileSync`.
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
    t.timeout(10_000);

    const shell = common.getFuzzShell();

    await runners.execFile({ arg, shell });
    runners.execFileSync({ arg, shell });

    t.pass();
  },
  {
    examples: common.corpus(),
  },
);
