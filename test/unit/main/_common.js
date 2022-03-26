/**
 * @overview Provides common functionality for `./src/main.js` unit tests.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import sinon from "sinon";

/**
 * Adds a minimum `args` object for the `./src/main.js` API to the AVA context.
 *
 * @param {Object} t The AVA test object.
 * @param {Object} t.context The AVA test context.
 */
export function setupArgs(t) {
  t.context.args = {
    arg: "a",
    options: {
      shell: "b",
    },
    process: {
      env: {},
    },
  };
}

/**
 * Adds Sinon stubs for the `deps` object for the `./src/main.js` API to the AVA
 * context.
 *
 * @param {Object} t The AVA test object.
 * @param {Object} t.context The AVA test context.
 */
export function setupStubs(t) {
  const getDefaultShell = sinon.stub();
  const getEscapeFunction = sinon.stub();
  const getQuoteFunction = sinon.stub();
  const getShellName = sinon.stub();

  const escapeFunction = sinon.stub();
  const quoteFunction = sinon.stub();

  getEscapeFunction.returns(escapeFunction);
  getQuoteFunction.returns(quoteFunction);

  t.context.deps = {
    getDefaultShell,
    getEscapeFunction,
    getQuoteFunction,
    getShellName,

    escapeFunction,
    quoteFunction,
  };
}
