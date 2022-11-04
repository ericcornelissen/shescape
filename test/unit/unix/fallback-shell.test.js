/**
 * @overview Contains unit tests for the fallback shell on Unix systems.
 * @license Unlicense
 */

import test from "ava";

import { constants } from "./_.js";

import { getFallbackShell } from "../../../src/unix.js";

test("the fallback shell", (t) => {
  const result = getFallbackShell();
  t.is(result, constants.binBash);
});
