/**
 * @overview Contains end-to-end tests for `shescape.quote` (CJS).
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const test = require("ava");

const macros = require("../macros.cjs");

const { quote } = require("../../../index.cjs");

test(macros.quote, { quote });
