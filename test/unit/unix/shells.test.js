/**
 * @overview Contains unit tests for all Unix shells-specific implementation.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { constants, expressions, fixtures, macros } from "./_.js";

import * as bash from "../../../src/unix/bash.js";
import * as csh from "../../../src/unix/csh.js";
import * as dash from "../../../src/unix/dash.js";
import * as zsh from "../../../src/unix/zsh.js";

const shells = {
  [constants.binBash]: bash,
  [constants.binCsh]: csh,
  [constants.binDash]: dash,
  [constants.binZsh]: zsh,
};

for (const [shellName, shellExports] of Object.entries(shells)) {
  const escapeFixtures = Object.values(fixtures.escape[shellName]).flat();
  const flagExpressions = expressions.flag[shellName];
  const quoteFixtures = Object.values(fixtures.quote[shellName]).flat();
  const redosFixtures = fixtures.redos();

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

  testProp(`quote function for ${shellName}`, [fc.string()], (t, arg) => {
    const [escapeFn, quoteFn] = shellExports.getQuoteFunction();
    const intermediate = escapeFn(arg);
    t.is(typeof intermediate, "string");
    const result = quoteFn(intermediate);
    t.regex(result, /^(".*"|'.*')$/u);
  });

  testProp(
    `${shellName} flag protection against non-flags`,
    [fc.stringMatching(flagExpressions.nonFlag)],
    (t, arg) => {
      const flagProtect = shellExports.getFlagProtectionFunction();
      const result = flagProtect(arg);
      t.is(result, arg);
    }
  );

  testProp(
    `${shellName} flag protection against flags`,
    [
      fc.stringMatching(flagExpressions.flag),
      fc.stringMatching(flagExpressions.nonFlag),
    ],
    (t, prefix, flag) => {
      const flagProtect = shellExports.getFlagProtectionFunction();
      const result = flagProtect(`${prefix}${flag}`);
      t.is(result, flag);
    }
  );

  redosFixtures.forEach((input, id) => {
    test(`${shellName}, ReDoS #${id}`, (t) => {
      const escape = shellExports.getEscapeFunction({ interpolation: true });
      escape(input);
      t.pass();
    });
  });
}
