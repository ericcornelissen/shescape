import { execSync } from "node:child_process";
import { Shescape } from "shescape";

const options = { shell: "powershell" };
const shescape = new Shescape({ shell: "powershell" });

try {
  execSync(`gh ${shescape.escape("--help")}`, options);
  console.log("gh --help : no error");
} catch {
  console.log("gh --help : error");
}
try {
  execSync(`gh ${shescape.escape("`--help")}`, options);
  console.log("gh `--help : no error");
} catch {
  console.log("gh `--help : error");
}
try {
  execSync(`gh ${shescape.escape("``--help")}`, options, options);
  console.log("gh ``--help : no error");
} catch {
  console.log("gh ``--help : error");
}

try {
  execSync(`gh ${shescape.quote("--help")}`, options);
  console.log("gh '--help': no error");
} catch {
  console.log("gh '--help': error");
}
try {
  execSync(`gh ${shescape.quote("`--help")}`, options);
  console.log("gh '`--help': no error");
} catch {
  console.log("gh '`--help': error");
}
try {
  execSync(`gh ${shescape.quote("``--help")}`, options);
  console.log("gh '``--help': no error");
} catch {
  console.log("gh '``--help': error");
}
