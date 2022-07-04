/**
 * @overview Contains unit tests the quoting logic of `./src/main.js`.
 * @license Unlicense
 */

import test from "ava";
import sinon from "sinon";

import { macros, setups } from "./_.js";

import { resolveExecutable } from "../../../src/executables.js";

import { quoteShellArg } from "../../../src/main.js";

test.beforeEach(setups.mainQuoteShellArg);

test("the return value", (t) => {
  const escapedArg = "foobar";
  t.context.deps.quoteFunction.returns(escapedArg);

  const result = quoteShellArg(t.context.args, t.context.deps);
  t.is(result, escapedArg);
});

test("getting the escape function", (t) => {
  const shellName = "foobar";
  t.context.deps.getShellName.returns(shellName);

  quoteShellArg(t.context.args, t.context.deps);

  t.is(t.context.deps.getEscapeFunction.callCount, 1);
  t.true(t.context.deps.getEscapeFunction.alwaysCalledWithExactly(shellName));
});

test("getting the quote function", (t) => {
  const shellName = "foobar";
  t.context.deps.getShellName.returns(shellName);

  quoteShellArg(t.context.args, t.context.deps);

  t.is(t.context.deps.getQuoteFunction.callCount, 1);
  t.true(t.context.deps.getQuoteFunction.alwaysCalledWithExactly(shellName));
});

test("quoting", (t) => {
  const escapedArg = "foobar";
  t.context.deps.escapeFunction.returns(escapedArg);

  quoteShellArg(t.context.args, t.context.deps);

  t.true(t.context.deps.quoteFunction.calledWithExactly(escapedArg));
});

for (const shell of [undefined, true, false]) {
  test(`shell is \`${shell}\``, (t) => {
    t.context.args.options = { shell };

    const defaultShell = "foobar";
    t.context.deps.getDefaultShell.returns(defaultShell);

    quoteShellArg(t.context.args, t.context.deps);

    t.is(t.context.deps.getDefaultShell.callCount, 1);
    t.true(
      t.context.deps.getDefaultShell.calledWithExactly(
        sinon.match({ env: t.context.args.process.env })
      )
    );
    t.true(
      t.context.deps.getShellName.calledWithExactly(
        sinon.match({ shell: defaultShell }),
        sinon.match.any
      )
    );
  });
}

test("a shell is specified", (t) => {
  t.context.args.options = { shell: "shell" };
  t.not(t.context.args.options.shell, undefined);

  quoteShellArg(t.context.args, t.context.deps);

  t.true(t.context.deps.getDefaultShell.notCalled);
  t.true(
    t.context.deps.getShellName.calledWithExactly(
      sinon.match({ shell: t.context.args.options.shell }),
      sinon.match.any
    )
  );
});

test("shell name helpers", (t) => {
  quoteShellArg(t.context.args, t.context.deps);

  t.true(
    t.context.deps.getShellName.calledOnceWithExactly(sinon.match.any, {
      resolveExecutable,
    })
  );
});

for (const interpolation of [undefined, true, false]) {
  test(`interpolation is ${interpolation}`, (t) => {
    t.context.args.options = { interpolation };

    quoteShellArg(t.context.args, t.context.deps);
    t.true(
      t.context.deps.escapeFunction.calledWithExactly(
        sinon.match.any,
        false,
        sinon.match.any
      )
    );
  });
}

for (const quoted of [undefined, true, false]) {
  test(`quoted is ${quoted}`, (t) => {
    t.context.args.options = { quoted };

    quoteShellArg(t.context.args, t.context.deps);
    t.true(
      t.context.deps.escapeFunction.calledWithExactly(
        sinon.match.any,
        sinon.match.any,
        true
      )
    );
  });
}

test(macros.escapeSuccess, { input: "a", expected: "a", fn: quoteShellArg });
test(macros.escapeSuccess, { input: 42, expected: "42", fn: quoteShellArg });
test(macros.escapeSuccess, {
  input: true,
  expected: "true",
  fn: quoteShellArg,
});

test(macros.escapeTypeError, { input: undefined, fn: quoteShellArg });
test(macros.escapeTypeError, { input: null, fn: quoteShellArg });
test("toString is missing", macros.escapeTypeError, {
  input: { toString: null },
  fn: quoteShellArg,
});
test("toString doesn't return a string", macros.escapeTypeError, {
  input: { toString: () => null },
  fn: quoteShellArg,
});

test(macros.prototypePollution, (t, payload) => {
  t.context.args.options = payload;
  quoteShellArg(t.context.args, t.context.deps);
});
