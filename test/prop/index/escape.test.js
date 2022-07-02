/**
 * @overview Contains property tests for the `escape` function of the Shescape
 * API.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import { escape } from "../../../index.js";

testProp(
  "return value",
  [fc.string(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const result = escape(arg, options);
    t.is(typeof result, "string");
  }
);
