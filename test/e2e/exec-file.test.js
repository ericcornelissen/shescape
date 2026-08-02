/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `execFile` (and `execFileSync`) functions.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { describe, it } from "node:test";

import { common, runners } from "./_.js";

describe("child_process.execFile", () => {
  for (const shell of common.getTestShells()) {
    describe(shell, { skip: common.skip(shell) }, () => {
      for (const arg of common.getTestArgs()) {
        describe(`'${arg}'`, () => {
          const scenario = { arg, shell };

          it("async", async () => {
            await assert.doesNotReject(() => runners.execFile(scenario));
          });

          it("sync", () => {
            assert.doesNotThrow(() => runners.execFileSync(scenario));
          });
        });
      }
    });
  }
});
