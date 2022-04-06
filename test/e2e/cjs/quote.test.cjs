/**
 * @overview Contains end-to-end tests for `shescape.quote` (CJS).
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const test = require("ava");

const { macros } = require("./_.cjs");

const { quote } = require("../../../index.cjs");

test(macros.quote, { quote });

test(macros.prototypePollution, (_, payload) => quote("a", payload));
