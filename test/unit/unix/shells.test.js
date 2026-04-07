/**
 * @overview Contains unit tests for all Unix shells-specific implementation.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { compose } from "../../../src/internal/compose.js";
import * as bash from "../../../src/internal/unix/bash.js";
import * as busybox from "../../../src/internal/unix/busybox.js";
import * as csh from "../../../src/internal/unix/csh.js";
import * as dash from "../../../src/internal/unix/dash.js";
import * as nosh from "../../../src/internal/unix/no-shell.js";
import * as zsh from "../../../src/internal/unix/zsh.js";
import * as unix from "../../../src/internal/unix.js";

import { constants, fixtures, macros } from "./_.js";

const shells = {
  [null]: nosh,
  [constants.binBash]: bash,
  [constants.binBusyBox]: busybox,
  [constants.binCsh]: csh,
  [constants.binDash]: dash,
  [constants.binZsh]: zsh,
};

for (const [shellName, shellExports] of Object.entries(shells)) {
  const escapeFixtures = Object.values(fixtures.escape[shellName]).flat();
  const flagFixtures = Object.values(fixtures.flag[shellName]).flat();
  const quoteFixtures = Object.values(fixtures.quote[shellName]).flat();
  const redosFixtures = fixtures.redos();

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

  for (const index in redosFixtures) {
    const input = redosFixtures[index];
    test(`${shellName}, ReDoS #${index}`, (t) => {
      const escape = shellExports.getEscapeFunction();
      escape(input);
      t.pass();
    });
  }

  for (const { input, expected } of flagFixtures) {
    test(macros.flag, {
      expected: expected.unquoted,
      input,
      getEscapeFunction: shellExports.getEscapeFunction,
      getFlagFunction: unix.getFlagFunction,
      shellName,
    });
  }

  testProp(
    `flag protection when escaping for ${shellName}`,
    [fc.stringMatching(/^-+$/), fc.string()],
    (t, prefix, value) => {
      const escapeFn = shellExports.getEscapeFunction();
      const flagFn = unix.getFlagFunction();
      const fn = compose({ escapeFn, flagFn });

      const actual = fn(`${prefix}${value}`);
      const expected = fn(value);
      t.is(actual, expected);
    },
  );

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

    for (const { input, expected } of flagFixtures) {
      test(macros.flag, {
        expected: expected.quoted,
        input,
        getFlagFunction: unix.getFlagFunction,
        getQuoteFunction: shellExports.getQuoteFunction,
        shellName,
      });
    }

    testProp(
      `flag protection when quoting for ${shellName}`,
      [fc.stringMatching(/^-+$/), fc.string()],
      (t, prefix, value) => {
        const [escapeFn, quoteFn] = shellExports.getQuoteFunction();
        const flagFn = unix.getFlagFunction();
        const fn = compose({ escapeFn, flagFn, quoteFn });

        const actual = fn(`${prefix}${value}`);
        const expected = fn(value);
        t.is(actual, expected);
      },
    );
  }
}
