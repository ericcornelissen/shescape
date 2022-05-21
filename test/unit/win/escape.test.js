/**
 * @overview Contains unit tests for the escaping functionality on Windows
 * systems.
 * @license Unlicense
 */

import test from "ava";

import { fixtures, macros } from "./_.js";

import * as win from "../../../src/win.js";

Object.entries(fixtures.escape).forEach(([shellName, scenarios]) => {
  const cases = Object.values(scenarios).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.escape, {
      expected: expected.noInterpolation,
      input,
      interpolation: false,
      platform: win,
      shellName,
    });
  });

  cases.forEach(({ input, expected }) => {
    test(macros.escape, {
      expected: expected.interpolation,
      input,
      interpolation: true,
      platform: win,
      shellName,
    });
  });
});

test(macros.unsupportedShell, { fn: win.getEscapeFunction });
