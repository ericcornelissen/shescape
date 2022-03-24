/**
 * @overview Contains custom fast-check arbitraries for property testing the
 * `./src/win.js` module.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fc from "fast-check";

import { binCmd, binPowerShell } from "../../common.js";

const supportedWinShells = [binCmd, binPowerShell];

/**
 * The notWinShell arbitrary generates arbitrary strings that are not Windows
 * shells supported by Shescape.
 */
export const notWinShell = () =>
  fc.asciiString().filter((v) => !supportedWinShells.includes(v));

/**
 * The winPath arbitrary generates arbitrary absolute Windows file/folder paths.
 */
export const winPath = () =>
  fc
    .tuple(
      fc.char().filter((v) => /[A-Z]/.test(v)),
      fc.string()
    )
    .map(([driveLetter, path]) => `${driveLetter}:\\${path}`);

/**
 * The winShell arbitrary generates arbitrary Windows shells supported by
 * Shescape.
 */
export const winShell = () => fc.constantFrom(...supportedWinShells);

export * from "../arbitraries.js";
