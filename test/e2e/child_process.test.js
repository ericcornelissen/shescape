/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package.
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

test(macros.exec, { arg: "&& ls" });
test(macros.exec, { arg: "' ls" });
test(macros.exec, { arg: "&& ls", options: { shell: true } });
test(macros.exec, { arg: "' ls", options: { shell: true } });

test(macros.execSync, { arg: "&& ls" });
test(macros.execSync, { arg: "' ls" });
test(macros.execSync, { arg: "&& ls", options: { shell: true } });
test(macros.execSync, { arg: "' ls", options: { shell: true } });

test(macros.execFile, { arg: "&& ls" });
test.skip(macros.execFile, { arg: "' ls" }); // Skipped due to https://github.com/ericcornelissen/shescape/issues/286
test(macros.execFile, { arg: "&& ls", options: { shell: true } });
test(macros.execFile, { arg: "' ls", options: { shell: true } });

test(macros.execFileSync, { arg: "&& ls" });
test.skip(macros.execFileSync, { arg: "' ls" }); // Skipped due to https://github.com/ericcornelissen/shescape/issues/286
test.skip(macros.execFileSync, { arg: "&& ls", options: { shell: true } }); // Skipped due to https://github.com/nodejs/node/issues/43333
test.skip(macros.execFileSync, { arg: "' ls", options: { shell: true } }); // Skipped due to https://github.com/nodejs/node/issues/43333

test(macros.fork, { arg: "&& ls" });
test.skip(macros.fork, { arg: "' ls" }); // Skipped due to https://github.com/ericcornelissen/shescape/issues/286

test(macros.spawn, { arg: "&& ls" });
test.skip(macros.spawn, { arg: "' ls" }); // Skipped due to https://github.com/ericcornelissen/shescape/issues/286
test(macros.spawn, { arg: "&& ls", options: { shell: true } });
test(macros.spawn, { arg: "' ls", options: { shell: true } });

test(macros.spawnSync, { arg: "&& ls" });
test.skip(macros.spawnSync, { arg: "' ls" }); // Skipped due to https://github.com/ericcornelissen/shescape/issues/286
test(macros.spawnSync, { arg: "&& ls", options: { shell: true } });
test(macros.spawnSync, { arg: "' ls", options: { shell: true } });
