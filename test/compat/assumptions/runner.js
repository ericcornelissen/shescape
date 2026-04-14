/* eslint-disable ava/no-import-test-files */

/**
 * @overview The test runner for assumption compatibility tests.
 * @license MIT
 *
 * This test suite intentionally doesn't use a test framework since the tests
 * are required to run on old Node.js versions - which may not be supported by
 * the test framework used - and the tests are relatively simple anyway.
 * Instead, this minimal test runner is used, where execution just terminates
 * early with a non-zero exit code when a test fails.
 *
 * This may be migrated to the Node.js' builtin testing library when that is
 * available on the lowest Node.js version supported by the library.
 */

import * as cp from "./child-process.test.js";

cp.testShellInheritance();
