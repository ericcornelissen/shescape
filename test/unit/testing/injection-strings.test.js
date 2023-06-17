/**
 * @overview Contains unit tests for the injection strings test helper.
 * @license MIT
 */

import test from "ava";

import { injectionStrings } from "../../../testing.js";

test("types", (t) => {
  for (const injectionString of injectionStrings) {
    t.is(typeof injectionString, "string");
  }
});
