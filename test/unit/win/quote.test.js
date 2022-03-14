/**
 * @overview Contains unit tests for the quoting functionality on Windows
 * systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import { binCmd, binPowerShell } from "../../common.js";
import * as macros from "../macros.js";

import * as win from "../../../src/win.js";

test(macros.quote, {
  platform: win,
  quoteChar: '"',
  shellName: binCmd,
});

test(macros.quote, {
  platform: win,
  quoteChar: '"',
  shellName: binPowerShell,
});

test(macros.unsupportedShell, { fn: win.getQuoteFunction });
