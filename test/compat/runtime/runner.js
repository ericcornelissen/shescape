/* eslint-disable ava/no-import-test-files */

/**
 * @overview The test runner for runtime compatibility tests.
 * @license MIT
 *
 * This test suite intentionally doesn't use a test framework since the tests
 * are required to run on old Node.js versions - which may not be supported by
 * the test framework used by the library - and the tests are relatively simple
 * anyway. Instead, this minimal test runner is used, where execution just
 * terminates early with a non-zero exit code when a test fails.
 *
 * This may be migrated to the Node.js' builtin testing library when that is
 * available on the lowest Node.js version supported by the library.
 */

import * as index from "./index.test.js";
import * as stateless from "./stateless.test.js";
import * as testing from "./testing.test.js";

index.testShescapeEscape();
index.testShescapeEscapeAll();
index.testShescapeQuote();
index.testShescapeQuoteAll();

stateless.testShescapeEscape();
stateless.testShescapeEscapeAll();
stateless.testShescapeQuote();
stateless.testShescapeQuoteAll();

testing.testStubscapeEscape();
testing.testStubscapeEscapeAll();
testing.testStubscapeQuote();
testing.testStubscapeQuoteAll();
testing.testThrowscapeConstructor();
