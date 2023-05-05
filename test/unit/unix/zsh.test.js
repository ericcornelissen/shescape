/**
 * @overview Contains unit tests for the Z shell (zsh) functionality.
 * @license MIT
 */

import test from "ava";

import { constants, fixtures, macros } from "./_.js";

import * as zsh from "../../../src/unix/zsh.js";

const shellName = constants.binZsh;

{
  const cases = Object.values(fixtures.escape[shellName]).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.escapeNew, {
      expected: expected.noInterpolation,
      input,
      getEscapeFunction: zsh.getEscapeFunction,
      interpolation: false,
      quoted: false,
      shellName,
    });
  });

  cases.forEach(({ input, expected }) => {
    test(macros.escapeNew, {
      expected: expected.interpolation,
      input,
      getEscapeFunction: zsh.getEscapeFunction,
      interpolation: true,
      quoted: false,
      shellName,
    });
  });

  cases.forEach(({ input, expected }) => {
    test(macros.escapeNew, {
      expected: expected.quoted || expected.noInterpolation,
      input,
      getEscapeFunction: zsh.getEscapeFunction,
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
      getQuoteFunction: zsh.getQuoteFunction,
      shellName,
    });
  });
}

fixtures.redos().forEach((s, i) => {
  test(`${shellName}, ReDoS #${i}`, (t) => {
    const escape = zsh.getEscapeFunction({
      interpolation: true,
      quoted: false,
    });
    escape(s);
    t.pass();
  });
});
