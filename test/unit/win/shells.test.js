/**
 * @overview Contains unit tests for all Windows shells-specific implementation.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { constants, fixtures, macros } from "./_.js";

import * as cmd from "../../../src/internal/win/cmd.js";
import * as nosh from "../../../src/internal/win/no-shell.js";
import * as powershell from "../../../src/internal/win/powershell.js";

const shells = {
  [null]: nosh,
  [constants.binCmd]: cmd,
  [constants.binPowerShell]: powershell,
};

for (const [shellName, shellExports] of Object.entries(shells)) {
  const escapeFixtures = Object.values(fixtures.escape[shellName]).flat();
  const flagFixtures = Object.values(fixtures.flag[shellName]).flat();
  const quoteFixtures = Object.values(fixtures.quote[shellName]).flat();

  escapeFixtures.forEach(({ input, expected }) => {
    test(macros.escape, {
      expected,
      input,
      getEscapeFunction: shellExports.getEscapeFunction,
      shellName,
    });
  });

  testProp(`escape function for ${shellName}`, [fc.string()], (t, arg) => {
    const escapeFn = shellExports.getEscapeFunction();
    const result = escapeFn(arg);
    t.is(typeof result, "string");
  });

  test(`escape performance for ${shellName}`, macros.duration, {
    arbitraries: [fc.string({ size: "xlarge" })],
    maxMillis: 50,
    setup: shellExports.getEscapeFunction,
  });

  flagFixtures.forEach(({ input, expected }) => {
    test(macros.flag, {
      expected: expected.unquoted,
      input,
      getFlagProtectionFunction: shellExports.getFlagProtectionFunction,
      shellName,
    });
  });

  testProp(
    `flag protection function for ${shellName}`,
    [fc.string()],
    (t, arg) => {
      const flagProtect = shellExports.getFlagProtectionFunction();
      const result = flagProtect(arg);
      t.is(typeof result, "string");
    },
  );

  test(`flag protection performance for ${shellName}`, macros.duration, {
    arbitraries: [fc.string({ size: "xlarge" })],
    maxMillis: 50,
    setup: shellExports.getFlagProtectionFunction,
  });

  if (shellExports !== nosh) {
    quoteFixtures.forEach(({ input, expected }) => {
      test(macros.quote, {
        expected,
        input,
        getQuoteFunction: shellExports.getQuoteFunction,
        shellName,
      });
    });

    testProp(`quote function for ${shellName}`, [fc.string()], (t, arg) => {
      const [escapeFn, quoteFn] = shellExports.getQuoteFunction();
      const intermediate = escapeFn(arg);
      t.is(typeof intermediate, "string");
      const result = quoteFn(intermediate);
      t.is(typeof result, "string");
    });

    test(`quote performance for ${shellName}`, macros.duration, {
      arbitraries: [fc.string({ size: "xlarge" })],
      maxMillis: 50,
      setup: () => {
        const [escapeFn, quoteFn] = shellExports.getQuoteFunction();
        return (arg) => quoteFn(escapeFn(arg));
      },
    });
  }
}
