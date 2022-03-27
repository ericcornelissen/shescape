/**
 * @overview Contains end-to-end tests for `shescape.quoteAll` (ESM).
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import * as macros from "../macros.cjs";

import { quoteAll } from "../../../index.js";

test(macros.quoteAll, { quoteAll });
