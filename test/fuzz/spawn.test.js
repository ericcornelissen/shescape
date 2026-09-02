/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `spawn` / `spawnSync`.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { test } from "node:test";

import fc from "fast-check";

import { common, runners } from "./_.js";

test.before(() => {
  fc.configureGlobal({
    numRuns: common.getIterations(),
    timeout: 10_000,
  });
});

test("fuzz", async () => {
  const shell = common.getFuzzShell();

  await fc.assert(
    fc.asyncProperty(common.arbitaryArg(), async (arg) => {
      try {
        await runners.spawn({ arg, shell });
        runners.spawnSync({ arg, shell });
      } catch (error) {
        common.extendCorpus(arg);
        assert.fail(error);
      }
    }),
    {
      examples: common.corpus(),
    },
  );
});
