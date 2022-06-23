/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

test(macros.exec);
test(macros.exec, { shell: true });

test(macros.execSync);
test(macros.execSync, { shell: true });
