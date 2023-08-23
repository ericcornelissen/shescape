/**
 * Usage: `node script/check-runtime-deps.js`.
 *
 * @overview Check if the version of runtime dependencies being depended upon
 * match the minimum version of the supported versions.
 * @license MIT
 */

import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import * as common from "./_common.js";

function getInstalledVersion(dependency) {
  const { stdout } = common.npmRunSync([
    "ls",
    // Get a parsable output
    "--json",
    // Only look at direct dependencies
    "--depth",
    "0",
    // The dependency to get
    dependency,
  ]);

  const dependenciesInfo = JSON.parse(stdout);
  const installedVersion = dependenciesInfo.dependencies[dependency].version;
  return installedVersion;
}

const projectRoot = path.resolve(
  path.dirname(url.fileURLToPath(new URL(import.meta.url))),
  "..",
);
const manifestPath = path.resolve(projectRoot, "package.json");
const rawManifest = fs.readFileSync(manifestPath, { encoding: "utf-8" });
const manifest = JSON.parse(rawManifest);
const runtimeDeps = manifest.dependencies;

const violations = Object.entries(runtimeDeps)
  .map(([dependency, versionRange]) => ({
    dependency,
    installedVersion: getInstalledVersion(dependency),
    versionRange,
  }))
  .filter(
    ({ installedVersion, versionRange }) =>
      !versionRange.endsWith(installedVersion),
  );

if (violations.length > 0) {
  violations.forEach(({ dependency, installedVersion, versionRange }) => {
    console.log("Dependency:", dependency);
    console.log("  supported:", versionRange);
    console.log("  installed:", installedVersion);
  });

  console.log("");
  console.log(
    violations.length,
    "violation(s) found.",
    "Update either the version range or installed version of each violation.",
  );

  process.exit(1);
} else {
  console.log("No problems detected");
}
