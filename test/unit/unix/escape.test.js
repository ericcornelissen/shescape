/**
 * @overview Contains unit tests for the escaping functionality on Unix systems.
 * @license Unlicense
 */

import test from "ava";

import { fixtures, macros } from "./_.js";

import * as unix from "../../../src/unix.js";

Object.entries(fixtures.escape).forEach(([shellName, scenarios]) => {
  const cases = Object.values(scenarios).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.escape, {
      expected: expected.noInterpolation,
      input,
      interpolation: false,
      platform: unix,
      shellName,
    });
  });

  cases.forEach(({ input, expected }) => {
    test(macros.escape, {
      expected: expected.interpolation,
      input,
      interpolation: true,
      platform: unix,
      shellName,
    });
  });
});

test(macros.unsupportedShell, { fn: unix.getEscapeFunction });
