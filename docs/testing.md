# Testing with Shescape

This document provides an overview of why and how to use Shescape's testing
utilities in your tests.

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

## Stubs

Shescape [test stub]s are provided as named imports at `"shescape/testing"`. Use
them in your tests through [dependency injection] (example below) or module
mocking ([for example with Jest][jest-module-mock]).

> **Warning**: If the code under test invokes a command you should **not** use
> these stubs.

```javascript
// my-module.test.js

import assert from "node:assert";
import { Shescape as Stubscape } from "shescape/testing";
import { functionUnderTest } from "./my-module.js";

const stubscape = new Stubscape();
assert.ok(functionUnderTest(stubscape));
```

### Why Stubs

The behaviour of Shescape depends on external factors such as the operating
system it is running on and environment variables. This may not be desirable in
your tests, especially in unit tests.

To avoid unexpected behavior you can use the [test stub]s provided by Shescape
as a drop-in replacement during testing.

## Fixtures

Test fixtures are provided to help you write tests that ensure Shescape is used
correctly to avoid shell injection. Use these fixtures carefully, as incorrect
usage may lead to a false belief that Shescape is being used effectively.

In contrast to stubs, these values should be used in tests that invoke Shescape.

```javascript
// my-module.test.js

import assert from "node:assert";
import { injectionStrings } from "shescape/testing";
import { functionThatIsUsingShescape } from "./my-module.js";

for (const injectionString of injectionStrings) {
  const result = functionThatIsUsingShescape(injectionString);
  assert.equal(result, "no injection");
}
```

---

_Content licensed under [CC BY-SA 4.0]; Code snippets under the [MIT license]._

[cc by-sa 4.0]: https://creativecommons.org/licenses/by-sa/4.0/
[dependency injection]: https://en.wikipedia.org/wiki/Dependency_injection
[jest-module-mock]: https://jestjs.io/docs/manual-mocks#mocking-node-modules
[mit license]: https://opensource.org/license/mit/
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md
[test stub]: https://en.wikipedia.org/wiki/Test_stub
