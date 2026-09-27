/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `execFile` (and `execFileSync`) functions.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import { common, runners } from "./_.js";

suite("child_process.execFile", () => {
  for (const shell of common.getTestShells("execFile")) {
    suite(shell, { skip: common.skip(shell) }, () => {
      for (const arg of common.getTestArgs()) {
        test(`'${arg}'`, async (t) => {
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
