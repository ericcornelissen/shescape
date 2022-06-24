/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * function `spawn` / `spawnSync`.
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

test(macros.spawn, { arg: "&& ls" });
test(macros.spawn, { arg: "&& ls", options: { shell: true } });

test(macros.spawnSync, { arg: "&& ls" });
test(macros.spawnSync, { arg: "&& ls", options: { shell: true } });
