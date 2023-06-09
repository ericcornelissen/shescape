/**
 * @overview Contains unit tests for all Windows shells-specific implementation.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants, fixtures, macros } from "./_.js";

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

  testProp("quote function for supported shell", [fc.string()], (t, arg) => {
    const [escapeFn, quoteFn] = shellExports.getQuoteFunction();
    const result = quoteFn(escapeFn(arg));
    t.is(typeof result, "string");
    t.regex(result, /^(".*"|'.*')$/u);
  });

  testProp(
    "flag protection against non-flags",
    [arbitrary.windowsShell(), fc.stringMatching(/^[^-/]/u)],
    (t, shellName, arg) => {
      const flagProtect = shellExports.getFlagProtectionFunction(shellName);
      t.is(flagProtect(arg), arg);
    }
  );

  testProp(
    "flag protection against flags",
    [
      arbitrary.windowsShell(),
      fc.stringMatching(/^(?:-+|\/+)$/u),
      fc.stringMatching(/^[^-/]/u),
    ],
    (t, shellName, prefix, flag) => {
      const flagProtect = shellExports.getFlagProtectionFunction(shellName);
      t.is(flagProtect(`${prefix}${flag}`), flag);
    }
  );
}
