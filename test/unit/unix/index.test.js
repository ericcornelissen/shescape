/**
 * @overview Contains unit tests for the general Unix-specific functionality.
 * @license MIT
 */

import path from "node:path";

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary, constants } from "./_.js";

import * as bash from "../../../src/unix/bash.js";
import * as csh from "../../../src/unix/csh.js";
import * as dash from "../../../src/unix/dash.js";
import * as unix from "../../../src/unix/index.js";
import * as zsh from "../../../src/unix/zsh.js";

test("the default shell", (t) => {
  const result = unix.getDefaultShell();
  t.is(result, "/bin/sh");
});

test("escape function for bash", (t) => {
  let options = { interpolation: false };
  t.is(
    unix.getEscapeFunction(constants.binBash, options),
    bash.getEscapeFunction(options)
  );

  options = { interpolation: true };
  t.is(
    unix.getEscapeFunction(constants.binBash, options),
    bash.getEscapeFunction(options)
  );
});

test("escape function for csh", (t) => {
  let options = { interpolation: false };
  t.is(
    unix.getEscapeFunction(constants.binCsh, options),
    csh.getEscapeFunction(options)
  );

  options = { interpolation: true };
  t.is(
    unix.getEscapeFunction(constants.binCsh, options),
    csh.getEscapeFunction(options)
  );
});

test("escape function for dash", (t) => {
  let options = { interpolation: false };
  t.is(
    unix.getEscapeFunction(constants.binDash, options),
    dash.getEscapeFunction(options)
  );

  options = { interpolation: true };
  t.is(
    unix.getEscapeFunction(constants.binDash, options),
    dash.getEscapeFunction(options)
  );
});

test("escape function for zsh", (t) => {
  let options = { interpolation: false };
  t.is(
    unix.getEscapeFunction(constants.binZsh, options),
    zsh.getEscapeFunction(options)
  );

  options = { interpolation: true };
  t.is(
    unix.getEscapeFunction(constants.binZsh, options),
    zsh.getEscapeFunction(options)
  );
});

testProp(
  "escape function for unsupported shell",
  [arbitrary.unsupportedUnixShell(), fc.boolean()],
  (t, shellName, interpolation) => {
    t.is(unix.getEscapeFunction(shellName, { interpolation }), undefined);
  }
);

test("quote function for bash", (t) => {
  t.is(unix.getQuoteFunction(constants.binBash), bash.getQuoteFunction());
});

test("quote function for csh", (t) => {
  t.is(unix.getQuoteFunction(constants.binCsh), csh.getQuoteFunction());
});

test("quote function for dash", (t) => {
  t.is(unix.getQuoteFunction(constants.binDash), dash.getQuoteFunction());
});

test("quote function for zsh", (t) => {
  t.is(unix.getQuoteFunction(constants.binZsh), zsh.getQuoteFunction());
});

testProp(
  "quote function for unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    t.is(unix.getQuoteFunction(shellName), undefined);
  }
);

testProp(
  "get shell name for supported shell",
  [arbitrary.env(), arbitrary.unixPath(), arbitrary.unixShell()],
  (t, env, basePath, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns(path.join(basePath, shell));

    const result = unix.getShellName({ env, shell }, { resolveExecutable });
    t.is(result, shell);
  }
);

testProp(
  "get shell name for unsupported shell",
  [arbitrary.env(), arbitrary.unixPath(), arbitrary.unsupportedUnixShell()],
  (t, env, basePath, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns(path.join(basePath, shell));

    const result = unix.getShellName({ env, shell }, { resolveExecutable });
    t.is(result, constants.binBash);
  }
);

testProp(
  "resolving the shell",
  [arbitrary.env(), fc.string()],
  (t, env, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns("foobar");

    unix.getShellName({ env, shell }, { resolveExecutable });
    t.true(
      resolveExecutable.calledWithExactly(
        { executable: shell },
        {
          exists: sinon.match.func,
          readlink: sinon.match.func,
          which: sinon.match.func,
        }
      )
    );
  }
);
