/**
 * @overview Contains unit tests for the functionality to read a file system
 * link.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { before, suite, test } from "node:test";

import * as fc from "fast-check";
import * as sinon from "sinon";

import { readlinkSync } from "../../../src/internal/fs.js";

suite("readlink", () => {
  const deps = {};

  before(() => {
    deps.readlinkSync = sinon.mock();
  });

  test("return value", () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), (path, returnValue) => {
        deps.readlinkSync.resetHistory();
        deps.readlinkSync.returns(returnValue);

        const result = readlinkSync(path, deps);
        assert.equal(result, returnValue);
      }),
    );
  });

  test("error", () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.string().map((message) => new Error(message)),
        (path, error) => {
          deps.readlinkSync.resetHistory();
          deps.readlinkSync.throws(error);

          assert.throws(
            () => {
              readlinkSync(path, deps);
            },
            { name: "Error" },
          );
        },
      ),
    );
  });

  test("fs usage", () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), (path, returnValue) => {
        deps.readlinkSync.resetHistory();
        deps.readlinkSync.returns(returnValue);

        readlinkSync(path, deps);
        assert.equal(deps.readlinkSync.callCount, 1);
        assert.ok(deps.readlinkSync.calledWithExactly(path));
      }),
    );
  });
});
