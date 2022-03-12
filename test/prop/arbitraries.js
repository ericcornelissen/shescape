/**
 * @overview Contains custom fast-check arbitraries for property tests.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fc from "fast-check";

/**
 * The env arbitrary generates objects modelled after `process.env`.
 *
 * For a description of `process.env`, see:
 * https://nodejs.org/api/process.html#processenv
 */
export const env = () =>
  fc.object({
    key: fc.oneof(fc.constant("ComSpec"), fc.string()),
    values: [fc.string()],
    maxDepth: 0,
  });
