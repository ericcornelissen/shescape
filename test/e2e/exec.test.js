/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `exec` (and `execSync`) functions.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { describe, it } from "node:test";

import { common, runners } from "./_.js";

describe("child_process.exec", () => {
  for (const shell of common.getTestShells()) {
    if (shell === false) {
      continue;
    }

    describe(shell, { skip: common.skip(shell) }, () => {
      for (const arg of common.getTestArgs()) {
        describe(`'${arg}'`, () => {
          const scenario = { arg, shell };

          describe("argument", () => {
            it("escape, async", async () => {
              await assert.doesNotReject(() => runners.execEscape(scenario));
            });

            it("escape, sync", () => {
              assert.doesNotThrow(() => runners.execSyncEscape(scenario));
            });

            it("quote, async", async () => {
              await assert.doesNotReject(() => runners.execQuote(scenario));
            });

            it("quote, sync", () => {
              assert.doesNotThrow(() => runners.execSyncQuote(scenario));
            });
          });

          it("assignment", async () => {
            await assert.doesNotReject(() =>
              runners.execAsAssignment(scenario),
            );
          });
        });
      }
    });
  }
});
