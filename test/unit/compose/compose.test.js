/**
 * @overview Contains unit tests for the functionality to compose escape
 * functions.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";
import * as sinon from "sinon";

import { compose } from "../../../src/internal/compose.js";

suite("compose.js", () => {
  test("escapeFn only", () => {
    fc.assert(
      fc.property(
        fc.record({
          input: fc.string(),
          escapeResult: fc.string(),
        }),
        ({ input, escapeResult }) => {
          const escapeFn = sinon.stub();
          escapeFn.returns(escapeResult);

          const fn = compose({ escapeFn });
          const result = fn(input);
          assert.equal(result, escapeResult);

          assert.equal(escapeFn.callCount, 1);
          assert.ok(escapeFn.calledWithExactly(input));
        },
      ),
    );
  });

  test("escapeFn with flagFn, one fragment", () => {
    fc.assert(
      fc.property(
        fc.record({
          input: fc.string(),
          escapeResult: fc.string(),
          flagResult: fc.string(),
        }),
        ({ input, escapeResult, flagResult }) => {
          const flagFn = sinon.stub();
          flagFn.returns([flagResult]);

          const escapeFn = sinon.stub();
          escapeFn.returns(escapeResult);

          const fn = compose({ escapeFn, flagFn });
          const result = fn(input);
          assert.equal(result, escapeResult);

          assert.deepEqual(
            flagFn.getCalls().map((call) => call.args),
            [[input]],
          );
          assert.deepEqual(
            escapeFn.getCalls().map((call) => call.args),
            [[flagResult]],
          );
        },
      ),
    );
  });

  test("escapeFn with flagFn, all fragments", () => {
    fc.assert(
      fc.property(
        fc.record({
          input: fc.string(),
          escapeResult: fc.string(),
          flagResult: fc
            .array(fc.tuple(fc.string(), fc.string(), fc.string()), {
              minLength: 1,
            })
            .map((arr) => arr.flat()),
        }),
        ({ input, escapeResult, flagResult }) => {
          const iterations = Math.ceil((flagResult.length - 2) / 2);

          const flagFn = sinon.stub();
          flagFn.returns(flagResult);

          const escapeFn = sinon.stub();
          let idx = 0;
          for (; idx < iterations; idx += 1) {
            escapeFn.onCall(idx).returns("");
          }
          escapeFn.onCall(idx).returns(escapeResult);

          const fn = compose({ escapeFn, flagFn });
          const result = fn(input);
          assert.equal(result, escapeResult);

          assert.equal(flagFn.callCount, 1);
          assert.ok(flagFn.calledWithExactly(input));

          assert.deepEqual(
            escapeFn
              .getCalls()
              .slice(0, iterations)
              .map((call) => call.args),
            flagResult
              .slice(0, iterations * 2)
              .filter((_, idx) => idx % 2 === 0)
              .map((value) => [value]),
          );
          assert.ok(
            escapeFn
              .getCall(iterations)
              .calledWithExactly(flagResult.slice(iterations * 2).join("")),
          );
        },
      ),
    );
  });

  test("escapeFn with flagFn, some fragments", () => {
    fc.assert(
      fc.property(
        fc.record({
          input: fc.string(),
          escapeResult: fc.string({ minLength: 1 }),
          flagResult: fc
            .tuple(
              fc.integer({ min: 1 }),
              fc
                .array(fc.tuple(fc.string(), fc.string(), fc.string()), {
                  minLength: 1,
                })
                .map((arr) => arr.flat()),
            )
            .map(([emptyCnt, arr]) => [emptyCnt % (arr.length / 3), arr])
            .filter(([emptyCnt]) => emptyCnt > 0),
        }),
        ({ input, escapeResult, flagResult }) => {
          const [emptyCnt, fragments] = flagResult;

          const flagFn = sinon.stub();
          flagFn.returns(fragments);

          const escapeFn = sinon.stub();
          let idx = 0;
          for (; idx < emptyCnt; idx += 1) {
            escapeFn.onCall(idx).returns("");
          }
          escapeFn.onCall(idx).returns(escapeResult);
          escapeFn.onCall(idx + 1).returns(escapeResult);

          const fn = compose({ escapeFn, flagFn });
          const result = fn(input);
          assert.equal(result, escapeResult);

          assert.equal(flagFn.callCount, 1);
          assert.ok(flagFn.calledWithExactly(input));

          assert.deepEqual(
            escapeFn
              .getCalls()
              .slice(0, emptyCnt + 1)
              .map((call) => call.args),
            fragments
              .slice(0, (emptyCnt + 1) * 2)
              .filter((_, idx) => idx % 2 === 0)
              .map((value) => [value]),
          );
          assert.ok(
            escapeFn
              .getCall(emptyCnt + 1)
              .calledWithExactly(fragments.slice(emptyCnt * 2).join("")),
          );
        },
      ),
    );
  });

  test("escapeFn and quoteFn", () => {
    fc.assert(
      fc.property(
        fc.record({
          input: fc.string(),
          escapeResult: fc.string(),
          quoteResult: fc.string(),
        }),
        ({ input, escapeResult, quoteResult }) => {
          const escapeFn = sinon.stub();
          escapeFn.returns(escapeResult);

          const quoteFn = sinon.stub();
          quoteFn.returns(quoteResult);

          const fn = compose({ escapeFn, quoteFn });
          const result = fn(input);
          assert.equal(result, quoteResult);

          assert.equal(escapeFn.callCount, 1);
          assert.ok(escapeFn.calledWithExactly(input));

          assert.equal(quoteFn.callCount, 1);
          assert.ok(quoteFn.calledWithExactly(escapeResult));
        },
      ),
    );
  });

  test("escapeFn and quoteFn with flagFn, one fragment", () => {
    fc.assert(
      fc.property(
        fc.record({
          input: fc.string(),
          escapeResult: fc.string(),
          flagResult: fc.string(),
          quoteResult: fc.string(),
        }),
        ({ input, escapeResult, flagResult, quoteResult }) => {
          const flagFn = sinon.stub();
          flagFn.returns([flagResult]);

          const escapeFn = sinon.stub();
          escapeFn.returns(escapeResult);

          const quoteFn = sinon.stub();
          quoteFn.returns(quoteResult);

          const fn = compose({ escapeFn, flagFn, quoteFn });
          const result = fn(input);
          assert.equal(result, quoteResult);

          assert.deepEqual(
            flagFn.getCalls().map((call) => call.args),
            [[input]],
          );
          assert.deepEqual(
            escapeFn.getCalls().map((call) => call.args),
            [[flagResult]],
          );
          assert.deepEqual(
            quoteFn.getCalls().map((call) => call.args),
            [[escapeResult]],
          );
        },
      ),
    );
  });

  test("escapeFn and quoteFn with flagFn, all fragments", () => {
    fc.assert(
      fc.property(
        fc.record({
          input: fc.string(),
          escapeResult: fc.string(),
          flagResult: fc
            .array(fc.tuple(fc.string(), fc.string(), fc.string()), {
              minLength: 1,
            })
            .map((arr) => arr.flat()),
          quoteResult: fc.string(),
        }),
        ({ input, escapeResult, flagResult, quoteResult }) => {
          const iterations = Math.ceil((flagResult.length - 2) / 2);

          const flagFn = sinon.stub();
          flagFn.returns(flagResult);

          const escapeFn = sinon.stub();
          let idx = 0;
          for (; idx < iterations; idx += 1) {
            escapeFn.onCall(idx).returns("");
          }
          escapeFn.onCall(idx).returns(escapeResult);

          const quoteFn = sinon.stub();
          quoteFn.returns(quoteResult);

          const fn = compose({ escapeFn, flagFn, quoteFn });
          const result = fn(input);
          assert.equal(result, quoteResult);

          assert.equal(flagFn.callCount, 1);
          assert.ok(flagFn.calledWithExactly(input));

          assert.deepEqual(
            escapeFn
              .getCalls()
              .slice(0, iterations)
              .map((call) => call.args),
            flagResult
              .slice(0, iterations * 2)
              .filter((_, idx) => idx % 2 === 0)
              .map((value) => [value]),
          );
          assert.ok(
            escapeFn
              .getCall(iterations)
              .calledWithExactly(flagResult.slice(iterations * 2).join("")),
          );
        },
      ),
    );
  });

  test("escapeFn and quoteFn with flagFn, some fragments", () => {
    fc.assert(
      fc.property(
        fc.record({
          input: fc.string(),
          escapeResult: fc.string({ minLength: 1 }),
          flagResult: fc
            .tuple(
              fc.integer({ min: 1 }),
              fc
                .array(fc.tuple(fc.string(), fc.string(), fc.string()), {
                  minLength: 1,
                })
                .map((arr) => arr.flat()),
            )
            .map(([emptyCnt, arr]) => [emptyCnt % (arr.length / 3), arr])
            .filter(([emptyCnt]) => emptyCnt > 0),
          quoteResult: fc.string(),
        }),
        ({ input, escapeResult, flagResult, quoteResult }) => {
          const [emptyCnt, fragments] = flagResult;

          const flagFn = sinon.stub();
          flagFn.returns(fragments);

          const escapeFn = sinon.stub();
          let idx = 0;
          for (; idx < emptyCnt; idx += 1) {
            escapeFn.onCall(idx).returns("");
          }
          escapeFn.onCall(idx).returns(escapeResult);
          escapeFn.onCall(idx + 1).returns(escapeResult);

          const quoteFn = sinon.stub();
          quoteFn.returns(quoteResult);

          const fn = compose({ escapeFn, flagFn, quoteFn });
          const result = fn(input);
          assert.equal(result, quoteResult);

          assert.equal(flagFn.callCount, 1);
          assert.ok(flagFn.calledWithExactly(input));

          assert.deepEqual(
            escapeFn
              .getCalls()
              .slice(0, emptyCnt + 1)
              .map((call) => call.args),
            fragments
              .slice(0, (emptyCnt + 1) * 2)
              .filter((_, idx) => idx % 2 === 0)
              .map((value) => [value]),
          );
          assert.ok(
            escapeFn
              .getCall(emptyCnt + 1)
              .calledWithExactly(fragments.slice(emptyCnt * 2).join("")),
          );
        },
      ),
    );
  });

  test("large number of flag fragments (GHSA-gm3r-q2wp-hw87)", () => {
    const fragments = [];
    fragments.length = 100_000;

    const flagFn = sinon.stub();
    flagFn.returns(fragments);

    const escapeFn = sinon.stub();
    escapeFn.returns("");

    const start = Date.now();
    const fn = compose({ escapeFn, flagFn });
    fn();
    const end = Date.now();

    const duration = end - start;
    const max = 2500;
    assert.ok(duration < max, `${duration} should be less than ${max}`);
  });
});
