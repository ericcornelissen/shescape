/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * function `spawn` / `spawnSync`.
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

test(macros.spawn);
test(macros.spawn, { shell: true });

test(macros.spawnSync);
test(macros.spawnSync, { shell: true });
