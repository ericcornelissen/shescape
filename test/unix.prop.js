/**
 * @overview Contains property tests for `./src/unix.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import * as fc from "fast-check";
import * as path from "path";
import sinon from "sinon";

import { binBash, binDash, binZsh } from "./common.js";

import * as unix from "../src/unix.js";

describe("unix.js", function () {
  const supportedShells = [binBash, binDash, binZsh];

  before(function () {
    fc.configureGlobal({
      numRuns: 10 ** 5,
      interruptAfterTimeLimit: 1900,
      markInterruptAsFailure: false,
    });
  });

  it("supports the same shells for quoting and escaping", function () {
    fc.assert(
      fc.property(
        fc.oneof(fc.constantFrom(...supportedShells), fc.asciiString()),
        function (shellName) {
          const escapeFn = unix.getEscapeFunction(shellName);
          const quoteFn = unix.getEscapeFunction(shellName);
          assert.equal(typeof escapeFn, typeof quoteFn);
        }
      )
    );
  });

  describe("::getEscapeFunction", function () {
    it("returns a string for supported shells", function () {
      fc.assert(
        fc.property(
          fc.constantFrom(...supportedShells),
          fc.string(),
          function (shellName, arg) {
            const escapeFn = unix.getEscapeFunction(shellName);
            const result = escapeFn(arg);
            assert.ok(typeof result === "string");
          }
        )
      );
    });

    it("always returns `null` for unsupported shells", function () {
      fc.assert(
        fc.property(
          fc.string().filter((x) => !supportedShells.includes(x)),
          function (shellName) {
            const escapeFn = unix.getEscapeFunction(shellName);
            assert.strictEqual(escapeFn, null);
          }
        )
      );
    });
  });

  describe("::getQuoteFunction", function () {
    it("quotes with single quotes for supported shells", function () {
      fc.assert(
        fc.property(
          fc.constantFrom(...supportedShells),
          fc.string(),
          function (shellName, input) {
            const quoteFn = unix.getQuoteFunction(shellName);
            const result = quoteFn(input);
            assert.strictEqual(result, `'${input}'`);
          }
        )
      );
    });

    it("always returns `null` for unsupported shells", function () {
      fc.assert(
        fc.property(
          fc.string().filter((x) => !supportedShells.includes(x)),
          function (shellName) {
            const escapeFn = unix.getQuoteFunction(shellName);
            assert.strictEqual(escapeFn, null);
          }
        )
      );
    });
  });

  describe("::getShellName", function () {
    let resolveExecutable;

    before(function () {
      resolveExecutable = sinon.stub();
    });

    beforeEach(function () {
      sinon.reset();

      resolveExecutable.returns("foobar");
    });

    it("resolves the provided shell", function () {
      fc.assert(
        fc.property(fc.string(), function (shell) {
          unix.getShellName({ shell }, { resolveExecutable });
          assert.ok(
            resolveExecutable.calledWithExactly(
              { executable: shell },
              sinon.match.any
            )
          );
        })
      );
    });

    it("returns the name of the resolved shell if it is supported", function () {
      fc.assert(
        fc.property(
          fc.object(),
          fc.constantFrom(...supportedShells),
          function (env, shell) {
            resolveExecutable.returns(`/bin/${shell}`);

            const result = unix.getShellName(
              { env, shell },
              { resolveExecutable }
            );
            assert.equal(result, shell);
          }
        )
      );
    });

    it(`returns '${binBash}' if the resolved shell is not supported`, function () {
      fc.assert(
        fc.property(
          fc
            .string()
            .filter((x) => !supportedShells.includes(path.basename(x))),
          function (shell) {
            resolveExecutable.returns(`/bin/${shell}`);

            const result = unix.getShellName({ shell }, { resolveExecutable });
            assert.equal(result, binBash);
          }
        )
      );
    });
  });
});
