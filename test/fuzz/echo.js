/**
 * @overview Echos back the first argument (when invoked as `node echo.js`) to
 * standard out.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const argToEcho = process.argv[2];
process.stdout.write(argToEcho);
