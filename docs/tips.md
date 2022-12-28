# Tips

This documents provides tips to avoid shell injection beyond using a shell
escape library like Shescape.

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

## Do

In this section you can find tips for what you could do to protect against shell
injection in addition to or instead of using Shescape.

### Use Indirection

Instead of using user input directly, evaluate the user's input and select an
appropriate value from a collection of known safe values.

```javascript
import { exec } from "node:child_process";
import * as shescape from "shescape";

const userInput = "Yes";

// Good
exec(`echo 'Your choice was' ${shescape.quote(choice)}`);

// Better
let safeChoice;
switch (choice.toLowerCase()) {
  case "yes":
  case "y":
    safeChoice = "yes";
    break;
  case "no":
  case "n":
    safeChoice = "no";
    break;
  default:
    throw new Error(`Invalid choice '${choice}'`);
}
exec(`echo 'Your choice was ${safeChoice}'`);
```

### Use `--`

Some CLI program support the special option `--`. If supported, arguments after
this option will not be interpreted as options/flags.

> **Note**: Before you decide to use the `--` option, verify that the program
> you're invoking supports it.

```javascript
import { exec } from "node:child_process";
import * as shescape from "shescape";

const userInput = "foobar.txt";

// Good
exec(`git clean -n ${shescape.quote(userInput)}`);

// Better
exec(`git clean -n -- ${shescape.quote(userInput)}`);
```

## Do not

In this section you can find things that DO NOT work to protect against shell
injection.

### Blocklist

A blocklist (sometimes called a _blacklist_) is an ineffective way to to protect
against shell injection. This is because it is likely you will forget to block
something. If you think your only option is a blocklist, use a shell escape
library like Shescape instead.

[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md
