# Testing with Shescape

This document provides an overview of why and how to use Shescape's testing
utilities in your tests.

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

## Why

The behaviour of Shescape depends on external factors such as the operating
system it is running on and environment variables. This may not be desirable in
your tests, especially in unit tests.

To avoid unexpected behavior you can use the [test stub]s provided by Shescape
as a drop-in replacement during testing.

> **Warning**: If the code under test invokes a command you should **not** use
> these stubs.

## How

Shescape [test stub]s are provided as named imports at `"shescape/testing"`. Use
them in your tests through [dependency injection] (example below) or module
mocking ([for example with Jest][jest-module-mock]).

```javascript
// my-module.test.js

import assert from "node:assert";
import { shescape as stubscape } from "shescape/testing";
import { functionUnderTest } from "./my-module.js";

assert.ok(functionUnderTest(stubscape));
```

[dependency injection]: https://en.wikipedia.org/wiki/Dependency_injection
[jest-module-mock]: https://jestjs.io/docs/manual-mocks#mocking-node-modules
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md
[test stub]: https://en.wikipedia.org/wiki/Test_stub
