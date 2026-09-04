/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `spawn` (and `spawnSync`) functions.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import { common, runners } from "./_.js";

suite("child_process.spawn", () => {
  for (const shell of common.getTestShells("spawn")) {
    suite(`shell: ${shell}`, { skip: common.skip(shell) }, () => {
      for (const arg of common.getTestArgs()) {
        suite(`arg: '${arg}'`, () => {
          const scenario = { arg, shell };

          test("async", async () => {
            await assert.doesNotReject(() => runners.spawn(scenario));
          });

          test("sync", () => {
            assert.doesNotThrow(() => runners.spawnSync(scenario));
          });
        });
      }
    });
  }
});
