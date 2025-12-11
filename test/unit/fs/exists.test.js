/**
 * @overview Contains unit tests for the functionality to check if a file
 * exists.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import * as sinon from "sinon";

import * as fs from "../../../src/internal/fs.js";
import { existsSync } from "../../../src/internal/fs.js";

test.before((t) => {
  const existsSync = sinon.mock();

  // eslint-disable-next-line no-underscore-dangle
  fs._internal.fs = {
    existsSync,
  };

  t.context = {
    deps: { existsSync },
  };
});

testProp(
  "return value",
  [fc.string(), fc.boolean()],
  (t, path, returnValue) => {
    t.context.deps.existsSync.resetHistory();
    t.context.deps.existsSync.returns(returnValue);

    const result = existsSync(path);
    t.is(result, returnValue);
  },
);

testProp("fs usage", [fc.string(), fc.boolean()], (t, path, returnValue) => {
  t.context.deps.existsSync.resetHistory();
  t.context.deps.existsSync.returns(returnValue);

  existsSync(path);
  t.is(t.context.deps.existsSync.callCount, 1);
  t.true(t.context.deps.existsSync.calledWithExactly(path));
});
