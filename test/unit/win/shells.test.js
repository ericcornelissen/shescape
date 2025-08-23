/**
 * @overview Contains unit tests for all Windows shells-specific implementation.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import * as cmd from "../../../src/internal/win/cmd.js";
import * as nosh from "../../../src/internal/win/no-shell.js";
import * as powershell from "../../../src/internal/win/powershell.js";

import { constants, fixtures, macros } from "./_.js";

const shells = {
  [null]: nosh,
  [constants.binCmd]: cmd,
  [constants.binPowerShell]: powershell,
};

for (const [shellName, shellExports] of Object.entries(shells)) {
  const escapeFixtures = Object.values(fixtures.escape[shellName]).flat();
  const flagFixtures = Object.values(fixtures.flag[shellName]).flat();
  const quoteFixtures = Object.values(fixtures.quote[shellName]).flat();

  for (const { input, expected } of escapeFixtures) {
    test(macros.escape, {
      expected,
      input,
      getEscapeFunction: shellExports.getEscapeFunction,
      shellName,
    });
  }

  testProp(
    `${shellName} escape function return type`,
    [fc.string()],
    (t, arg) => {
      const escapeFn = shellExports.getEscapeFunction();
      const result = escapeFn(arg);
      t.is(typeof result, "string");
    },
  );

  testProp(
    `escape function for ${shellName} is stateless`,
    [fc.string()],
    (t, arg) => {
      const escapeFn = shellExports.getEscapeFunction();
      const result1 = escapeFn(arg);
      const result2 = escapeFn(arg);
      t.is(result1, result2);
    },
  );

  test(`escape performance for ${shellName}`, macros.duration, {
    arbitraries: [fc.string({ size: "xlarge" })],
    maxMillis: 50,
    setup: shellExports.getEscapeFunction,
  });

  for (const { input, expected } of flagFixtures) {
    test(macros.flag, {
      expected: expected.unquoted,
      input,
      getFlagProtectionFunction: shellExports.getFlagProtectionFunction,
      shellName,
    });
  }

  testProp(
    `${shellName} flag protection function return type`,
    [fc.string()],
    (t, arg) => {
      const flagProtect = shellExports.getFlagProtectionFunction();
      const result = flagProtect(arg);
      t.is(typeof result, "string");
    },
  );

  testProp(
    `flag protection function for ${shellName} is stateless`,
    [fc.string()],
    (t, arg) => {
      const flagProtect = shellExports.getFlagProtectionFunction();
      const result1 = flagProtect(arg);
      const result2 = flagProtect(arg);
      t.is(result1, result2);
    },
  );

  test(`flag protection performance for ${shellName}`, macros.duration, {
    arbitraries: [fc.string({ size: "xlarge" })],
    maxMillis: 50,
    setup: shellExports.getFlagProtectionFunction,
  });

  if (shellExports !== nosh) {
    for (const { input, expected } of quoteFixtures) {
      test(macros.quote, {
        expected,
        input,
        getQuoteFunction: shellExports.getQuoteFunction,
        shellName,
      });
    }

    testProp(
      `${shellName} quote function return type`,
      [fc.string()],
      (t, arg) => {
        const [escapeFn, quoteFn] = shellExports.getQuoteFunction();
        const intermediate = escapeFn(arg);
        t.is(typeof intermediate, "string");
        const result = quoteFn(intermediate);
        t.is(typeof result, "string");
      },
    );

    testProp(
      `quote function for ${shellName} is stateless`,
      [fc.string()],
      (t, arg) => {
        const [escapeFn, quoteFn] = shellExports.getQuoteFunction();
        const intermediate1 = escapeFn(arg);
        const intermediate2 = escapeFn(arg);
        t.is(intermediate1, intermediate2);

        const result1 = quoteFn(intermediate1);
        const result2 = quoteFn(intermediate2);
        t.is(result1, result2);
      },
    );

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
