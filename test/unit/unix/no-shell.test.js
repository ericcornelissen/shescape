/**
 * @overview Contains (additional) unit tests for the escaping functionality for
 * no shell on Unix.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import * as noShell from "../../../src/unix/no-shell.js";

testProp("quote function", [fc.string()], (t, arg) => {
  const expected = {
    message: "Quoting is not supported when no shell is used",
  };

  const [escapeFn, quoteFn] = noShell.getQuoteFunction();
  t.throws(() => escapeFn(arg), expected);
  t.throws(() => quoteFn(arg), expected);
});
