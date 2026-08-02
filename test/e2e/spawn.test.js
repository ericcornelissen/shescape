/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `spawn` (and `spawnSync`) functions.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { describe, it } from "node:test";

import { common, runners } from "./_.js";

describe("child_process.spawn", () => {
  for (const shell of common.getTestShells()) {
    describe(`shell: ${shell}`, { skip: common.skip(shell) }, () => {
      for (const arg of common.getTestArgs()) {
        describe(`arg: '${arg}'`, () => {
          const scenario = { arg, shell };

          it("async", async () => {
            await assert.doesNotReject(() => runners.spawn(scenario));
          });

          it("sync", () => {
            assert.doesNotThrow(() => runners.spawnSync(scenario));
          });
        });
      }
    });
  }
});
