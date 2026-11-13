/**
 * @overview Contains unit tests for all Unix shells-specific implementation.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { suite, test } from "node:test";

import * as bash from "../../../src/internal/unix/bash.js";
import * as busybox from "../../../src/internal/unix/busybox.js";
import * as csh from "../../../src/internal/unix/csh.js";
import * as dash from "../../../src/internal/unix/dash.js";
import * as zsh from "../../../src/internal/unix/zsh.js";

import { constants, fixtures } from "./_.js";

const shells = {
  [constants.binBash]: bash,
  [constants.binBusyBox]: busybox,
  [constants.binCsh]: csh,
  [constants.binDash]: dash,
  [constants.binZsh]: zsh,
};

suite("ReDoS", () => {
  for (const [shellName, shellExports] of Object.entries(shells)) {
    const redosFixtures = fixtures.redos();

    for (const index in redosFixtures) {
      const input = redosFixtures[index];
      test(`${shellName}, ReDoS #${index}`, () => {
        const escapeFn = shellExports.getEscapeFunction();

        const startTime = performance.now();
        escapeFn(input);
        const endTime = performance.now();

        assert.ok(endTime - startTime < 500);
      });
    }
  }
});
