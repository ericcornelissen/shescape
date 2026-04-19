/**
 * @overview Contains unit tests for the functionality to compose escape
 * functions.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import * as sinon from "sinon";

import { compose } from "../../../src/internal/compose.js";

testProp(
  "escapeFn only",
  [
    fc.record({
      input: fc.string(),
      escapeResult: fc.string(),
    }),
  ],
  (t, { input, escapeResult }) => {
    const escapeFn = sinon.stub();
    escapeFn.returns(escapeResult);

    const fn = compose({ escapeFn });
    const result = fn(input);
    t.is(result, escapeResult);

    t.is(escapeFn.callCount, 1);
    t.true(escapeFn.calledWithExactly(input));
  },
);

testProp(
  "escapeFn with flagFn, one fragment",
  [
    fc.record({
      input: fc.string(),
      escapeResult: fc.string(),
      flagResult: fc.string(),
    }),
  ],
  (t, { input, escapeResult, flagResult }) => {
    const flagFn = sinon.stub();
    flagFn.returns([flagResult]);

    const escapeFn = sinon.stub();
    escapeFn.returns(escapeResult);

    const fn = compose({ escapeFn, flagFn });
    const result = fn(input);
    t.is(result, escapeResult);

    t.is(flagFn.callCount, 1);
    t.true(flagFn.calledWithExactly(input));

    t.is(escapeFn.callCount, 1);
    t.true(escapeFn.calledWithExactly(input));
  },
);

testProp(
  "escapeFn with flagFn, all fragments",
  [
    fc.record({
      input: fc.string(),
      escapeResult: fc.string(),
      flagResult: fc
        .array(fc.tuple(fc.string(), fc.string(), fc.string()), {
          minLength: 1,
          maxLength: 2,
        })
        .map((arr) => arr.flat()),
    }),
  ],
  (t, { input, escapeResult, flagResult }) => {
    const flagFn = sinon.stub();
    flagFn.returns(flagResult);

    const escapeFn = sinon.stub();
    for (let idx = 0; idx < flagResult.length / 3; idx += 1) {
      escapeFn.onCall(idx).returns("");
    }
    escapeFn.onCall(flagResult.length / 3).returns(escapeResult);

    const fn = compose({ escapeFn, flagFn });
    const result = fn(input);
    t.is(result, escapeResult);

    t.is(flagFn.callCount, 1);
    t.true(flagFn.calledWithExactly(input));

    t.is(escapeFn.callCount, flagResult.length / 3 + 1);
    let idx = 0;
    for (; idx < flagResult.length / 3; idx += 1) {
      t.true(escapeFn.getCall(idx).calledWithExactly(flagResult[idx * 2]));
    }
    t.true(
      escapeFn
        .getCall(flagResult.length / 3)
        .calledWithExactly(flagResult.slice(idx * 2).join("")),
    );
  },
);

testProp(
  "escapeFn with flagFn, some fragments",
  [
    fc.record({
      input: fc.string(),
      escapeResult: fc.string({ minLength: 1 }),
      flagResult: fc
        .tuple(
          fc.integer({ min: 0 }),
          fc
            .array(fc.tuple(fc.string(), fc.string(), fc.string()), {
              minLength: 1,
            })
            .map((arr) => arr.flat()),
        )
        .map(([emptyCnt, arr]) => [emptyCnt % (arr.length / 3), arr])
        .filter(([emptyCnt]) => emptyCnt > 0),
    }),
  ],
  (t, { input, escapeResult, flagResult }) => {
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
    t.is(result, escapeResult);

    t.is(flagFn.callCount, 1);
    t.true(flagFn.calledWithExactly(input));

    t.is(escapeFn.callCount, emptyCnt + 2);
    idx = 0;
    for (; idx < emptyCnt; idx += 1) {
      t.true(escapeFn.getCall(idx).calledWithExactly(fragments[idx * 2]));
    }
    t.true(escapeFn.getCall(idx).calledWithExactly(fragments[idx * 2]));
    t.true(
      escapeFn
        .getCall(idx + 1)
        .calledWithExactly(fragments.slice(idx * 2).join("")),
    );
  },
);

testProp(
  "escapeFn and quoteFn",
  [
    fc.record({
      input: fc.string(),
      escapeResult: fc.string(),
      quoteResult: fc.string(),
    }),
  ],
  (t, { input, escapeResult, quoteResult }) => {
    const escapeFn = sinon.stub();
    escapeFn.returns(escapeResult);

    const quoteFn = sinon.stub();
    quoteFn.returns(quoteResult);

    const fn = compose({ escapeFn, quoteFn });
    const result = fn(input);
    t.is(result, quoteResult);

    t.is(escapeFn.callCount, 1);
    t.true(escapeFn.calledWithExactly(input));

    t.is(quoteFn.callCount, 1);
    t.true(quoteFn.calledWithExactly(escapeResult));
  },
);

testProp(
  "escapeFn and quoteFn with flagFn, one fragment",
  [
    fc.record({
      input: fc.string(),
      escapeResult: fc.string(),
      flagResult: fc.string(),
      quoteResult: fc.string(),
    }),
  ],
  (t, { input, escapeResult, flagResult, quoteResult }) => {
    const flagFn = sinon.stub();
    flagFn.returns([flagResult]);

    const escapeFn = sinon.stub();
    escapeFn.returns(escapeResult);

    const quoteFn = sinon.stub();
    quoteFn.returns(quoteResult);

    const fn = compose({ escapeFn, flagFn, quoteFn });
    const result = fn(input);
    t.is(result, quoteResult);

    t.is(flagFn.callCount, 1);
    t.true(flagFn.calledWithExactly(input));

    t.is(escapeFn.callCount, 1);
    t.true(escapeFn.calledWithExactly(input));

    t.is(quoteFn.callCount, 1);
    t.true(quoteFn.calledWithExactly(escapeResult));
  },
);

testProp(
  "escapeFn with flagFn, all fragments",
  [
    fc.record({
      input: fc.string(),
      escapeResult: fc.string(),
      flagResult: fc
        .array(fc.tuple(fc.string(), fc.string(), fc.string()), {
          minLength: 1,
          maxLength: 2,
        })
        .map((arr) => arr.flat()),
      quoteResult: fc.string(),
    }),
  ],
  (t, { input, escapeResult, flagResult, quoteResult }) => {
    const flagFn = sinon.stub();
    flagFn.returns(flagResult);

    const escapeFn = sinon.stub();
    for (let idx = 0; idx < flagResult.length / 3; idx += 1) {
      escapeFn.onCall(idx).returns("");
    }
    escapeFn.onCall(flagResult.length / 3).returns(escapeResult);

    const quoteFn = sinon.stub();
    quoteFn.returns(quoteResult);

    const fn = compose({ escapeFn, flagFn, quoteFn });
    const result = fn(input);
    t.is(result, quoteResult);

    t.is(flagFn.callCount, 1);
    t.true(flagFn.calledWithExactly(input));

    t.is(escapeFn.callCount, flagResult.length / 3 + 1);
    let idx = 0;
    for (; idx < flagResult.length / 3; idx += 1) {
      t.true(escapeFn.getCall(idx).calledWithExactly(flagResult[idx * 2]));
    }
    t.true(
      escapeFn
        .getCall(flagResult.length / 3)
        .calledWithExactly(flagResult.slice(idx * 2).join("")),
    );
  },
);

testProp(
  "escapeFn with flagFn, some fragments",
  [
    fc.record({
      input: fc.string(),
      escapeResult: fc.string({ minLength: 1 }),
      flagResult: fc
        .tuple(
          fc.integer({ min: 0 }),
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
  ],
  (t, { input, escapeResult, flagResult, quoteResult }) => {
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
    t.is(result, quoteResult);

    t.is(flagFn.callCount, 1);
    t.true(flagFn.calledWithExactly(input));

    t.is(escapeFn.callCount, emptyCnt + 2);
    idx = 0;
    for (; idx < emptyCnt; idx += 1) {
      t.true(escapeFn.getCall(idx).calledWithExactly(fragments[idx * 2]));
    }
    t.true(escapeFn.getCall(idx).calledWithExactly(fragments[idx * 2]));
    t.true(
      escapeFn
        .getCall(idx + 1)
        .calledWithExactly(fragments.slice(idx * 2).join("")),
    );
  },
);
