/* eslint-disable ava/no-import-test-files */

/**
 * @overview The test runner for experimental (linear-time) regexp engine
 * compatibility tests.
 * @license MIT
 *
 * This test suite intentionally doesn't use a test framework since the tests
 * are required to run on old Node.js versions - which may not be supported by
 * the test framework used - and must be run with the experimental regular
 * expression engine enabled - which the test framework might not support - and
 * the tests are relatively simple anyway. Instead, this minimal test runner is
 * used, where execution just terminates early with a non-zero exit code when a
 * test fails.
 *
 * This may be migrated to the Node.js' builtin testing library when that is
 * available on the lowest Node.js version supported by the library.
 */

import * as unix from "./unix.test.js";
import * as win from "./win.test.js";

try {
  // eslint-disable-next-line
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
