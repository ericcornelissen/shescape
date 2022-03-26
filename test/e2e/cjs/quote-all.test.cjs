/**
 * @overview Contains end-to-end tests for `shescape.quoteAll` (CJS).
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const test = require("ava");

const macros = require("../_macros.cjs");

const { quoteAll } = require("../../../index.cjs");

test(macros.quoteAll, { quoteAll });
