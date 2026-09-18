/**
 * @overview Provides functionality to compose escaping, quoting, and flag
 * protection functions.
 * @license MPL-2.0
 */

/**
 * Compose escape, flag protection, and quoting functions to create a function
 * to be used for escaping shell arguments.
 *
 * If no `flagFn` or `quoteFn` is provided the respective functionality is
 * omitted from the resulting function.
 *
 * @param {object} fns The functions to compose.
 * @param {function(string): string} fns.escapeFn An argument escaper.
 * @param {function(string): string[]} [fns.flagFn] The flag-based splitter.
 * @param {function(string): string} [fns.quoteFn] An argument quoter.
 * @returns {function(string): string} A function to escape shell arguments.
 */
export function compose({ escapeFn, flagFn, quoteFn }) {
  const escape = quoteFn
    ? (arg) => quoteFn(escapeFn(arg))
    : (arg) => escapeFn(arg);

  if (!flagFn) {
    return escape;
  }

  return (arg) => {
    const fragments = flagFn(arg);

    let idx = 0;
    for (; idx < fragments.length - 2; idx += 2) {
      const escapedFragment = escapeFn(fragments[idx]);
      if (escapedFragment !== "") {
        break;
      }
    }

    arg = fragments.slice(idx).join("");
    return escape(arg);
  };
}
