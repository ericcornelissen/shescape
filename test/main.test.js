/**
 * @overview Contains unit tests for `./src/main.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import sinon from "sinon";

import { typeError } from "../src/constants.js";
import * as main from "../src/main.js";
import * as unix from "../src/unix.js";
import * as win from "../src/win.js";

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
  let getEscapeFunction;
  let getQuoteFunction;

  let escapeFunction;
  let quoteFunction;

  before(function () {
    getEscapeFunction = sinon.stub();
    getQuoteFunction = sinon.stub();

    escapeFunction = sinon.stub();
    quoteFunction = sinon.stub();
  });

  beforeEach(function () {
    sinon.reset();

    getEscapeFunction.returns(escapeFunction);
    getQuoteFunction.returns(quoteFunction);
  });

  let arg;
  let interpolation;
  let shellName;

  beforeEach(function () {
    arg = "arg";
    interpolation = false;
    shellName = "shell";
  });

  const invokeEscapeShellArg = () =>
    main.escapeShellArg(
      { arg, interpolation, shellName },
      { getEscapeFunction }
    );

  const invokeQuoteShellArg = () =>
    main.quoteShellArg(
      { arg, shellName },
      { getEscapeFunction, getQuoteFunction }
    );

  for (const functionName of ["escapeShellArg", "quoteShellArg"]) {
    describe(`::${functionName}, common behaviour`, function () {
      let invoke;

      before(function () {
        if (functionName == "escapeShellArg") {
          invoke = invokeEscapeShellArg;
        } else {
          invoke = invokeQuoteShellArg;
        }
      });

      it("uses the shell name to get the escape function", function () {
        shellName = "foobar";

        invoke();
        assert.equal(getEscapeFunction.callCount, 1);
        assert.ok(getEscapeFunction.alwaysCalledWithExactly(shellName));
      });

      describe("the argument to escape", function () {
        it("is escaped by the escape function", function () {
          for (const input of stringInputs) {
            arg = input;

            invoke();
            assert.ok(escapeFunction.calledWithExactly(input, sinon.match.any));
          }
        });

        it("is escaped if it's a boolean value", function () {
          for (const input of booleanInputs) {
            arg = input;

            invoke();
            assert.ok(
              escapeFunction.calledWithExactly(`${input}`, sinon.match.any)
            );
          }
        });

        it("is escaped if it's a numeric value", function () {
          for (const input of numericInputs) {
            arg = input;

            invoke();
            assert.ok(
              escapeFunction.calledWithExactly(`${input}`, sinon.match.any)
            );
          }
        });

        it("fails when it's an undefined value", function () {
          for (const input of undefinedValues) {
            arg = input;

            assert.throws(invoke, {
              name: "TypeError",
              message: typeError,
            });
          }
        });

        it("fails when it's not stringable", function () {
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
    });
  }

  describe("::escapeShellArg", function () {
    it("returns the value returned by the escape function", function () {
      const escapedArg = "foobar";

      escapeFunction.returns(escapedArg);

      const result = invokeEscapeShellArg();
      assert.equal(result, escapedArg);
    });

    it("uses the provided interpolation value when escaping", function () {
      for (const value of booleanInputs) {
        interpolation = value;

        invokeEscapeShellArg();
        assert.ok(escapeFunction.calledWithExactly(sinon.match.any, value));
      }
    });
  });

  describe("::quoteShellArg", function () {
    it("uses the shell name to get the quote function", function () {
      shellName = "foobar";

      invokeQuoteShellArg();
      assert.equal(getQuoteFunction.callCount, 1);
      assert.ok(getQuoteFunction.alwaysCalledWithExactly(shellName));
    });

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

    it("sets interpolation to false when escaping", function () {
      invokeQuoteShellArg();
      assert.ok(escapeFunction.calledWithExactly(sinon.match.any, false));
    });
  });

  describe("::getPlatformHelpers", function () {
    it("returns the windows module for 'win32'", function () {
      const result = main.getPlatformHelpers("win32");
      assert.deepStrictEqual(result, win);
    });

    it("returns the unix module for anything that is not 'win32'", function () {
      const result = main.getPlatformHelpers("linux");
      assert.deepStrictEqual(result, unix);
    });
  });
});
