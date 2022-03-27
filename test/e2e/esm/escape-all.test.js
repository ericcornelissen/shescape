/**
 * @overview Contains end-to-end tests for `shescape.escapeAll` (ESM).
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import * as macros from "../macros.cjs";

import { escapeAll } from "../../../index.js";

test(macros.escapeAll, { escapeAll });
test(macros.escapeAll, { escapeAll, interpolation: true });
test(macros.escapeAll, { escapeAll, interpolation: false });
