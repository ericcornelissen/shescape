/**
 * @overview Contains unit tests for the escaping functionality on Unix systems.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, constants, fixtures, macros } from "./_.js";

import * as unix from "../../../src/unix.js";

Object.entries(fixtures.escape).forEach(([shellName, scenarios]) => {
  const cases = Object.values(scenarios).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.escape, {
      expected: expected.noInterpolation,
      input,
      interpolation: false,
      platform: unix,
      quoted: false,
      shellName,
    });
  });

  cases.forEach(({ input, expected }) => {
    test(macros.escape, {
      expected: expected.interpolation,
      input,
      interpolation: true,
      platform: unix,
      quoted: false,
      shellName,
    });
  });

  cases.forEach(({ input, expected }) => {
    test(macros.escape, {
      expected: expected.quoted || expected.noInterpolation,
      input,
      interpolation: false,
      platform: unix,
      quoted: true,
      shellName,
    });
  });
});

fixtures.redos().forEach((s, i) => {
  for (const shell of constants.shellsUnix) {
    test(`${shell}, ReDoS #${i}`, (t) => {
      const escape = unix.getEscapeFunction(shell);
      escape(s, { interpolation: true, quoted: false });
      t.pass();
    });
  }
});

testProp(
  "unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = unix.getEscapeFunction(shellName);
    t.is(result, undefined);
  }
);
