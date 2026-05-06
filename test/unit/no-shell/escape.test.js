/**
 * @overview Contains unit tests for the escaping functionality of no shell.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import * as nosh from "../../../src/internal/no-shell.js";

import { fixtures, macros } from "./_.js";

const escapeFixtures = Object.values(fixtures.escape).flat();

for (const { input, expected } of escapeFixtures) {
  test(macros.escape, {
    expected,
    input,
    getEscapeFunction: nosh.getEscapeFunction,
    shellName: null,
  });
}

testProp("escape function return type", [fc.string()], (t, arg) => {
  const escapeFn = nosh.getEscapeFunction();
  const result = escapeFn(arg);
  t.is(typeof result, "string");
});

testProp("escape function is stateless", [fc.string()], (t, arg) => {
  const escapeFn = nosh.getEscapeFunction();
  const result1 = escapeFn(arg);
  const result2 = escapeFn(arg);
  t.is(result1, result2);
});

test("escape performance", macros.duration, {
  arbitraries: [fc.string({ size: "xlarge" })],
  maxMillis: 50,
  setup: nosh.getEscapeFunction,
});
