<!-- SPDX-License-Identifier: CC0-1.0 -->

# Security Policy

The maintainers of the _Shescape_ project take security issues seriously. We
appreciate your efforts to responsibly disclose your findings. Due to the
non-funded and open-source nature of the project, we take a best-efforts
approach when it comes to engaging with security reports.

## Supported Versions

The table below shows which versions of the project are currently supported
with security updates.

| Version | End-of-life |
| ------: | :---------- |
|   2.x.x | -           |
|   1.x.x | 2023-12-06  |
|   0.x.x | 2021-02-01  |

_This table only includes information on versions `<3.0.0`._

## Reporting a Vulnerability

To report a security issue in the latest version of a supported version range,
either (in order of preference):

- [Report it through GitHub][new github advisory], or
- Send an email to [security@ericcornelissen.dev] with the terms "SECURITY" and
  "shescape" in the subject line.

Please do not open a regular issue or Pull Request in the public repository.

To report a security issue in an unsupported version of the project, or if the
latest version of a supported version range isn't affected, please report it
publicly. For example, as a regular issue in the public repository. If in doubt,
report the issue privately.

[new github advisory]: https://github.com/ericcornelissen/shescape/security/advisories/new
[security@ericcornelissen.dev]: mailto:security@ericcornelissen.dev?subject=SECURITY%20%28shescape%29

### What to Report

Consider if the issue you found really is a security concern. Below you can find
guidelines for what is and isn't considered a security issue. Any issue that
does not fall into one of the listed categories should be reported based on your
own judgement. If in doubt, report the issue privately.

Any issue that is out of scope should still be reported, but can be reported
publicly because it is not considered sensitive.

#### In Scope

- Insecure suggestions or snippets in the documentation.
- Insufficient escaping for any supported shell.
- Logic bugs with a security implication that can be triggered through the
  public API.
- Security misconfigurations in the continuous integration pipeline or software
  supply chain.

#### Out of Scope

- Bugs only affecting the `shescape/testing` module.
- Insecure defaults or confusing API design.
- Insufficient escaping for any unsupported shell.
- Known vulnerabilities in third-party `dependencies` or `devDependencies`.

### What to Include in a Report

Try to include as many of the following items as possible in a security report:

- An explanation of the issue
- A proof of concept exploit
- A suggested severity
- Relevant [CWE] identifiers
- The latest affected version
- The earliest affected version
- A suggested patch
- An automated regression test
- A fuzz input seed or test

[cwe]: https://cwe.mitre.org/

## Advisories

> **Note**: Advisories will be created only for vulnerabilities present in
> released versions of the project.

| ID               | Date       | Affected versions | Patched versions |
| :--------------- | :--------- | :---------------- | :--------------- |
| `CVE-2023-40185` | 2023-08-22 | `<1.7.4`          | `>=1.7.4`        |
| `CVE-2023-35931` | 2023-06-22 | `<1.7.1`          | `>=1.7.1`        |
| `CVE-2022-25918` | 2022-10-25 | `>=1.5.10 <1.6.1` | `>=1.6.1`        |
| `CVE-2022-36064` | 2022-08-29 | `>=1.5.1 <1.5.10` | `>=1.5.10`       |
| `CVE-2022-31180` | 2022-07-26 | `>=1.4.0 <1.5.8`  | `>=1.5.8`        |
| `CVE-2022-31179` | 2022-07-26 | `<1.5.8`          | `>=1.5.8`        |
| `CVE-2022-24725` | 2022-03-03 | `>=1.4.0 <1.5.1`  | `>=1.5.1`        |
| `CVE-2021-21384` | 2021-03-19 | `<1.1.3`          | `>=1.1.3`        |

_This table is ordered most to least recent._

## Acknowledgments

We would like to publicly thank the following reporters:

- Elliot Ward ([@mowzk]) from [Snyk]

[@mowzk]: https://github.com/mowzk
[snyk]: https://snyk.io/
