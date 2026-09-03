/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `execFile` (and `execFileSync`) functions.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { test } from "node:test";

import { common, runners } from "./_.js";

test("child_process.execFile", async (t) => {
  for (const shell of common.getTestShells("execFile")) {
    await t.test(shell, { skip: common.skip(shell) }, async (t) => {
      for (const arg of common.getTestArgs()) {
        await t.test(`'${arg}'`, async (t) => {
          const scenario = { arg, shell };

          await t.test("async", async () => {
            await assert.doesNotReject(() => runners.execFile(scenario));
          });

          await t.test("sync", () => {
            assert.doesNotThrow(() => runners.execFileSync(scenario));
          });
        });
      }
    });
  }
});
