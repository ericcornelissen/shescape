/**
 * @overview Contains integration tests for the testing utilities provided with
 * Shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import { Shescape } from "shescape";
import {
  injectionStrings,
  Failscape,
  Stubscape,
  Throwscape,
} from "shescape/testing";

import { arbitrary } from "../_.js";

test("injection strings", (t) => {
  t.true(Array.isArray(injectionStrings));
  t.true(injectionStrings.length > 0);

  for (const injectionString of injectionStrings) {
    t.is(typeof injectionString, "string");
    t.true(injectionString.length > 0);
  }
});

testProp(
  "Failscape#escape",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const failscape = new Failscape(options);
    t.throws(() => failscape.escape(arg), {
      instanceOf: Error,
      message: "escape can't succeed",
    });
  },
);

testProp(
  "Failscape#escapeAll",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const failscape = new Failscape(options);
    t.throws(() => failscape.escapeAll(args), {
      instanceOf: Error,
      message: "escapeAll can't succeed",
    });
  },
);

testProp(
  "Failscape#quote",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const failscape = new Failscape(options);
    t.throws(() => failscape.quote(arg), {
      instanceOf: Error,
      message: "quote can't succeed",
    });
  },
);

testProp(
  "Failscape#quoteAll",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const failscape = new Failscape(options);
    t.throws(() => failscape.quoteAll(args), {
      instanceOf: Error,
      message: "quoteAll can't succeed",
    });
  },
);

testProp(
  "Stubscape#escape (stubscape =~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, stubResult, errored, stubErrored;

    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    const stubscape = new Stubscape(options);

    try {
      result = shescape.escape(arg);
    } catch {
      errored = true;
    }

    try {
      stubResult = stubscape.escape(arg);
    } catch {
      stubErrored = true;
    }

    t.is(errored, stubErrored);
    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "Stubscape#escapeAll (stubscape =~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let result, stubResult, errored, stubErrored;

    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    const stubscape = new Stubscape(options);

    try {
      result = shescape.escapeAll(args);
    } catch {
      errored = true;
    }

    try {
      stubResult = stubscape.escapeAll(args);
    } catch {
      stubErrored = true;
    }

    t.is(errored, stubErrored);
    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "Stubscape#quote, with shell (stubscape =~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, stubResult, errored, stubErrored;

    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    const stubscape = new Stubscape(options);

    try {
      result = shescape.quote(arg);
    } catch {
      errored = true;
    }

    try {
      stubResult = stubscape.quote(arg);
    } catch {
      stubErrored = true;
    }

    t.is(errored, stubErrored);
    t.is(typeof result, typeof stubResult);
  },
);

test("stubscape#quote with shell set to false", (t) => {
  const stubscape = new Stubscape({ shell: false });
  t.throws(
    () => {
      stubscape.quote("anything");
    },
    {
      message: "Shell may not be false",
    },
  );
});

testProp(
  "Stubscape#quoteAll, with shell (stubscape =~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let result, stubResult, errored, stubErrored;

    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    const stubscape = new Stubscape(options);

    try {
      result = shescape.quoteAll(args);
    } catch {
      errored = true;
    }

    try {
      stubResult = stubscape.quoteAll(args);
    } catch {
      stubErrored = true;
    }

    t.is(errored, stubErrored);
    t.is(typeof result, typeof stubResult);
  },
);

test("stubscape#quoteAll with shell set to false", (t) => {
  const stubscape = new Stubscape({ shell: false });
  t.throws(
    () => {
      stubscape.quoteAll(["any", "thing"]);
    },
    {
      message: "Shell may not be false",
    },
  );
});

testProp(
  "Throwscape#constructor",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    t.throws(() => new Throwscape(options), {
      instanceOf: Error,
      message: "Can't be instantiated",
    });
  },
);
