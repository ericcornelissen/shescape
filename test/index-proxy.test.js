/**
 * @overview Contains unit tests for `./src/index-proxy.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import sinon from "sinon";

import { resolveExecutable } from "../src/executables.js";

import * as proxy from "../src/index-proxy.js";

describe("index-proxy.js", function () {
  let escapeShellArg;
  let quoteShellArg;

  let getPlatformHelpers;
  let getEscapeFunction;
  let getQuoteFunction;
  let getShellName;

  before(function () {
    escapeShellArg = sinon.stub();
    quoteShellArg = sinon.stub();

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

  const invokeEscape = () =>
    proxy.escape(
      { arg, options, platform, process },
      { escapeShellArg, getPlatformHelpers }
    );

  const invokeQuote = () =>
    proxy.quote(
      { arg, options, platform, process },
      { getPlatformHelpers, quoteShellArg }
    );

  for (const functionName of ["escape", "quote"]) {
    describe(`::${functionName} (common behaviour)`, function () {
      let invoke;
      let escapeFn;

      before(function () {
        if (functionName == "escape") {
          invoke = invokeEscape;
          escapeFn = escapeShellArg;
        } else {
          invoke = invokeQuote;
          escapeFn = quoteShellArg;
        }
      });

      it("gets the helpers for the specified platform", function () {
        platform = "foobar";

        invoke();

        assert.ok(getPlatformHelpers.calledOnceWithExactly(platform));
      });

      describe("the escape function", function () {
        it("is called with the provided argument to escape", function () {
          arg = "Hello world!";

          invoke();

          assert.ok(
            escapeFn.calledOnceWithExactly(
              sinon.match({ arg }),
              sinon.match.any
            )
          );
        });

        it("is called with the shell name", function () {
          const shellName = "sh";

          getShellName.returns(shellName);

          invoke();

          assert.ok(
            escapeFn.calledOnceWithExactly(
              sinon.match({ shellName }),
              sinon.match.any
            )
          );
        });

        it("is called with the appropriate helpers", function () {
          invoke();

          assert.ok(
            escapeFn.calledOnceWithExactly(sinon.match.any, {
              getEscapeFunction,
              getQuoteFunction,
            })
          );
        });
      });

      describe("the getShellName function", function () {
        it("is called with the provided environment variables", function () {
          process.env = {
            foo: "bar",
            hello: "world!",
          };

          invoke();

          assert.ok(
            getShellName.calledOnceWithExactly(
              sinon.match({ env }),
              sinon.match.any
            )
          );
        });

        it("is called with the provided shell", function () {
          for (const value of ["bash", "cmd.exe", undefined]) {
            getShellName.resetHistory();

            options.shell = value;

            invoke();

            assert.ok(
              getShellName.calledOnceWithExactly(
                sinon.match({ shell: value }),
                sinon.match.any
              )
            );
          }
        });

        it("is called with the appropriate helpers", function () {
          invoke();

          assert.ok(
            getShellName.calledOnceWithExactly(sinon.match.any, {
              resolveExecutable,
            })
          );
        });
      });
    });
  }

  describe("::escape", function () {
    it("defaults to interpolation=false if not specified", function () {
      delete options.interpolation;

      invokeEscape();

      assert.ok(
        escapeShellArg.calledOnceWithExactly(
          sinon.match({ interpolation: false }),
          sinon.match.any
        )
      );
    });

    it("interpolation value", function () {
      for (const value of [true, false]) {
        escapeShellArg.resetHistory();

        options.interpolation = value;

        invokeEscape();

        assert.ok(
          escapeShellArg.calledOnceWithExactly(
            sinon.match({ interpolation: value }),
            sinon.match.any
          )
        );
      }
    });
  });

  describe("::quote", function () {
    it("always sets interpolation to false", function () {
      for (const value of [true, false, undefined]) {
        quoteShellArg.resetHistory();

        options.interpolation = value;

        invokeQuote();

        assert.ok(
          quoteShellArg.calledOnceWithExactly(
            sinon.match({ interpolation: false }),
            sinon.match.any
          )
        );
      }
    });
  });
});
