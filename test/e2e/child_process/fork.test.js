/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * function `fork`.
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

test(macros.fork, { arg: "&& ls" });
