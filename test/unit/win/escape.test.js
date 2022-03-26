/**
 * @overview Contains unit tests for the escaping functionality on Windows
 * systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import * as examples from "./_examples.cjs";
import * as macros from "./_macros.js";

import * as win from "../../../src/win.js";

Object.entries(examples.escape).forEach(([shellName, scenarios]) => {
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
