/**
 * @overview Provides regular expression for Unix unit tests.
 * @license MIT
 */

import { binBash, binCsh, binDash, binZsh } from "../../_constants.cjs";

export const flag = {
  [binBash]: {
    flag: /^-+$/u,
    nonFlag: /^[^-]/u,
  },
  [binCsh]: {
    flag: /^-+$/u,
    nonFlag: /^[^-]/u,
  },
  [binDash]: {
    flag: /^-+$/u,
    nonFlag: /^[^-]/u,
  },
  [binZsh]: {
    flag: /^-+$/u,
    nonFlag: /^[^-]/u,
  },
};
