/**
 * @overview Contains unit tests for the default shell on Windows systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import { binCmd } from "../../common.cjs";

import * as win from "../../../src/win.js";

test("%COMSPEC% is defined", (t) => {
  const ComSpec = "C:\\Windows\\System32\\cmd.exe";
  const env = { ComSpec };

  const result = win.getDefaultShell({ env });
  t.is(result, ComSpec);
});

test("%COMSPEC% is an empty string", (t) => {
  const ComSpec = "";
  const env = { ComSpec };

  const result = win.getDefaultShell({ env });
  t.is(result, ComSpec);
});

test("%COMSPEC% is not defined", (t) => {
  const env = {};

  const result = win.getDefaultShell({ env });
  t.is(result, binCmd);
});
