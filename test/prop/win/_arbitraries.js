/**
 * @overview Provides custom fast-check arbitraries for property testing the
 * `./src/win.js` module.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fc from "fast-check";

import { binCmd, binPowerShell } from "../../common.cjs";

const supportedShells = [binCmd, binPowerShell];

/**
 * The notWinShell arbitrary generates strings that are not Windows shells
 * supported by Shescape.
 */
export const notWinShell = () =>
  fc.asciiString().filter((v) => !supportedShells.includes(v));

/**
 * The winPath arbitrary generates absolute Windows file/folder paths.
 */
export const winPath = () =>
  fc
    .tuple(
      fc.char().filter((v) => /[A-Z]/.test(v)),
      fc.string()
    )
    .map(([driveLetter, path]) => `${driveLetter}:\\${path}`);

/**
 * The winShell arbitrary generates Windows shells supported by Shescape.
 */
export const winShell = () => fc.constantFrom(...supportedShells);

export * from "../arbitraries.js";
