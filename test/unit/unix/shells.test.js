/**
 * @overview Contains unit tests for all Unix shells-specific implementation.
 * @license MIT
 */

import test from "ava";

import { constants, fixtures, macros } from "./_.js";

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

  redosFixtures.forEach((input, id) => {
    test(`${shellName}, ReDoS #${id}`, (t) => {
      const escape = shellExports.getEscapeFunction({ interpolation: true });
      escape(input);
      t.pass();
    });
  });
}
