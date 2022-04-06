/**
 * @overview Contains end-to-end tests for `shescape.quoteAll` (ESM).
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import { macros } from "./_.js";

import { quoteAll } from "../../../index.js";

test(macros.quoteAll, { quoteAll });

test(macros.prototypePollution, (_, payload) => quoteAll(["a"], payload));
