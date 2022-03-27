/**
 * @overview Contains end-to-end tests for `shescape.escape` (ESM).
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import * as macros from "../macros.cjs";

import { escape } from "../../../index.js";

test(macros.escape, { escape });
test(macros.escape, { escape, interpolation: true });
test(macros.escape, { escape, interpolation: false });
