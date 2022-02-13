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

    it("which fails", function () {
      which.throws();

      const result = resolveExecutable(args, deps);
      assert.equal(result, executable);

      assert.equal(which.callCount, 1);
      assert.equal(exists.callCount, 0);
      assert.equal(readlink.callCount, 0);
    });

    describe("executable doesn't exist", function () {
      beforeEach(function () {
        exists.returns(false);
      });

      it("provided executable is full path", function () {
        which.returnsArg(0);

        const result = resolveExecutable(args, deps);
        assert.equal(result, executable);
      });

      it("provided executable resolved by which", function () {
        const resolvedExecutable = "/path/to/sh";
        assert.notEqual(executable, resolvedExecutable);

        which.returns(resolvedExecutable);

        const result = resolveExecutable(args, deps);
        assert.equal(result, resolvedExecutable);
      });

      afterEach(function () {
        assert.equal(which.callCount, 1);
        assert.equal(exists.callCount, 1);
        assert.equal(readlink.callCount, 0);
      });
    });

    describe("executable exists", function () {
      beforeEach(function () {
        exists.returns(true);
      });

      describe("which doesn't resolve", function () {
        beforeEach(function () {
          which.returnsArg(0);
        });

        it("not symlink", function () {
          readlink.throws();

          const result = resolveExecutable(args, deps);
          assert.equal(result, executable);
        });

        it("is symlink", function () {
          const linkedExecutable = "/bin/bash";
          assert.notEqual(executable, linkedExecutable);

          exists.returns(true);
          readlink.returns(linkedExecutable);

          const result = resolveExecutable(args, deps);
          assert.equal(result, linkedExecutable);
        });
      });

      describe("which resolves", function () {
        const resolvedExecutable = "/path/to/sh";

        beforeEach(function () {
          which.returns(resolvedExecutable);
        });

        it("not symlink", function () {
          readlink.throws();

          const result = resolveExecutable(args, deps);
          assert.equal(result, resolvedExecutable);
        });

        it("is symlink", function () {
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
