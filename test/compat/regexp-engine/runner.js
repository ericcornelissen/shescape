/* eslint-disable ava/no-import-test-files */

/**
 * @overview The test runner for experimental (linear) regexp engine
 * compatibility tests.
 * @license MIT
 *
 * This test suite doesn't use a test framework because all it just needs to
 * cover the instantiation of (relevant) regular expressions that leverage the
 * experimental (linear) regexp engine.
 */

import * as unix from "./unix.test.js";
import * as win from "./win.test.js";

try {
  new RegExp("", "l");
} catch {
  throw new Error(
    "test suite must be run with '--enable-experimental-regexp-engine'",
  );
}

unix.testEscape();
unix.testQuote();
unix.testFlagProtect();

win.testEscape();
win.testQuote();
win.testFlagProtect();
