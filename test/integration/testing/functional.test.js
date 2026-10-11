/**
 * @overview Contains integration tests for the testing utilities provided with
 * Shescape.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";

import { Shescape } from "shescape";
import {
  Failscape,
  injectionStrings,
  Stubscape,
  Throwscape,
} from "shescape/testing";

import { arbitrary, constants } from "../_.js";

suite("testing", () => {
  test("injection strings", () => {
    assert.ok(Array.isArray(injectionStrings));
    assert.ok(injectionStrings.length > 0);

    for (const injectionString of injectionStrings) {
      assert.equal(typeof injectionString, "string");
      assert.ok(injectionString.length > 0);
    }
  });

  suite("Failscape", () => {
    test("escape", () => {
      fc.assert(
        fc.property(
          fc.anything(),
          arbitrary.shescapeOptions(),
          (arg, options) => {
            const failscape = new Failscape(options);
            assert.throws(
              () => {
                failscape.escape(arg);
              },
              {
                name: "Error",
                message: "escape can't succeed",
              },
            );
          },
        ),
      );
    });

    test("escapeAll", () => {
      fc.assert(
        fc.property(
          fc.anything(),
          arbitrary.shescapeOptions(),
          (args, options) => {
            const failscape = new Failscape(options);
            assert.throws(
              () => {
                failscape.escapeAll(args);
              },
              {
                name: "Error",
                message: "escapeAll can't succeed",
              },
            );
          },
        ),
      );
    });

    test("quote", () => {
      fc.assert(
        fc.property(
          fc.anything(),
          arbitrary.shescapeOptions(),
          (args, options) => {
            const failscape = new Failscape(options);
            assert.throws(
              () => {
                failscape.quote(args);
              },
              {
                name: "Error",
                message: "quote can't succeed",
              },
            );
          },
        ),
      );
    });

    test("quoteAll", () => {
      fc.assert(
        fc.property(
          fc.anything(),
          arbitrary.shescapeOptions(),
          (args, options) => {
            const failscape = new Failscape(options);
            assert.throws(
              () => {
                failscape.quoteAll(args);
              },
              {
                name: "Error",
                message: "quoteAll can't succeed",
              },
            );
          },
        ),
      );
    });
  });

  suite("Stubscape", () => {
    test("escape", () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.anything(),
            fc.constantFrom(
              ...constants.illegalArguments.map((arg) => arg.value),
            ),
          ),
          arbitrary.shescapeOptions(),
          (arg, options) => {
            let result, stubResult, errored, stubErrored;

            let shescape;
            try {
              shescape = new Shescape(options);
            } catch {
              return;
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

            assert.equal(errored, stubErrored);
            assert.equal(typeof result, typeof stubResult);
          },
        ),
      );
    });

    test("escapeAll", () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.anything(),
            fc.constantFrom(
              ...constants.illegalArgumentLists.map((args) => args.value),
            ),
          ),
          arbitrary.shescapeOptions(),
          (args, options) => {
            let result, stubResult, errored, stubErrored;

            let shescape;
            try {
              shescape = new Shescape(options);
            } catch {
              return;
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

            assert.equal(errored, stubErrored);
            assert.equal(typeof result, typeof stubResult);
          },
        ),
      );
    });

    test("quote, with shell", () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.anything(),
            fc.constantFrom(
              ...constants.illegalArguments.map((arg) => arg.value),
            ),
          ),
          arbitrary.shescapeOptions(),
          (arg, options) => {
            let result, stubResult, errored, stubErrored;

            let shescape;
            try {
              shescape = new Shescape(options);
            } catch {
              return;
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

            assert.equal(errored, stubErrored);
            assert.equal(typeof result, typeof stubResult);
          },
        ),
      );
    });

    test("quote, without shell", () => {
      const stubscape = new Stubscape({ shell: false });
      assert.throws(
        () => {
          stubscape.quote("anything");
        },
        {
          name: "Error",
          message: "Shell may not be false",
        },
      );
    });

    test("quoteAll, with shell", () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.anything(),
            fc.constantFrom(
              ...constants.illegalArgumentLists.map((args) => args.value),
            ),
          ),
          arbitrary.shescapeOptions(),
          (args, options) => {
            let result, stubResult, errored, stubErrored;

            let shescape;
            try {
              shescape = new Shescape(options);
            } catch {
              return;
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

            assert.equal(errored, stubErrored);
            assert.equal(typeof result, typeof stubResult);
          },
        ),
      );
    });

    test("quoteAll, without shell", () => {
      const stubscape = new Stubscape({ shell: false });
      assert.throws(
        () => {
          stubscape.quoteAll(["any", "thing"]);
        },
        {
          name: "Error",
          message: "Shell may not be false",
        },
      );
    });
  });

  test("Throwscape", () => {
    fc.assert(
      fc.property(arbitrary.shescapeOptions(), (options) => {
        assert.throws(
          () => {
            new Throwscape(options); // eslint-disable-line no-new
          },
          {
            name: "Error",
            message: "Can't be instantiated",
          },
        );
      }),
    );
  });
});
