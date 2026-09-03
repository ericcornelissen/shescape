/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `exec` (and `execSync`) functions.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { test } from "node:test";

import { common, runners } from "./_.js";

test("child_process.exec", async (t) => {
  for (const shell of common.getTestShells("exec")) {
    await t.test(shell, { skip: common.skip(shell) }, async (t) => {
      for (const arg of common.getTestArgs()) {
        await t.test(`'${arg}'`, async (t) => {
          const scenario = { arg, shell };

          await t.test("argument", async (t) => {
            await t.test("escape, async", async () => {
              await assert.doesNotReject(() => runners.execEscape(scenario));
            });

            await t.test("escape, sync", () => {
              assert.doesNotThrow(() => runners.execSyncEscape(scenario));
            });

            await t.test("quote, async", async () => {
              await assert.doesNotReject(() => runners.execQuote(scenario));
            });

            await t.test("quote, sync", () => {
              assert.doesNotThrow(() => runners.execSyncQuote(scenario));
            });
          });

          await t.test("assignment", async () => {
            await assert.doesNotReject(() =>
              runners.execAsAssignment(scenario),
            );
          });
        });
      }
    });
  }
});
