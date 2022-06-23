/**
 * @overview Echos back all arguments to standard out. Expects to be invoked as
 * `node echo.js arg1 arg2 ... argN`.
 * @license Unlicense
 */

import process from "node:process";

if (process.argv.length > 2) {
  const stdout = process.argv
    // Slice of the "node" and "path/to/this-file.js" arguments as those
    // shouldn't be echoed.
    .slice(2)
    // Reduce arguments to a single string to print all at once. This prevents
    // potential problems due to a partial completed output buffer being flushed.
    .reduce((previousValue, currentValue, currentIndex) => {
      if (currentIndex === 0) {
        return currentValue;
      } else {
        return `${previousValue} ${currentValue}`;
      }
    });

  process.stdout.write(stdout);
}
