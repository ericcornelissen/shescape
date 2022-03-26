/**
 * @overview Contains unit tests for the escaping functionality on Unix systems.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import * as examples from "./_examples.cjs";
import * as macros from "../macros.js";

import * as unix from "../../../src/unix.js";

Object.entries(examples.escape).forEach(([shellName, scenarios]) => {
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
