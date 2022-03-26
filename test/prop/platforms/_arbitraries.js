/**
 * @overview Provides custom fast-check arbitraries for property testing the
 * `./src/platforms.js` module.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fc from "fast-check";

import { ostypeCygwin, ostypeMsys } from "../../common.cjs";

/**
 * The osType arbitrary generates known OS types.
 */
export const osType = () =>
  fc.constantFrom(undefined, ostypeCygwin, ostypeMsys);

export * from "../arbitraries.js";
