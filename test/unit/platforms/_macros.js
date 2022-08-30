/**
 * @overview Provides AVA test macros for `./src/platforms.js` unit tests.
 * @license Unlicense
 */

import test from "ava";

import * as platforms from "../../../src/platforms.js";

/**
 * The platformHelpers macro tests whats helpers returned for a given platform.
 *
 * @param {object} args The arguments for this macro.
 * @param {object} args.expected The expected platform helpers.
 * @param {object} args.input The input arguments.
 * @param {string} args.input.platform A `os.platform()` value.
 * @param {object} args.input.process A `process` values.
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
