/**
 * @overview Contains end-to-end tests for `shescape.escape` (ESM).
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import { macros } from "./_.js";

import { escape } from "../../../index.js";

test(macros.escape, { escape });
test(macros.escape, { escape, interpolation: true });
test(macros.escape, { escape, interpolation: false });

test(macros.prototypePollution, (_, payload) => escape("a", payload));
