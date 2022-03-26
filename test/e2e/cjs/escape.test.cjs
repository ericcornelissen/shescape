/**
 * @overview Contains end-to-end tests for `shescape.escape` (CJS).
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const test = require("ava");

const macros = require("../_macros.cjs");

const { escape } = require("../../../index.cjs");

test(macros.escape, { escape });
test(macros.escape, { escape, interpolation: true });
test(macros.escape, { escape, interpolation: false });
