<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

# Usage With Bundlers

This document provides help for using Shescape with a bundler.

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md

## Configuration Instructions

This section provides instructions for how to configure your bundler when using
Shescape. For up-to-date guidelines, consult the documentation of the respective
bundler.

Each section indicates against which version of the bundler the configuration
was tested. If it does not work on a _newer_ version, please [open an issue].

### Rollup

Tested on [Rollup] `v4.62.2`.

No special configuration is required. Using [`@rollup/plugin-commonjs`] and
[`@rollup/plugin-node-resolve`] should handle Shescape out of the box.

[`@rollup/plugin-commonjs`]: https://www.npmjs.com/package/@rollup/plugin-commonjs
[`@rollup/plugin-node-resolve`]: https://www.npmjs.com/package/@rollup/plugin-node-resolve
[rollup]: https://www.npmjs.com/package/rollup

### webpack

Tested on [webpack] `v5.108.4`.

Add the following to your `webpack.config.js` configuration. Make sure to extend
the `resolve`/`fallback` object if it already exists in your configuration.

```javascript
export default {
  // ...
  resolve: {
    fallback: {
      "@ericcornelissen/lregexp": "intentionally invalid: \0",
      // The '\0' ensures this cannot resolve to a real package or file.
    },
  },
  // ...
};
```

[webpack]: https://www.npmjs.com/package/webpack
