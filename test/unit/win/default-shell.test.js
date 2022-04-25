/**
 * @overview Contains unit tests for the default shell on Windows systems.
 * @license Unlicense
 */

import test from "ava";

import { constants } from "./_.js";

import { getDefaultShell } from "../../../src/win.js";

test("%COMSPEC% is defined", (t) => {
  const ComSpec = "C:\\Windows\\System32\\cmd.exe";
  const env = { ComSpec };

  const result = getDefaultShell({ env });
  t.is(result, ComSpec);
});

test("%COMSPEC% is an empty string", (t) => {
  const ComSpec = "";
  const env = { ComSpec };

  const result = getDefaultShell({ env });
  t.is(result, ComSpec);
});

test("%COMSPEC% is not defined", (t) => {
  const env = {};

  const result = getDefaultShell({ env });
  t.is(result, constants.binCmd);
});
