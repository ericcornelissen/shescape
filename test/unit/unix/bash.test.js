/**
 * @overview Contains unit tests for the Bourne-again shell (Bash)
 * functionality.
 * @license MIT
 */

import test from "ava";

import { constants, fixtures, macros } from "./_.js";

import * as bash from "../../../src/unix/bash.js";

const shellName = constants.binBash;

{
  const cases = Object.values(fixtures.escape[shellName]).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.escapeNew, {
      expected: expected.noInterpolation,
      input,
      getEscapeFunction: bash.getEscapeFunction,
      interpolation: false,
      quoted: false,
      shellName,
    });
  });

  cases.forEach(({ input, expected }) => {
    test(macros.escapeNew, {
      expected: expected.interpolation,
      input,
      getEscapeFunction: bash.getEscapeFunction,
      interpolation: true,
      quoted: false,
      shellName,
    });
  });

  cases.forEach(({ input, expected }) => {
    test(macros.escapeNew, {
      expected: expected.quoted || expected.noInterpolation,
      input,
      getEscapeFunction: bash.getEscapeFunction,
      interpolation: false,
      quoted: true,
      shellName,
    });
  });
}

{
  const cases = Object.values(fixtures.quote[shellName]).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.quoteNew, {
      expected: expected.notEscaped,
      input,
      getQuoteFunction: bash.getQuoteFunction,
      shellName,
    });
  });
}

fixtures.redos().forEach((s, i) => {
  test(`${shellName}, ReDoS #${i}`, (t) => {
    const escape = bash.getEscapeFunction({
      interpolation: true,
      quoted: false,
    });
    escape(s);
    t.pass();
  });
});
