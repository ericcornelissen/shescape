/**
 * @overview Provides custom fast-check arbitraries for property testing the
 * `./src/unix.js` module.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fc from "fast-check";

import { binBash, binDash, binZsh } from "../../common.cjs";

const supportedShells = [binBash, binDash, binZsh];

/**
 * The notUnixShell arbitrary generates strings that are not Unix shells
 * supported by Shescape.
 */
export const notUnixShell = () =>
  fc.asciiString().filter((v) => !supportedShells.includes(v));

/**
 * The unixPath arbitrary generates absolute Unix file/folder paths.
 */
export const unixPath = () => fc.string().map((path) => `/${path}`);

/**
 * The unixShells arbitrary generates Unix shells supported by Shescape.
 */
export const unixShell = () => fc.constantFrom(...supportedShells);

export * from "../arbitraries.js";
