/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

test(macros.exec, { arg: "&& ls" });
test(macros.exec, { arg: "&& ls", options: { shell: true } });

test(macros.execSync, { arg: "&& ls" });
test(macros.execSync, { arg: "&& ls", options: { shell: true } });
