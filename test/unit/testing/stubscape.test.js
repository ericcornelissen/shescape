/**
 * @overview Contains unit tests for the simple test stub of shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants } from "./_.js";

import { Stubscape } from "../../../testing.js";

testProp(
  "escape valid arguments",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const stubscape = new Stubscape(options);
    const result = stubscape.escape(arg);
    t.is(typeof result, "string");
  },
);

test("escape invalid arguments", (t) => {
  const stubscape = new Stubscape();
  for (const { value } of constants.illegalArguments) {
    t.throws(() => stubscape.escape(value), {
      instanceOf: TypeError,
      message:
        "Shescape requires strings or values that can be converted into a string using .toString()",
    });
  }
});

testProp(
  "escapeAll valid arguments",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const stubscape = new Stubscape(options);
    const result = stubscape.escapeAll(args);
    t.assert(Array.isArray(result));
    t.assert(result.every((arg) => typeof arg === "string"));
  },
);

testProp(
  "escapeAll non-array arguments",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const stubscape = new Stubscape(options);
    t.throws(() => stubscape.escapeAll(arg), {
      instanceOf: TypeError,
      message: "args.map is not a function",
    });
  },
);

test("escapeAll invalid arguments", (t) => {
  const stubscape = new Stubscape();
  for (const { value } of constants.illegalArguments) {
    t.throws(() => stubscape.escapeAll([value]), {
      instanceOf: TypeError,
      message:
        "Shescape requires strings or values that can be converted into a string using .toString()",
    });
  }
});

testProp(
  "quote valid arguments",
  [
    arbitrary.shescapeArg(),
    arbitrary.shescapeOptions().filter((options) => options?.shell !== false),
  ],
  (t, arg, options) => {
    const stubscape = new Stubscape(options);
    const result = stubscape.quote(arg);
    t.is(typeof result, "string");
  },
);

test("quote invalid arguments", (t) => {
  const stubscape = new Stubscape();
  for (const { value } of constants.illegalArguments) {
    t.throws(() => stubscape.quote(value), {
      instanceOf: TypeError,
      message:
        "Shescape requires strings or values that can be converted into a string using .toString()",
    });
  }
});

testProp(
  "quote without a shell",
  [
    arbitrary.shescapeArg(),
    arbitrary.shescapeOptions().filter((options) => options?.shell === false),
  ],
  (t, arg, options) => {
    const stubscape = new Stubscape(options);
    t.throws(() => stubscape.quote(arg), {
      instanceOf: Error,
    });
  },
);

testProp(
  "quoteAll valid arguments",
  [
    fc.array(arbitrary.shescapeArg()),
    arbitrary.shescapeOptions().filter((options) => options?.shell !== false),
  ],
  (t, args, options) => {
    const stubscape = new Stubscape(options);
    const result = stubscape.quoteAll(args);
    t.assert(Array.isArray(result));
    t.assert(result.every((arg) => typeof arg === "string"));
  },
);

testProp(
  "quoteAll non-array arguments",
  [
    arbitrary.shescapeArg(),
    arbitrary.shescapeOptions().filter((options) => options?.shell !== false),
  ],
  (t, arg, options) => {
    const stubscape = new Stubscape(options);
    t.throws(() => stubscape.quoteAll(arg), {
      instanceOf: TypeError,
    });
  },
);

test("quoteAll invalid arguments", (t) => {
  const stubscape = new Stubscape();
  for (const { value } of constants.illegalArguments) {
    t.throws(() => stubscape.quoteAll([value]), {
      instanceOf: TypeError,
      message:
        "Shescape requires strings or values that can be converted into a string using .toString()",
    });
  }
});

testProp(
  "quoteAll without a shell",
  [
    fc.array(arbitrary.shescapeArg(), { minLength: 1 }),
    arbitrary.shescapeOptions().filter((options) => options?.shell === false),
  ],
  (t, args, options) => {
    const stubscape = new Stubscape(options);
    t.throws(() => stubscape.quoteAll(args), {
      instanceOf: Error,
    });
  },
);
