/**
 * @overview Contains unit tests for the functionality to check if a file
 * exists.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { before, suite, test } from "node:test";

import * as fc from "fast-check";
import * as sinon from "sinon";

import { existsSync } from "../../../src/internal/fs.js";

suite("exists", () => {
  const deps = {};

  before(() => {
    deps.existsSync = sinon.mock();
  });

  test("return value", () => {
    fc.assert(
      fc.property(fc.string(), fc.boolean(), (path, returnValue) => {
        deps.existsSync.resetHistory();
        deps.existsSync.returns(returnValue);

        const result = existsSync(path, deps);
        assert.equal(result, returnValue);
      }),
    );
  });

  test("fs usage", () => {
    fc.assert(
      fc.property(fc.string(), fc.boolean(), (path, returnValue) => {
        deps.existsSync.resetHistory();
        deps.existsSync.returns(returnValue);

        existsSync(path, deps);
        assert.equal(deps.existsSync.callCount, 1);
        assert.ok(deps.existsSync.calledWithExactly(path));
      }),
    );
  });
});
