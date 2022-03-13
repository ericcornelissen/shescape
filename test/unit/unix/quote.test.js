/**
 * @overview Contains unit tests for the quoting functionality on Unix systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import { binBash, binDash, binZsh } from "../../common.js";
import * as macros from "../macros.js";

import * as unix from "../../../src/unix.js";

test(macros.quote, {
  platform: unix,
  quoteChar: "'",
  shellName: binBash,
});

test(macros.quote, {
  platform: unix,
  quoteChar: "'",
  shellName: binDash,
});

test(macros.quote, {
  platform: unix,
  quoteChar: "'",
  shellName: binZsh,
});

test("unsupported shell", (t) => {
  const result = unix.getQuoteFunction("foobar");
  t.is(result, null);
});
