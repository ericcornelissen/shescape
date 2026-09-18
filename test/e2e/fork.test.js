/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `fork` functions.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import { common, runners } from "./_.js";

suite("child_process.fork", () => {
  for (const arg of common.getTestArgs()) {
    test(`'${arg}'`, async () => {
      await assert.doesNotReject(() => runners.fork(arg));
    });
  }
});
