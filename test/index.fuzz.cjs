/**
 * @overview Contains fuzz tests for Shescape.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const cp = require("child_process");
const shescape = require("../index.cjs");

function prepareArgForPrintf(arg) {
  let result = arg
    .replace(/[\n\r]+/g, " ") // avoid dealing with newlines
    .replace(/^(\u{0}*)(-\u{0}*)+/gu, "$1") // avoid dealing with leading "-"
    .replace(/(?<!%)(%%)*%(?!%)/g, "%%%%") // avoid dealing with printf formatting
    .replace(/(?<![^\\](\\\\)*\\)\\(\u{0}*[0-9]){1,3}/gu, " "); // avoid dealing with "\NNN"

  if (result === arg) {
    return result;
  } else {
    return prepareArgForPrintf(result);
  }
}

function getExpectedPrintfString(arg) {
  return arg
    .replace(/\u{0}/gu, "") // Remove null characters
    .replace(/(?<!(^|[^\\])(\\\\)*\\)\\a/g, String.fromCharCode(7)) // Replace "\a  alert (BEL)"
    .replace(/(?<!(^|[^\\])(\\\\)*\\)\\b/g, String.fromCharCode(8)) // Replace "\b  backspace"
    .replace(/(?<!(^|[^\\])(\\\\)*\\)\\e/g, String.fromCharCode(27)) // Replace "\e  escape"
    .replace(/(?<!(^|[^\\])(\\\\)*\\)\\f/g, String.fromCharCode(12)) // Replace "\f  form feed"
    .replace(/(?<!(^|[^\\])(\\\\)*\\)\\n/g, String.fromCharCode(10)) // Replace "\n  new return"
    .replace(/(?<!(^|[^\\])(\\\\)*\\)\\r/g, String.fromCharCode(13)) // Replace "\r  carriage return"
    .replace(/(?<!(^|[^\\])(\\\\)*\\)\\t/g, String.fromCharCode(9)) // Replace "\t  horizontal tab"
    .replace(/(?<!(^|[^\\])(\\\\)*\\)\\v/g, String.fromCharCode(11)) // Replace "\v  vertical tab"
    .replace(/\\\\/g, "\\") // Unescape \
    .replace(/%%/g, "%"); // Unescape %
}

function checkIfAnyApiFunctionThrows(arg) {
  shescape.escape(arg);
  shescape.quote(arg);

  if (arg.length > 2) {
    const middle = Math.floor(arg.length / 2);
    const args = [arg.slice(0, middle), arg.slice(middle, arg.length)];
    shescape.escapeAll(args);
    shescape.quoteAll(args);
  }
}

function checkQuotesAndEscapesCorrectly(arg) {
  const preparedArg = prepareArgForPrintf(arg);
  const quotedArg = shescape.quote(preparedArg);
  const result = cp.execSync(`printf ${quotedArg}`).toString();
  const expected = getExpectedPrintfString(preparedArg);
  if (expected !== result) {
    throw new Error(
      "Unexpected output (- got, + expected):\n" +
        `- ${result}\n` +
        `+ ${expected}`
    );
  }
}

function fuzz(buf) {
  const arg = buf.toString().trim();
  checkIfAnyApiFunctionThrows(arg);
  checkQuotesAndEscapesCorrectly(arg);
}

module.exports = { fuzz };
