/**
 * @overview Provides reusable AVA setup (before/beforeEach) functions.
 * @license Unlicense
 */

import sinon from "sinon";

/**
 * The setup function for `./src/main.js::escapeShellArg`.
 *
 * @param {object} t The AVA test object.
 */
export function mainEscapeShellArg(t) {
  const getBasename = sinon.stub();
  const getDefaultShell = sinon.stub();
  const getEscapeFunction = sinon.stub();
  const getFallbackShell = sinon.stub();

  const escapeFunction = sinon.stub();

  getEscapeFunction.returns(escapeFunction);

  t.context.args = {
    arg: "a",
    options: {
      shell: "b",
    },
    process: {
      env: {},
    },
  };
  t.context.deps = {
    getBasename,
    getDefaultShell,
    getEscapeFunction,
    getFallbackShell,

    escapeFunction,
  };
}

/**
 * The setup function for `./src/main.js::quoteShellArg`.
 *
 * @param {object} t The AVA test object.
 */
export function mainQuoteShellArg(t) {
  const getBasename = sinon.stub();
  const getDefaultShell = sinon.stub();
  const getEscapeFunction = sinon.stub();
  const getFallbackShell = sinon.stub();
  const getQuoteFunction = sinon.stub();

  const escapeFunction = sinon.stub();
  const quoteFunction = sinon.stub();

  getEscapeFunction.returns(escapeFunction);
  getQuoteFunction.returns(quoteFunction);

  t.context.args = {
    arg: "a",
    options: {
      shell: "b",
    },
    process: {
      env: {},
    },
  };
  t.context.deps = {
    getBasename,
    getDefaultShell,
    getEscapeFunction,
    getFallbackShell,
    getQuoteFunction,

    escapeFunction,
    quoteFunction,
  };
}
