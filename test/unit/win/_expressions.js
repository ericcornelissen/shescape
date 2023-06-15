/**
 * @overview Provides regular expression for Windows unit tests.
 * @license MIT
 */

import { binCmd, binPowerShell } from "../../_constants.cjs";

export const flag = {
  [binCmd]: {
    flag: /^(?:-+|\/+)$/u,
    nonFlag: /^[^-/]/u,
  },
  [binPowerShell]: {
    flag: /^(?:`?-+|\/+)$/u,
    nonFlag: /^([^-/`]|[^-/][^-])/u,
  },
};
