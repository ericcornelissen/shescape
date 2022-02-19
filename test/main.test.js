/**
 * @overview Contains unit tests for `./src/main.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import sinon from "sinon";

import { binBash, binCmd } from "./common.js";

import { typeError } from "../src/constants.js";
import * as main from "../src/main.js";

const booleanInputs = [true, false];
const noToStringObject = { toString: null };
const toStringNotStringObject = { toString: () => null };
const numericInputs = [42, 3.14];
const stringInputs = [
  "Hello world!",
  'foo "bar"',
  "foo 'bar'",
  "Lorem'ipsum",
  "dead$beef",
];
const undefinedValues = [undefined, null];

describe("main.js", function () {
  let getBasename;
  let getDefaultShell;
  let getEscapeFunction;
  let getQuoteFunction;
  let resolveExecutable;

  let escapeFunction;
  let quoteFunction;

  before(function () {
    getBasename = sinon.stub();
    getDefaultShell = sinon.stub();
    getEscapeFunction = sinon.stub();
    getQuoteFunction = sinon.stub();
    resolveExecutable = sinon.stub();

    escapeFunction = sinon.stub();
    quoteFunction = sinon.stub();
  });

  beforeEach(function () {
    sinon.reset();

    getEscapeFunction.returns(escapeFunction);
    getQuoteFunction.returns(quoteFunction);
  });

  let arg;
  let env;
  let interpolation;
  let platform;
  let shell;

  beforeEach(function () {
    arg = "arg";
    env = { foo: "bar" };
    interpolation = false;
    platform = "platform";
    shell = "shell";
  });

  const invokeEscapeShellArg = () =>
    main.escapeShellArg(
      { arg, env, interpolation, platform, shell },
      { getBasename, getDefaultShell, getEscapeFunction, resolveExecutable }
    );

  const invokeQuoteShellArg = () =>
    main.quoteShellArg(
      { arg, env, interpolation, platform, shell },
      {
        getBasename,
        getDefaultShell,
        getEscapeFunction,
        getQuoteFunction,
        resolveExecutable,
      }
    );

  const invokeMap = {
    escapeShellArg: invokeEscapeShellArg,
    quoteShellArg: invokeQuoteShellArg,
  };

  for (const testName of ["escapeShellArg", "quoteShellArg"]) {
    const invoke = invokeMap[testName];

    describe(`::${testName}, common behaviour`, function () {
      describe("the argument to escape", function () {
        it("is escaped by the escape function", function () {
          for (const input of stringInputs) {
            arg = input;

            invoke();
            assert.ok(escapeFunction.calledWithExactly(input, sinon.match.any));
          }
        });

        it("is escape if it's a boolean value", function () {
          for (const input of booleanInputs) {
            arg = input;

            invoke();
            assert.ok(
              escapeFunction.calledWithExactly(`${input}`, sinon.match.any)
            );
          }
        });

        it("is escape if it's a numeric value", function () {
          for (const input of numericInputs) {
            arg = input;

            invoke();
            assert.ok(
              escapeFunction.calledWithExactly(`${input}`, sinon.match.any)
            );
          }
        });

        it("is not escaped if it's an undefined value", function () {
          for (const input of undefinedValues) {
            arg = input;

            assert.throws(invoke, {
              name: "TypeError",
              message: typeError,
            });
          }
        });

        it("is not escaped if it's not stringable", function () {
          arg = noToStringObject;

          assert.throws(invoke, {
            name: "TypeError",
            message: typeError,
          });
        });

        it(`fails when toString does not return a string`, function () {
          arg = toStringNotStringObject;

          assert.throws(invoke, {
            name: "TypeError",
            message: typeError,
          });
        });
      });

      describe("the shell arguments", function () {
        const resolvedShell = "foobar";

        beforeEach(function () {
          resolveExecutable.returns(resolvedShell);
        });

        it("is resolved when provided", function () {
          shell = "foobaz";

          invoke();
          assert.equal(resolveExecutable.callCount, 1);
          assert.ok(
            resolveExecutable.calledWithExactly(
              { executable: shell },
              sinon.match.any
            )
          );
        });

        it("is not replaced by a default shell when provided", function () {
          shell = "foobar";

          invoke();
          assert.equal(getDefaultShell.callCount, 0);
        });

        it("is replaced by the default shell when omitted", function () {
          shell = undefined;
          const defaultShell = "foobaz";

          getDefaultShell.returns(defaultShell);

          invoke();
          assert.equal(getDefaultShell.callCount, 1);
          assert.ok(getDefaultShell.calledWithExactly(env));

          assert.equal(resolveExecutable.callCount, 1);
          assert.ok(
            resolveExecutable.calledWithExactly(
              { executable: defaultShell },
              sinon.match.any
            )
          );
        });

        it("is resolved with the appropriate dependencies", function () {
          invoke();
          assert.equal(resolveExecutable.callCount, 1);
          assert.ok(
            resolveExecutable.calledWithExactly(sinon.match.any, {
              exists: sinon.match.func,
              readlink: sinon.match.func,
              which: sinon.match.func,
            })
          );
        });

        it("is passed to getBasename after being resolved", function () {
          shell = "Hello world!";
          assert.notEqual(shell, resolvedShell);

          invoke();
          assert.ok(getBasename.calledWithExactly(resolvedShell));
        });
      });

      describe("the interpolation argument", function () {
        it("is used when set explicitly", function () {
          for (const value of booleanInputs) {
            interpolation = value;

            invoke();
            assert.ok(escapeFunction.calledWithExactly(sinon.match.any, value));
          }
        });

        it("has a fallback when omitted", function () {
          interpolation = undefined;

          invoke();
          assert.ok(escapeFunction.calledWithExactly(sinon.match.any, false));
        });
      });

      describe("the selected shell", function () {
        it("is supported", function () {
          const shellName = "foobar";

          getBasename.returns(shellName);

          invoke();
          assert.equal(getEscapeFunction.callCount, 2);
          assert.ok(getEscapeFunction.alwaysCalledWithExactly(shellName));
        });

        describe("is not supported", function () {
          beforeEach(function () {
            getEscapeFunction.onCall(0).returns(null);
            getEscapeFunction.onCall(1).returns(escapeFunction);
          });

          it(`uses '${binCmd}' as fallback on Windows`, function () {
            platform = "win32";

            invoke();
            assert.ok(getEscapeFunction.calledWithExactly(binCmd));
          });

          it(`uses '${binBash}' as fallback on not-Windows`, function () {
            platform = "unix";

            invoke();
            assert.ok(getEscapeFunction.calledWithExactly(binBash));
          });
        });
      });
    });
  }

  describe("::escapeShellArg", function () {
    it("returns the value returned by the escape function", function () {
      const escapedArg = "foobar";

      escapeFunction.returns(escapedArg);

      const result = invokeEscapeShellArg();
      assert.equal(result, escapedArg);
    });
  });

  describe("::quoteShellArg", function () {
    it("returns the value returned by the quote function", function () {
      const quotedArg = "foobar";

      quoteFunction.returns(quotedArg);

      const result = invokeQuoteShellArg();
      assert.equal(result, quotedArg);
    });

    it("calls the quote function with the escaped argument", function () {
      const escapedArg = "foobar";

      escapeFunction.returns(escapedArg);

      invokeQuoteShellArg();
      assert.ok(quoteFunction.calledWithExactly(escapedArg));
    });
  });
});
