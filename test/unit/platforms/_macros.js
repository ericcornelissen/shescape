/**
 * @overview Provides AVA test macros for `./src/platforms.js` unit tests.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import * as platforms from "../../../src/platforms.js";

/**
 * The platformHelpers macro tests whats helpers returned for a given platform.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.expected The expected platform helpers.
 * @param {Object} args.input The input arguments.
 * @param {string} args.input.platform A `os.platform()` value.
 * @param {Object} args.input.process A `process` values.
 */
export const platformHelpers = test.macro({
  exec(t, { expected, input }) {
    const { platform, process } = input;
    const result = platforms.getHelpersByPlatform({ platform, process });
    t.deepEqual(result, expected);
  },
  title(_, { input }) {
    const { platform, process } = input;
    if (process.env.OSTYPE) {
      return `platform helpers for ${process.env.OSTYPE}`;
    } else {
      return `platform helpers for ${platform}`;
    }
  },
});
