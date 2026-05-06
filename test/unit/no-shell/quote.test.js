/**
 * @overview Contains unit tests for the quoting functionality of no shell.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import * as nosh from "../../../src/internal/no-shell.js";

testProp("quote function", [fc.string()], (t, arg) => {
  const expected = {
    instanceOf: Error,
    message: "Quoting is not supported when no shell is used",
  };

  const [escapeFn, quoteFn] = nosh.getQuoteFunction();
  t.throws(() => escapeFn(arg), expected);
  t.throws(() => quoteFn(arg), expected);
});
