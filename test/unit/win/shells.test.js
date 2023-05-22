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
    test(macros.escapeNew, {
      expected: expected.noInterpolation,
      input,
      getEscapeFunction: shellExports.getEscapeFunction,
      interpolation: false,
      quoted: false,
      shellName,
    });

    test(macros.escapeNew, {
      expected: expected.interpolation,
      input,
      getEscapeFunction: shellExports.getEscapeFunction,
      interpolation: true,
      quoted: false,
      shellName,
    });

    test(macros.escapeNew, {
      expected: expected.quoted || expected.noInterpolation,
      input,
      getEscapeFunction: shellExports.getEscapeFunction,
      interpolation: false,
      quoted: true,
      shellName,
    });
  });

  quoteFixtures.forEach(({ input, expected }) => {
    test(macros.quoteNew, {
      expected: expected.notEscaped,
      input,
      getQuoteFunction: shellExports.getQuoteFunction,
      shellName,
    });
  });
}
