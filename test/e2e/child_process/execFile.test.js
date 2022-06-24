/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * function `execFile` / `execFileSync`.
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

test(macros.execFile, { arg: "&& ls" });
test(macros.execFile, { arg: "&& ls", options: { shell: true } });

test(macros.execFileSync, { arg: "&& ls" });
test.skip(macros.execFileSync, { arg: "&& ls", options: { shell: true } }); // Skipped due to https://github.com/nodejs/node/issues/43333
