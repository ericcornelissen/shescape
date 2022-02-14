/**
 * @overview Contains unit tests for `./src/executables.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import sinon from "sinon";

import { resolveExecutable } from "../src/executables.js";

describe("executables.js", function () {
  let exists;
  let readlink;
  let which;

  before(function () {
    exists = sinon.stub();
    readlink = sinon.stub();
    which = sinon.stub();
  });

  beforeEach(function () {
    exists.reset();
    readlink.reset();
    which.reset();
  });

  describe("::resolveExecutable", function () {
    let deps;

    const executable = "/bin/sh";
    const args = { executable };

    before(function () {
      deps = { exists, readlink, which };
    });

    describe("the executable cannot be resolved", function () {
      it("returns the provided executable path", function () {
        which.throws();

        const result = resolveExecutable(args, deps);
        assert.equal(result, executable);
      });

      afterEach(function () {
        assert.equal(which.callCount, 1);
        assert.equal(exists.callCount, 0);
        assert.equal(readlink.callCount, 0);
      });
    });

    describe("the executable doesn't exist", function () {
      beforeEach(function () {
        exists.returns(false);
      });

      describe("and does not need to be resolved", function () {
        it("returns the provided executable path", function () {
          which.returnsArg(0);

          const result = resolveExecutable(args, deps);
          assert.equal(result, executable);
        });
      });

      describe("and needs to be resolved", function () {
        it("returns the resolved executable path", function () {
          const resolvedExecutable = "/path/to/sh";
          assert.notEqual(executable, resolvedExecutable);

          which.returns(resolvedExecutable);

          const result = resolveExecutable(args, deps);
          assert.equal(result, resolvedExecutable);
        });
      });

      afterEach(function () {
        assert.equal(which.callCount, 1);
        assert.equal(exists.callCount, 1);
        assert.equal(readlink.callCount, 0);
      });
    });

    describe("the executable exists", function () {
      beforeEach(function () {
        exists.returns(true);
      });

      describe("and does not need to be resolved", function () {
        beforeEach(function () {
          which.returnsArg(0);
        });

        it("is not a symlink", function () {
          readlink.throws();

          const result = resolveExecutable(args, deps);
          assert.equal(result, executable);
        });

        it("is a symlink", function () {
          const linkedExecutable = "/bin/bash";
          assert.notEqual(executable, linkedExecutable);

          exists.returns(true);
          readlink.returns(linkedExecutable);

          const result = resolveExecutable(args, deps);
          assert.equal(result, linkedExecutable);
        });
      });

      describe("and needs to be resolved", function () {
        const resolvedExecutable = "/path/to/sh";

        beforeEach(function () {
          which.returns(resolvedExecutable);
        });

        it("is not a (sym)link", function () {
          readlink.throws();

          const result = resolveExecutable(args, deps);
          assert.equal(result, resolvedExecutable);
        });

        it("is a symlink", function () {
          const linkedExecutable = "/bin/bash";
          assert.notEqual(executable, linkedExecutable);
          assert.notEqual(resolvedExecutable, linkedExecutable);

          exists.returns(true);
          readlink.returns(linkedExecutable);

          const result = resolveExecutable(args, deps);
          assert.equal(result, linkedExecutable);
        });
      });

      afterEach(function () {
        assert.equal(which.callCount, 1);
        assert.equal(exists.callCount, 1);
        assert.equal(readlink.callCount, 1);
      });
    });

    describe("input validation", function () {
      it("fails if the exists dependency is omitted", function () {
        assert.throws(() => resolveExecutable(args, { readlink, which }));
      });

      it("fails if the readlink dependency is omitted", function () {
        assert.throws(() => resolveExecutable(args, { exists, which }));
      });

      it("fails if the which dependency is omitted", function () {
        assert.throws(() => resolveExecutable(args, { exists, readlink }));
      });
    });
  });
});
