/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `exec` (and `execSync`) functions.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import { common, runners } from "./_.js";

suite("child_process.exec", () => {
  for (const shell of common.getTestShells("exec")) {
    suite(shell, { skip: common.skip(shell) }, () => {
      for (const arg of common.getTestArgs()) {
        suite(`'${arg}'`, () => {
          const scenario = { arg, shell };

          suite("argument", () => {
            test("escape, async", async () => {
              await assert.doesNotReject(() => runners.execEscape(scenario));
            });

            test("escape, sync", () => {
              assert.doesNotThrow(() => runners.execSyncEscape(scenario));
            });

            test("quote, async", async () => {
              await assert.doesNotReject(() => runners.execQuote(scenario));
            });

            test("quote, sync", () => {
              assert.doesNotThrow(() => runners.execSyncQuote(scenario));
            });
          });

          test("assignment", async () => {
            await assert.doesNotReject(() =>
              runners.execAsAssignment(scenario),
            );
          });
        });
      }
    });
  }
});
