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

### Webpack

Tested on `v5.108.4`.

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
