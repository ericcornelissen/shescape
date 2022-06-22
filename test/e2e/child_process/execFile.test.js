/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * function `execFile` / `execFileSync`.
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

test(macros.execFile);
test(macros.execFile, { shell: true });

test(macros.execFileSync);
test.skip(macros.execFileSync, { shell: true }); // Skipped due to https://github.com/nodejs/node/issues/43333
