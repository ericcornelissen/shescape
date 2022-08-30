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
  const getDefaultShell = sinon.stub();
  const getEscapeFunction = sinon.stub();
  const getShellName = sinon.stub();

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
    getDefaultShell,
    getEscapeFunction,
    getShellName,

    escapeFunction,
  };
}

/**
 * The setup function for `./src/main.js::quoteShellArg`.
 *
 * @param {object} t The AVA test object.
 */
export function mainQuoteShellArg(t) {
  const getDefaultShell = sinon.stub();
  const getEscapeFunction = sinon.stub();
  const getQuoteFunction = sinon.stub();
  const getShellName = sinon.stub();

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
    getDefaultShell,
    getEscapeFunction,
    getQuoteFunction,
    getShellName,

    escapeFunction,
    quoteFunction,
  };
}
