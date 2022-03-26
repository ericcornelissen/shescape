/**
 * @overview Contains end-to-end tests for `shescape.quote` (ESM).
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import * as macros from "../_macros.cjs";

import { quote } from "../../../index.js";

test(macros.quote, { quote });
