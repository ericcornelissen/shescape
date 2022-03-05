/**
 * @overview Contains unit tests for `./src/main.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import sinon from "sinon";

import { resolveExecutable } from "../src/executables.js";
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
  let getEscapeFunction;
  let getQuoteFunction;
  let getShellName;

  let escapeFunction;
  let quoteFunction;

  before(function () {
    getEscapeFunction = sinon.stub();
    getQuoteFunction = sinon.stub();
    getShellName = sinon.stub();

    escapeFunction = sinon.stub();
    quoteFunction = sinon.stub();
  });

  beforeEach(function () {
    sinon.reset();

    getEscapeFunction.returns(escapeFunction);
    getQuoteFunction.returns(quoteFunction);
  });

  let arg;
  let options, interpolation, shell;
  let process, env;

  beforeEach(function () {
    arg = "arg";
    env = { foo: "bar" };
    interpolation = false;
    shell = "shell";

    options = { interpolation, shell };
    process = { env };
  });

  const invokeEscapeShellArg = () =>
    main.escapeShellArg(
      { arg, options, process },
      { getEscapeFunction, getShellName }
    );

  const invokeQuoteShellArg = () =>
    main.quoteShellArg(
      { arg, options, process },
      { getEscapeFunction, getShellName, getQuoteFunction }
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
        const shellName = "foobar";
        getShellName.returns(shellName);

        invoke();

        assert.equal(getEscapeFunction.callCount, 1);
        assert.ok(getEscapeFunction.alwaysCalledWithExactly(shellName));
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

        for (const value of ["bash", "cmd.exe", undefined]) {
          it(`is called with the provided shell, ${value}`, function () {
            options.shell = value;

            invoke();

            assert.ok(
              getShellName.calledOnceWithExactly(
                sinon.match({ shell: value }),
                sinon.match.any
              )
            );
          });
        }

        it("is called with the appropriate helpers", function () {
          invoke();

          assert.ok(
            getShellName.calledOnceWithExactly(sinon.match.any, {
              resolveExecutable,
            })
          );
        });
      });

      describe("the argument to escape", function () {
        const typeError =
          "Shescape requires strings or values that can be converted into a string using .toString()";

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

    it("uses interpolation=false when escaping by default", function () {
      delete options.interpolation;

      invokeEscapeShellArg();
      assert.ok(escapeFunction.calledWithExactly(sinon.match.any, false));
    });

    for (const value of booleanInputs) {
      it(`uses the provided interpolation value (${value}) when escaping`, function () {
        options.interpolation = value;

        invokeEscapeShellArg();
        assert.ok(escapeFunction.calledWithExactly(sinon.match.any, value));
      });
    }
  });

  describe("::quoteShellArg", function () {
    it("uses the shell name to get the quote function", function () {
      const shellName = "foobar";
      getShellName.returns(shellName);

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

    for (const value of booleanInputs) {
      it(`ignores a provided interpolation value (${value}) when escaping`, function () {
        options.interpolation = value;

        invokeQuoteShellArg();
        assert.ok(escapeFunction.calledWithExactly(sinon.match.any, false));
      });
    }
  });
});
