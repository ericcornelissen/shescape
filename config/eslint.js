// Check out ESLint at: https://eslint.org/

import ava from "eslint-plugin-ava";
import jsdoc from "eslint-plugin-jsdoc";
import json from "@eslint/json";
import regexp from "eslint-plugin-regexp";
import top from "@ericcornelissen/eslint-plugin-top";
import yml from "eslint-plugin-yml";

export default [
  {
    name: "Code",
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    name: "JSDoc",
    files: ["**/*.js"],
    plugins: { jsdoc },
    rules: {
      // https://github.com/gajus/eslint-plugin-jsdoc#readme
      "jsdoc/check-access": ["off"],
      "jsdoc/check-alignment": ["error"],
      "jsdoc/check-examples": ["off"], // TODO: enable & configure when possible
      "jsdoc/check-indentation": [
        "error",
        {
          excludeTags: ["example"],
        },
      ],
      "jsdoc/check-line-alignment": [
        "error",
        "never",
        {
          customSpacings: {
            postDelimiter: 1,
            postName: 1,
            postTag: 1,
            postType: 1,
          },
          tags: [
            "license",
            "module",
            "overview",
            "param",
            "returns",
            "since",
            "throws",
            "version",
          ],
        },
      ],
      "jsdoc/check-param-names": [
        "error",
        {
          allowExtraTrailingParamDocs: false,
          checkDestructured: true,
          checkRestProperty: true,
          disableExtraPropertyReporting: false,
          enableFixer: false,
          useDefaultObjectProperties: true,
        },
      ],
      "jsdoc/check-property-names": ["off"],
      "jsdoc/check-syntax": ["off"],
      "jsdoc/check-tag-names": [
        "error",
        {
          definedTags: [],
        },
      ],
      "jsdoc/check-types": [
        "error",
        {
          exemptTagContexts: [],
          noDefaults: false,
          unifyParentAndChildTypeChecks: false,
        },
      ],
      "jsdoc/empty-tags": [
        "error",
        {
          tags: ["constant"],
        },
      ],
      "jsdoc/implements-on-classes": ["off"],
      "jsdoc/informative-docs": [
        "error",
        {
          aliases: [],
          excludedTags: ["returns"],
          uselessWords: ["a", "an", "i", "in", "of", "our", "s", "the"],
        },
      ],
      "jsdoc/match-description": [
        "error",
        {
          mainDescription: "^[A-Z`\\d][\\s\\S]*.\n$",
          tags: {
            param: "^[A-Z].*\\.$",
            returns: "^[A-Z`].*\\.$",
            since: "^[0-9]\\.[0-9]\\.[0-9]",
            throws: "^[A-Z].*\\.$",
            yields: "^[A-Z`].*\\.$",
          },
        },
      ],
      "jsdoc/match-name": ["off"],
      "jsdoc/multiline-blocks": [
        "error",
        {
          noFinalLineText: true,
          noMultilineBlocks: false,
          noSingleLineBlocks: true,
          noZeroLineText: true,
          singleLineTags: [],
        },
      ],
      "jsdoc/no-bad-blocks": [
        "error",
        {
          ignore: [],
          preventAllMultiAsteriskBlocks: true,
        },
      ],
      "jsdoc/no-blank-block-descriptions": ["error"],
      "jsdoc/no-defaults": ["off"],
      "jsdoc/no-missing-syntax": ["off"],
      "jsdoc/no-multi-asterisks": [
        "error",
        {
          allowWhitespace: true,
          preventAtEnd: true,
          preventAtMiddleLines: true,
        },
      ],
      "jsdoc/no-restricted-syntax": ["off"],
      "jsdoc/no-types": ["off"],
      "jsdoc/no-undefined-types": [
        "error",
        {
          definedTypes: [],
        },
      ],
      "jsdoc/require-asterisk-prefix": ["error", "always"],
      "jsdoc/require-description-complete-sentence": [
        "error",
        {
          abbreviations: ["e.g.", "..."],
          newlineBeforeCapsAssumesBadSentenceEnd: false,
          tags: [],
        },
      ],
      "jsdoc/require-description": [
        "error",
        {
          checkConstructors: false,
          checkGetters: false,
          checkSetters: false,
          descriptionStyle: "body",
          exemptedBy: [],
        },
      ],
      "jsdoc/require-example": ["off"],
      "jsdoc/require-file-overview": [
        "error",
        {
          tags: {
            license: {
              initialCommentsOnly: true,
              mustExist: true,
              preventDuplicates: true,
            },
            overview: {
              initialCommentsOnly: true,
              mustExist: true,
              preventDuplicates: true,
            },
          },
        },
      ],
      "jsdoc/require-hyphen-before-param-description": ["error", "never"],
      "jsdoc/require-jsdoc": [
        "error",
        {
          publicOnly: false,
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: false,
            ClassExpression: false,
            FunctionDeclaration: true,
            FunctionExpression: false,
            MethodDefinition: false,
          },
        },
      ],
      "jsdoc/require-param": ["error"],
      "jsdoc/require-param-description": ["error"],
      "jsdoc/require-param-name": ["error"],
      "jsdoc/require-param-type": ["error"],
      "jsdoc/require-property": ["off"],
      "jsdoc/require-property-description": ["off"],
      "jsdoc/require-property-name": ["off"],
      "jsdoc/require-property-type": ["off"],
      "jsdoc/require-returns": [
        "error",
        {
          checkConstructors: false,
          checkGetters: false,
          exemptedBy: [],
          forceRequireReturn: false,
          forceReturnsWithAsync: false,
        },
      ],
      "jsdoc/require-returns-check": [
        "error",
        {
          exemptGenerators: true,
          exemptAsync: true,
          reportMissingReturnForUndefinedTypes: false,
        },
      ],
      "jsdoc/require-returns-description": ["error"],
      "jsdoc/require-returns-type": ["error"],
      "jsdoc/require-throws": [
        "error",
        {
          exemptedBy: [],
        },
      ],
      "jsdoc/require-yields": [
        "error",
        {
          exemptedBy: [],
          forceRequireNext: false,
          forceRequireYields: true,
          next: false,
          nextWithGeneratorTag: false,
          withGeneratorTag: false,
        },
      ],
      "jsdoc/require-yields-check": [
        "error",
        {
          checkGeneratorsOnly: false,
          next: false,
        },
      ],
      "jsdoc/sort-tags": [
        "error",
        {
          alphabetizeExtras: false,
          reportTagGroupSpacing: false,
          tagSequence: [
            {
              tags: [
                "example",

                // file
                "overview",
                "module",
                "version",
                "license",

                // function
                "param",
                "returns",
                "throws",
                "since",

                // constant
                "constant",
                "type",

                // misc
                "deprecated",
              ],
            },
          ],
        },
      ],
      "jsdoc/tag-lines": [
        "error",
        "any",
        {
          endLines: 0,
          startLines: 1,
        },
      ],
      "jsdoc/text-escaping": ["off"],
      "jsdoc/valid-types": ["error"],
    },
    settings: {
      jsdoc: {
        ignorePrivate: false,
        ignoreInternal: false,
        maxLines: 1,
        minLines: 0,
        mode: "jsdoc",
        preferredTypes: {
          "Array.<>": false,
          "Array<>": false,
          "Object.<>": false,
        },
        structuredTags: {
          throws: {
            required: ["type"],
          },
        },
        tagNamePreference: {
          constant: "constant",
          file: "overview",
          param: "param",
          returns: "returns",
          throws: "throws",
          yields: "yields",
        },
      },
    },
  },
  {
    name: "Source",
    files: ["src/**/*.js"],
    plugins: { jsdoc, regexp, top },
    rules: {
      // https://github.com/gajus/eslint-plugin-jsdoc#readme
      "jsdoc/check-values": [
        "error",
        {
          allowedLicenses: ["MPL-2.0"],
        },
      ],

      // https://github.com/ota-meshi/eslint-plugin-regexp#readme
      "regexp/confusing-quantifier": ["error"],
      "regexp/control-character-escape": ["error"],
      "regexp/grapheme-string-literal": ["error"],
      "regexp/hexadecimal-escape": ["error", "never"],
      "regexp/letter-case": [
        "error",
        {
          caseInsensitive: "lowercase",
          controlEscape: "lowercase",
          hexadecimalEscape: "uppercase",
          unicodeEscape: "uppercase",
        },
      ],
      "regexp/match-any": [
        "error",
        {
          allows: ["[^]", "dotAll"],
        },
      ],
      "regexp/negation": ["error"],
      "regexp/no-contradiction-with-assertion": ["error"],
      "regexp/no-control-character": ["off"],
      "regexp/no-dupe-characters-character-class": ["error"],
      "regexp/no-dupe-disjunctions": [
        "error",
        {
          report: "all",
          reportExponentialBacktracking: "potential",
          reportUnreachable: "potential",
        },
      ],
      "regexp/no-empty-alternative": ["error"],
      "regexp/no-empty-capturing-group": ["error"],
      "regexp/no-empty-character-class": ["error"],
      "regexp/no-empty-group": ["error"],
      "regexp/no-empty-lookarounds-assertion": ["error"],
      "regexp/no-empty-string-literal": ["error"],
      "regexp/no-escape-backspace": ["error"],
      "regexp/no-extra-lookaround-assertions": ["error"],
      "regexp/no-invalid-regexp": ["error"],
      "regexp/no-invisible-character": ["error"],
      "regexp/no-lazy-ends": [
        "error",
        {
          ignorePartial: false,
        },
      ],
      "regexp/no-legacy-features": ["error"],
      "regexp/no-misleading-capturing-group": [
        "error",
        {
          reportBacktrackingEnds: true,
        },
      ],
      "regexp/no-misleading-unicode-character": [
        "error",
        {
          fixable: false,
        },
      ],
      "regexp/no-missing-g-flag": [
        "error",
        {
          strictTypes: true,
        },
      ],
      "regexp/no-non-standard-flag": ["error"],
      "regexp/no-obscure-range": [
        "error",
        {
          allowed: "alphanumeric",
        },
      ],
      "regexp/no-octal": ["error"],
      "regexp/no-optional-assertion": ["error"],
      "regexp/no-potentially-useless-backreference": ["error"],
      "regexp/no-standalone-backslash": ["error"],
      "regexp/no-super-linear-backtracking": [
        "error",
        {
          report: "potential",
        },
      ],
      "regexp/no-super-linear-move": [
        "error",
        {
          ignoreSticky: false,
          report: "potential",
        },
      ],
      "regexp/no-trivially-nested-assertion": ["error"],
      "regexp/no-trivially-nested-quantifier": ["error"],
      "regexp/no-unused-capturing-group": [
        "error",
        {
          allowNamed: false,
          fixable: false,
        },
      ],
      "regexp/no-useless-assertions": ["error"],
      "regexp/no-useless-backreference": ["error"],
      "regexp/no-useless-character-class": ["error"],
      "regexp/no-useless-dollar-replacements": ["error"],
      "regexp/no-useless-escape": ["error"],
      "regexp/no-useless-flag": ["error"],
      "regexp/no-useless-lazy": ["error"],
      "regexp/no-useless-non-capturing-group": ["error"],
      "regexp/no-useless-quantifier": ["error"],
      "regexp/no-useless-range": ["error"],
      "regexp/no-useless-set-operand": ["error"],
      "regexp/no-useless-string-literal": ["error"],
      "regexp/no-useless-two-nums-quantifier": ["error"],
      "regexp/no-zero-quantifier": ["error"],
      "regexp/optimal-lookaround-quantifier": ["error"],
      "regexp/optimal-quantifier-concatenation": [
        "error",
        {
          capturingGroups: "report",
        },
      ],
      "regexp/prefer-character-class": [
        "error",
        {
          minAlternatives: 2,
        },
      ],
      "regexp/prefer-d": [
        "error",
        {
          insideCharacterClass: "range",
        },
      ],
      "regexp/prefer-escape-replacement-dollar-char": ["error"],
      "regexp/prefer-lookaround": [
        "error",
        {
          lookbehind: true,
          strictTypes: true,
        },
      ],
      "regexp/prefer-named-backreference": ["error"],
      "regexp/prefer-named-capture-group": ["off"],
      "regexp/prefer-named-replacement": ["error"],
      "regexp/prefer-plus-quantifier": ["error"],
      "regexp/prefer-predefined-assertion": ["error"],
      "regexp/prefer-quantifier": ["error"],
      "regexp/prefer-question-quantifier": ["error"],
      "regexp/prefer-range": [
        "error",
        {
          target: "alphanumeric",
        },
      ],
      "regexp/prefer-regexp-exec": ["error"],
      "regexp/prefer-regexp-test": ["error"],
      "regexp/prefer-result-array-groups": [
        "error",
        {
          strictTypes: true,
        },
      ],
      "regexp/prefer-set-operation": ["error"],
      "regexp/prefer-star-quantifier": ["error"],
      "regexp/prefer-unicode-codepoint-escapes": ["error"],
      "regexp/prefer-w": ["error"],
      "regexp/require-unicode-regexp": ["error"],
      "regexp/require-unicode-sets-regexp": ["off"],
      "regexp/simplify-set-operations": ["error"],
      "regexp/sort-alternatives": ["error"],
      "regexp/sort-character-class-elements": [
        "error",
        {
          order: ["\\s", "\\w", "\\d", "\\p", "*"],
        },
      ],
      "regexp/sort-flags": ["error"],
      "regexp/strict": ["error"],
      "regexp/unicode-escape": ["error", "unicodeEscape"],
      "regexp/unicode-property": [
        "error",
        {
          generalCategory: "never",
          key: "long",
          property: {
            binary: "long",
            generalCategory: "long",
            script: "long",
          },
        },
      ],
      "regexp/use-ignore-case": ["error"],

      // https://github.com/ericcornelissen/eslint-plugin-top#readme
      "top/no-top-level-side-effects": [
        "error",
        {
          allowedCalls: ["Symbol"],
          allowedNews: [],
          allowIIFE: false,
          commonjs: false,
        },
      ],
      "top/no-top-level-variables": [
        "error",
        {
          allowed: ["ArrayExpression"],
          kind: ["const"],
        },
      ],
    },
  },
  {
    name: "Tests",
    files: ["test/**/*.js"],
    plugins: { ava, jsdoc },
    rules: {
      // https://github.com/gajus/eslint-plugin-jsdoc#readme
      "jsdoc/check-values": [
        "error",
        {
          allowedLicenses: ["MIT", "MPL-2.0"],
        },
      ],
      "jsdoc/require-jsdoc": ["off"],

      // https://github.com/avajs/eslint-plugin-ava#readme
      "ava/assertion-arguments": ["error"],
      "ava/hooks-order": ["error"],
      "ava/max-asserts": ["error", 5],
      "ava/no-async-fn-without-await": ["error"],
      "ava/no-duplicate-modifiers": ["error"],
      "ava/no-identical-title": ["error"],
      "ava/no-ignored-test-files": ["off"],
      "ava/no-import-test-files": ["error"],
      "ava/no-incorrect-deep-equal": ["error"],
      "ava/no-inline-assertions": ["error"],
      "ava/no-nested-tests": ["error"],
      "ava/no-only-test": ["error"],
      "ava/no-skip-assert": ["error"],
      "ava/no-skip-test": ["error"],
      "ava/no-todo-implementation": ["error"],
      "ava/no-todo-test": ["warn"],
      "ava/no-unknown-modifiers": ["error"],
      "ava/prefer-async-await": ["error"],
      "ava/prefer-power-assert": ["off"],
      "ava/prefer-t-regex": ["off"], // TODO: disabled because of incompatibility with ESLint v9
      "ava/test-title": ["error"],
      "ava/test-title-format": [
        "error",
        {
          format: "^[^A-Z].*$",
        },
      ],
      "ava/use-t": ["off"],
      "ava/use-t-throws-async-well": ["error"],
      "ava/use-t-well": ["error"],
      "ava/use-test": ["error"],
      "ava/use-true-false": ["error"],
    },
  },
  {
    name: "Scripts",
    files: [".github/**/*.js", "script/**/*.js"],
    plugins: { jsdoc },
    rules: {
      // https://github.com/gajus/eslint-plugin-jsdoc#readme
      "jsdoc/check-values": [
        "error",
        {
          allowedLicenses: ["MIT-0"],
        },
      ],
      "jsdoc/require-jsdoc": ["off"],
    },
  },
  {
    name: "Configs",
    files: ["config/**/*"],
    plugins: { jsdoc },
    rules: {
      // https://github.com/gajus/eslint-plugin-jsdoc#readme
      "jsdoc/require-file-overview": ["off"],
      "jsdoc/require-jsdoc": ["off"],
    },
  },
  {
    name: "JSON",
    files: ["config/**/*.json", ".licensee.json", "package.json"],
    plugins: { json },
    language: "json/json",
    rules: {
      // https://github.com/eslint/json/blob/main/README.md#rules
      "json/no-duplicate-keys": ["error"],
      "json/no-empty-keys": ["error"],
    },
  },
  {
    name: "JSONC",
    files: ["config/**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    languageOptions: {
      allowTrailingCommas: true,
    },
    rules: {
      // https://github.com/eslint/json/blob/main/README.md#rules
      "json/no-duplicate-keys": ["error"],
      "json/no-empty-keys": ["error"],
    },
  },
  {
    name: "YAML",
    files: [".github/**/*.yml", "config/**/*.yml", ".lockfile-lintrc.yml"],
    plugins: { yml },
    rules: {
      // https://ota-meshi.github.io/eslint-plugin-yml/rules/
      "yml/block-mapping": ["error", "always"],
      "yml/block-mapping-colon-indicator-newline": ["error", "never"],
      "yml/block-mapping-question-indicator-newline": ["error", "never"],
      "yml/block-sequence": ["error", "always"],
      "yml/block-sequence-hyphen-indicator-newline": ["error", "never"],
      "yml/file-extension": [
        "error",
        {
          extension: "yml",
          caseSensitive: true,
        },
      ],
      "yml/indent": [
        "error",
        2,
        {
          indentBlockSequences: true,
          indicatorValueIndent: 2,
        },
      ],
      "yml/key-name-casing": ["off"],
      "yml/key-spacing": [
        "error",
        {
          afterColon: true,
          beforeColon: false,
          mode: "strict",
        },
      ],
      "yml/no-empty-document": ["error"],
      "yml/no-empty-key": ["error"],
      "yml/no-empty-mapping-value": ["error"],
      "yml/no-empty-sequence-entry": ["error"],
      "yml/no-irregular-whitespace": ["error"],
      "yml/no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
      "yml/no-tab-indent": ["error"],
      "yml/no-trailing-zeros": ["error"],
      "yml/plain-scalar": ["error", "always"],
      "yml/quotes": [
        "error",
        {
          avoidEscape: true,
          prefer: "double",
        },
      ],
      "yml/require-string-key": ["error"],
      "yml/sort-keys": ["off"],
      "yml/sort-sequence-values": ["off"],
      "yml/spaced-comment": ["error", "always"],
      "yml/vue-custom-block/no-parsing-error": ["off"],
    },
  },
  {
    ignores: [
      "_reports/",
      ".temp/",
      "node_modules/",
      "script/maybe-run.js",
      "src/modules/*.cjs",
      "src/modules/*.d.cts",
    ],
  },

  ...yml.configs["flat/base"],
];
