/**
 * @overview Contains unit tests for the functionality to read a file system
 * link.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import * as sinon from "sinon";

import { readlinkSync } from "../../../src/internal/fs.js";

test.before((t) => {
  const readlinkSync = sinon.mock();

  t.context = {
    deps: { readlinkSync },
  };
});

testProp("return value", [fc.string(), fc.string()], (t, path, returnValue) => {
  t.context.deps.readlinkSync.resetHistory();
  t.context.deps.readlinkSync.returns(returnValue);

  const result = readlinkSync(path, t.context.deps);
  t.is(result, returnValue);
});

testProp(
  "error",
  [fc.string(), fc.string().map((message) => new Error(message))],
  (t, path, error) => {
    t.context.deps.readlinkSync.resetHistory();
    t.context.deps.readlinkSync.throws(error);

    t.throws(() => readlinkSync(path, t.context.deps), { is: error });
  },
);

testProp("fs usage", [fc.string(), fc.string()], (t, path, returnValue) => {
  t.context.deps.readlinkSync.resetHistory();
  t.context.deps.readlinkSync.returns(returnValue);

  readlinkSync(path, t.context.deps);
  t.is(t.context.deps.readlinkSync.callCount, 1);
  t.true(t.context.deps.readlinkSync.calledWithExactly(path));
});
