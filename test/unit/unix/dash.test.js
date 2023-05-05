/**
 * @overview Contains unit tests for the Debian Almquist shell (Dash)
 * functionality.
 * @license MIT
 */

import test from "ava";

import { constants, fixtures, macros } from "./_.js";

import * as dash from "../../../src/unix/dash.js";

const shellName = constants.binDash;

{
  const cases = Object.values(fixtures.escape[shellName]).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.escapeNew, {
      expected: expected.noInterpolation,
      input,
      getEscapeFunction: dash.getEscapeFunction,
      interpolation: false,
      quoted: false,
      shellName,
    });
  });

  cases.forEach(({ input, expected }) => {
    test(macros.escapeNew, {
      expected: expected.interpolation,
      input,
      getEscapeFunction: dash.getEscapeFunction,
      interpolation: true,
      quoted: false,
      shellName,
    });
  });

  cases.forEach(({ input, expected }) => {
    test(macros.escapeNew, {
      expected: expected.quoted || expected.noInterpolation,
      input,
      getEscapeFunction: dash.getEscapeFunction,
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
      getQuoteFunction: dash.getQuoteFunction,
      shellName,
    });
  });
}

fixtures.redos().forEach((s, i) => {
  test(`${shellName}, ReDoS #${i}`, (t) => {
    const escape = dash.getEscapeFunction({
      interpolation: true,
      quoted: false,
    });
    escape(s);
    t.pass();
  });
});
