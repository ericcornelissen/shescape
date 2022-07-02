/**
 * @overview Contains property tests for the `quote` function of the Shescape
 * API.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import { quote } from "../../../index.js";

testProp(
  "return value",
  [fc.string(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const result = quote(arg, options);
    t.is(typeof result, "string");
    t.regex(result, /^(?<q>"|').*(\k<q>)$/);
  }
);
