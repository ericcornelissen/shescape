/**
 * @overview Echos back the first argument (when invoked as `node echo.js`) to
 * standard out.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import process from "process";

const argToEcho = process.argv[2];

// Protect against `argToEcho` being undefined, which causes an error when
// writing to `process.stdout`. `argToEcho` will be undefined when using certain
// shells if you provide an empty string as argument.
const safeArgToEcho = argToEcho || "";

process.stdout.write(safeArgToEcho);
