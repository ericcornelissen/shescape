/**
 * @overview Echos back all arguments to standard out. Expects to be invoked as
 * `node echo.js arg1 arg2 ... argN`.
 * @license Unlicense
 */

import process from "node:process";

const stdout = process.argv
  // Slice off the "node" and "path/to/this/file.js" arguments as those
  // shouldn't be echoed.
  .slice(2)
  // Protect against arguments being `undefined`. On certain shells, if an
  // argument is an empty string it's `undefined`.
  ?.map((arg) => arg || "")
  // Reduce arguments to a single string to print all at once. This prevents
  // unexpected behaviour due to a partial output buffer being flushed.
  ?.reduce(
    (acc, arg, argIndex) => (argIndex === 0 ? arg : `${acc} ${arg}`),
    ""
  );

process.stdout.write(`${stdout}\n`);
