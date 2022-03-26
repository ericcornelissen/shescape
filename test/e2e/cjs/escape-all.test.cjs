/**
 * @overview Contains end-to-end tests for `shescape.escapeAll` (CJS).
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const test = require("ava");

const macros = require("../_macros.cjs");

const { escapeAll } = require("../../../index.cjs");

test(macros.escapeAll, { escapeAll });
test(macros.escapeAll, { escapeAll, interpolation: true });
test(macros.escapeAll, { escapeAll, interpolation: false });
