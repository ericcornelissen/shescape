/**
 * @overview Contains integration tests for `shescape.quote` (ESM).
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

import { quote } from "../../../index.js";

test(macros.quote, { quote });

test(macros.prototypePollution, (_, payload) => quote("a", payload));
