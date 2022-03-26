/**
 * @overview Provides test examples for end-to-end testing Shescape.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const unixExamples = require("../unit/unix/_examples.cjs");
const winExamples = require("../unit/win/_examples.cjs");

module.exports.unixEscape = unixExamples.escape;
module.exports.winEscape = winExamples.escape;
