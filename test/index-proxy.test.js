/**
 * @overview Contains unit tests for `./src/index-proxy.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import sinon from "sinon";

import * as proxy from "../src/index-proxy.js";
import * as unix from "../src/unix.js";
import * as win from "../src/win.js";

describe("index-proxy.js", function () {
  let escapeShellArg;
  let quoteShellArg;

  before(function () {
    escapeShellArg = sinon.stub();
    quoteShellArg = sinon.stub();
  });

  beforeEach(function () {
    sinon.reset();
  });

  let arg;
  let options, interpolation, shell;
  let platform;
  let process, env;

  beforeEach(function () {
    arg = "arg";
    env = { foo: "bar" };
    interpolation = false;
    platform = "foobar";
    shell = "foobar";

    process = { env };
    options = { interpolation, shell };
  });

  describe("::escape", function () {
    const invoke = () =>
      proxy.escape({ arg, options, platform, process }, { escapeShellArg });

    describe("unix", function () {
      beforeEach(function () {
        platform = "unix";
      });

      it("calls the escape function", function () {
        invoke();

        assert.ok(escapeShellArg.callCount, 1);
        assert.ok(
          escapeShellArg.calledWithExactly(
            { arg, env, interpolation, platform, shell },
            { ...unix, resolveExecutable: sinon.match.func }
          )
        );
      });
    });

    describe("win32", function () {
      beforeEach(function () {
        platform = "win32";
      });

      it("calls the escape function", function () {
        invoke();

        assert.ok(escapeShellArg.callCount, 1);
        assert.ok(
          escapeShellArg.calledWithExactly(
            { arg, env, interpolation, platform, shell },
            { ...win, resolveExecutable: sinon.match.func }
          )
        );
      });
    });
  });

  describe("::quote", function () {
    const invoke = () =>
      proxy.quote({ arg, options, platform, process }, { quoteShellArg });

    describe("unix", function () {
      beforeEach(function () {
        platform = "unix";
      });

      it("calls the escape function", function () {
        invoke();

        assert.ok(quoteShellArg.callCount, 1);
        assert.ok(
          quoteShellArg.calledWithExactly(
            { arg, env, platform, shell },
            { ...unix, resolveExecutable: sinon.match.func }
          )
        );
      });
    });

    describe("win32", function () {
      beforeEach(function () {
        platform = "win32";
      });

      it("calls the escape function", function () {
        invoke();

        assert.ok(quoteShellArg.callCount, 1);
        assert.ok(
          quoteShellArg.calledWithExactly(
            { arg, env, platform, shell },
            { ...win, resolveExecutable: sinon.match.func }
          )
        );
      });
    });
  });
});
