/**
 * @overview Contains unit tests for the quoting functionality on Unix systems.
 * @license Unlicense
 */

import test from "ava";

import { fixtures, macros } from "./_.js";

import * as unix from "../../../src/unix.js";

Object.entries(fixtures.quote).forEach(([shellName, scenarios]) => {
  const cases = Object.values(scenarios).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.quote, {
      expected: expected.notEscaped,
      input,
      platform: unix,
      shellName,
    });
  });
});

test(macros.unsupportedShell, { fn: unix.getQuoteFunction });
