import { exec } from "node:child_process";
import { Shescape } from "shescape";

const options = { shell: "powershell" };
const shescape = new Shescape({ shell: "powershell" });

exec(`gh ${shescape.escape("--help")}`, options, (error) => {
  if (error) {
    console.log("gh --help : error");
  } else {
    console.log("gh --help : no error");
  }
});
exec(`gh ${shescape.escape("`--help")}`, options, (error) => {
  if (error) {
    console.log("gh `--help : error");
  } else {
    console.log("gh `--help : no error");
  }
});
exec(`gh ${shescape.escape("``--help")}`, options, options, (error) => {
  if (error) {
    console.log("gh ``--help : error");
  } else {
    console.log("gh ``--help : no error");
  }
});

exec(`gh ${shescape.quote("--help")}`, options, (error) => {
  if (error) {
    console.log("gh '--help': error");
  } else {
    console.log("gh '--help': no error");
  }
});
exec(`gh ${shescape.quote("`--help")}`, options, (error) => {
  if (error) {
    console.log("gh '`--help': error");
  } else {
    console.log("gh '`--help': no error");
  }
});
exec(`gh ${shescape.quote("``--help")}`, options, (error) => {
  if (error) {
    console.log("gh '``--help': error");
  } else {
    console.log("gh '``--help': no error");
  }
});
