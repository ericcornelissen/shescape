/**
 * @overview Contains unit tests for the throwing test stub of shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";

import { arbitrary } from "./_.js";

import { Throwscape } from "../../../testing.js";

testProp("throws", [arbitrary.shescapeOptions()], (t, options) => {
  t.throws(() => new Throwscape(options), {
    instanceOf: Error,
    message: "Can't be instantiated",
  });
});
