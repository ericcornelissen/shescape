/**
 * @overview Contains unit tests for all Windows shells-specific implementation.
 * @license MIT
 */

import test from "ava";

import { constants, fixtures, macros } from "./_.js";

import * as cmd from "../../../src/win/cmd.js";
import * as powershell from "../../../src/win/powershell.js";

const shells = {
  [constants.binCmd]: cmd,
  [constants.binPowerShell]: powershell,
};

for (const [shellName, shellExports] of Object.entries(shells)) {
  const escapeFixtures = Object.values(fixtures.escape[shellName]).flat();
  const quoteFixtures = Object.values(fixtures.quote[shellName]).flat();

  escapeFixtures.forEach(({ input, expected }) => {
    test(macros.escape, {
      expected: expected.noInterpolation,
      input,
      getEscapeFunction: shellExports.getEscapeFunction,
      interpolation: false,
      shellName,
    });

    test(macros.escape, {
      expected: expected.interpolation,
      input,
      getEscapeFunction: shellExports.getEscapeFunction,
      interpolation: true,
      shellName,
    });
  });

  quoteFixtures.forEach(({ input, expected }) => {
    test(macros.quote, {
      expected,
      input,
      getQuoteFunction: shellExports.getQuoteFunction,
      shellName,
    });
  });
}
