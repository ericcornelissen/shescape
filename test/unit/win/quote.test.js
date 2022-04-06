/**
 * @overview Contains unit tests for the quoting functionality on Windows
 * systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import { fixtures, macros } from "./_.js";

import * as win from "../../../src/win.js";

Object.entries(fixtures.quote).forEach(([shellName, scenarios]) => {
  const cases = Object.values(scenarios).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.quote, {
      expected: expected.notEscaped,
      input,
      platform: win,
      shellName,
    });
  });
});

test(macros.unsupportedShell, { fn: win.getQuoteFunction });
