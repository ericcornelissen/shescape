/**
 * @overview Contains property tests for `./src/index-proxy.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import * as fc from "fast-check";
import sinon from "sinon";

import * as proxy from "../src/index-proxy.js";

describe("index-proxy.js", function () {
  before(function () {
    fc.configureGlobal({
      numRuns: 10 ** 5,
      interruptAfterTimeLimit: 1900,
      markInterruptAsFailure: false,
    });
  });

  let escapeFn;

  let getPlatformHelpers;
  let getEscapeFunction;
  let getQuoteFunction;
  let getShellName;

  before(function () {
    escapeFn = sinon.stub();

    getPlatformHelpers = sinon.stub();
    getEscapeFunction = sinon.stub();
    getQuoteFunction = sinon.stub();
    getShellName = sinon.stub();
  });

  beforeEach(function () {
    sinon.reset();

    getPlatformHelpers.returns({
      getEscapeFunction,
      getQuoteFunction,
      getShellName,
    });
  });

  let arg;
  let options, interpolation, shell;
  let platform;
  let process, env;

  beforeEach(function () {
    arg = "arg";
    env = { foo: "bar" };
    interpolation = false;
    platform = "platform";
    shell = "shell";

    process = { env };
    options = { interpolation, shell };
  });

  describe("::escape", function () {
    describe("the escape function", function () {
      it("is called with the provided argument to escape", function () {
        fc.assert(
          fc.property(fc.string(), function (arg) {
            proxy.escape(
              { arg, options, platform, process },
              { escape: escapeFn, getPlatformHelpers }
            );

            assert.ok(
              escapeFn.calledOnceWithExactly(
                sinon.match({ arg }),
                sinon.match.any
              )
            );

            escapeFn.reset();
          })
        );
      });

      it("is called with the provided interpolation value", function () {
        fc.assert(
          fc.property(
            fc.object(),
            fc.oneof(fc.boolean(), fc.constant(undefined)),
            function (options, interpolation) {
              options.interpolation = interpolation;

              proxy.escape(
                { arg, options, platform, process },
                { escape: escapeFn, getPlatformHelpers }
              );

              assert.ok(
                escapeFn.calledOnceWithExactly(
                  sinon.match({ options: { interpolation } }),
                  sinon.match.any
                )
              );

              escapeFn.reset();
            }
          )
        );
      });

      it("is called with the provided shell value", function () {
        fc.assert(
          fc.property(
            fc.object(),
            fc.oneof(fc.string(), fc.constant(undefined)),
            function (options, shell) {
              options.shell = shell;

              proxy.escape(
                { arg, options, platform, process },
                { escape: escapeFn, getPlatformHelpers }
              );

              assert.ok(
                escapeFn.calledOnceWithExactly(
                  sinon.match({ options: { shell } }),
                  sinon.match.any
                )
              );

              escapeFn.reset();
            }
          )
        );
      });

      it("is called with the provided environment values", function () {
        fc.assert(
          fc.property(
            fc.object(),
            fc.oneof(fc.object(), fc.constant(undefined)),
            function (process, env) {
              process.env = env;

              proxy.escape(
                { arg, options, platform, process },
                { escape: escapeFn, getPlatformHelpers }
              );

              assert.ok(
                escapeFn.calledOnceWithExactly(
                  sinon.match({ process: { env } }),
                  sinon.match.any
                )
              );

              escapeFn.reset();
            }
          )
        );
      });
    });
  });
});
