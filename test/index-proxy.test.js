/**
 * @overview Contains unit tests for `./src/index-proxy.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import sinon from "sinon";

import * as proxy from "../src/index-proxy.js";

describe("index-proxy.js", function () {
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

    options = { interpolation, shell };
    process = { env };
  });

  describe("::escape", function () {
    it("gets the helpers for the specified platform", function () {
      platform = "foobar";

      proxy.escape(
        { arg, options, platform, process },
        { escape: escapeFn, getPlatformHelpers }
      );

      assert.ok(getPlatformHelpers.calledOnceWithExactly(platform));
    });

    describe("the escape function", function () {
      it("is called with the provided argument to escape", function () {
        arg = "Hello world!";

        proxy.escape(
          { arg, options, platform, process },
          { escape: escapeFn, getPlatformHelpers }
        );

        assert.ok(
          escapeFn.calledOnceWithExactly(sinon.match({ arg }), sinon.match.any)
        );
      });

      it("is called with the provided interpolation value", function () {
        interpolation = true;
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
      });

      it("is called with the provided shell value", function () {
        shell = "shell name";
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
      });

      it("is called with the provided environment values", function () {
        env = { foo: "bar", hello: "world!" };
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
      });

      it("is called with the appropriate helpers", function () {
        proxy.escape(
          { arg, options, platform, process },
          { escape: escapeFn, getPlatformHelpers }
        );

        assert.ok(
          escapeFn.calledOnceWithExactly(sinon.match.any, {
            getEscapeFunction,
            getShellName,
            getQuoteFunction,
          })
        );
      });
    });
  });
});
