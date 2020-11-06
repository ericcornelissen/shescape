# Shescape

A simple shell escape library. Use it to escape user-specified inputs to shell
commands to prevent [shell injection].

## Example

Below is an example of how to use _Shescape_. Note that you must call _Shescape_
only on the user input, and put the output in between single quotes.

```js
const cp = require("child_process");
const shescape = require("shescape");

cp.exec(`command '${shescape(userInput)}'`, callback);
```

[shell injection]: https://portswigger.net/web-security/os-command-injection
