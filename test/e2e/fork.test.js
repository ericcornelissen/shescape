/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `fork` functions.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { test } from "node:test";

import { common, runners } from "./_.js";

test("child_process.fork", async (t) => {
  for (const arg of common.getTestArgs()) {
    await t.test(`'${arg}'`, async () => {
      await assert.doesNotReject(() => runners.fork(arg));
    });
  }
});
