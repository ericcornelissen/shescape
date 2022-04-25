/**
 * @overview Provides AVA test macros for `./src/platforms.js` unit tests.
 * @license Unlicense
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
    const { env, platform } = input;
    const result = platforms.getHelpersByPlatform({ env, platform });
    t.deepEqual(result, expected);
  },
  title(_, { input }) {
    const { env, platform } = input;
    if (env.OSTYPE) {
      return `platform helpers for ${env.OSTYPE}`;
    } else {
      return `platform helpers for ${platform}`;
    }
  },
});
