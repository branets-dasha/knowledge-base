// ESLint config that I like
// Install packages:
// npm install --save-dev eslint @eslint/js typescript-eslint @stylistic/eslint-plugin
// npm script for CI/CD pipeline:
// "lint:ci": "eslint . --max-warnings 0 --output-file ./.reports/linter-report.html --format html"

import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['eslint.config.mjs'],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            // Stylistic rules
            '@stylistic/array-bracket-newline': ['warn', 'consistent'],
            '@stylistic/array-bracket-spacing': ['warn', 'never'],
            '@stylistic/array-element-newline': ['warn', { consistent: true, multiline: true, minItems: null }],
            '@stylistic/arrow-parens': ['warn', 'as-needed'],
            '@stylistic/arrow-spacing': ['warn', { before: true, after: true }],
            '@stylistic/block-spacing': ['warn', 'always'],
            '@stylistic/brace-style': ['warn', '1tbs'],
            '@stylistic/comma-dangle': ['warn', 'always-multiline'],
            '@stylistic/comma-spacing': ['warn', { before: false, after: true }],
            '@stylistic/comma-style': ['warn', 'last'],
            '@stylistic/computed-property-spacing': ['warn', 'never'],
            '@stylistic/curly-newline': ['warn', { consistent: true }],
            '@stylistic/dot-location': ['warn', 'property'],
            '@stylistic/eol-last': ['warn', 'always'],
            '@stylistic/function-call-argument-newline': ['warn', 'consistent'],
            '@stylistic/function-call-spacing': ['warn', 'never'],
            '@stylistic/function-paren-newline': ['warn', 'multiline-arguments'],
            '@stylistic/generator-star-spacing': ['warn', { before: false, after: true }],
            '@stylistic/implicit-arrow-linebreak': ['warn', 'beside'],
            '@stylistic/indent': ['warn', 4],
            '@stylistic/indent-binary-ops': ['warn', 4],
            '@stylistic/key-spacing': ['warn', { beforeColon: false, afterColon: true }],
            '@stylistic/keyword-spacing': ['warn', { before: true, after: true }],
            '@stylistic/lines-between-class-members': [
                'warn',
                {
                    enforce: [
                        { blankLine: 'always', prev: '*', next: 'method' },
                        { blankLine: 'always', prev: 'method', next: '*' },
                    ],
                },
                { exceptAfterSingleLine: true },
            ],
            '@stylistic/max-statements-per-line': ['warn', { max: 1 }],
            '@stylistic/member-delimiter-style': [
                'warn',
                {
                    multiline: { delimiter: 'semi', requireLast: true },
                    singleline: { delimiter: 'semi', requireLast: true },
                },
            ],
            '@stylistic/multiline-ternary': ['warn', 'always-multiline'],
            '@stylistic/new-parens': ['warn', 'always'],
            '@stylistic/no-confusing-arrow': ['warn', { allowParens: true }],
            '@stylistic/no-extra-parens': ['warn', 'functions'],
            '@stylistic/no-extra-semi': 'warn',
            '@stylistic/no-floating-decimal': 'warn',
            '@stylistic/no-mixed-operators': [
                'warn',
                {
                    allowSamePrecedence: true,
                    groups: [
                        ['+', '-', '*', '/', '%', '**'],
                        ['&', '|', '^', '~', '<<', '>>', '>>>', '&&', '||', '??', '?:'],
                        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                        ['in', 'instanceof'],
                    ],
                },
            ],
            '@stylistic/no-mixed-spaces-and-tabs': 'warn',
            '@stylistic/no-multi-spaces': 'warn',
            '@stylistic/no-multiple-empty-lines': 'warn',
            '@stylistic/no-tabs': 'warn',
            '@stylistic/no-trailing-spaces': 'warn',
            '@stylistic/no-whitespace-before-property': 'warn',
            '@stylistic/nonblock-statement-body-position': ['warn', 'beside'],
            '@stylistic/object-curly-newline': ['warn', { multiline: true, consistent: true }],
            '@stylistic/object-curly-spacing': ['warn', 'always'],
            '@stylistic/object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
            '@stylistic/one-var-declaration-per-line': ['warn', 'always'],
            '@stylistic/operator-linebreak': ['warn', 'before'],
            '@stylistic/padded-blocks': ['warn', 'never'],
            '@stylistic/padding-line-between-statements': [
                'warn',
                { blankLine: 'always', prev: 'import', next: '*' },
                { blankLine: 'any', prev: 'import', next: 'import' },
            ],
            '@stylistic/quote-props': ['warn', 'consistent-as-needed'],
            '@stylistic/quotes': ['warn', 'single', { avoidEscape: true }],
            '@stylistic/rest-spread-spacing': ['warn', 'never'],
            '@stylistic/semi': ['warn', 'always'],
            '@stylistic/semi-spacing': 'warn',
            '@stylistic/semi-style': ['warn', 'last'],
            '@stylistic/space-before-blocks': ['warn', 'always'],
            '@stylistic/space-before-function-paren': ['warn', { anonymous: 'always', asyncArrow: 'always', named: 'never' }],
            '@stylistic/space-in-parens': ['warn', 'never'],
            '@stylistic/space-infix-ops': 'warn',
            '@stylistic/space-unary-ops': ['warn', { nonwords: false, words: true }],
            '@stylistic/spaced-comment': [
                'warn',
                'always',
                {
                    block: {
                        balanced: true,
                        exceptions: ['*'],
                        markers: ['!'],
                    },
                    line: {
                        exceptions: ['/', '#'],
                        markers: ['/'],
                    },
                },
            ],
            '@stylistic/switch-colon-spacing': ['warn', { before: false, after: true }],
            '@stylistic/template-curly-spacing': ['warn', 'never'],
            '@stylistic/template-tag-spacing': ['warn', 'never'],
            '@stylistic/type-annotation-spacing': [
                'warn',
                {
                    before: false,
                    after: true,
                    overrides: { arrow: { before: true, after: true } },
                },
            ],
            '@stylistic/type-generic-spacing': 'warn',
            '@stylistic/type-named-tuple-spacing': 'warn',
            '@stylistic/wrap-iife': ['warn', 'any', { functionPrototypeMethods: true }],
            '@stylistic/wrap-regex': 'warn',
            '@stylistic/yield-star-spacing': ['warn', { before: false, after: true }],
            // TypeScript rules
            // @typescript-eslint customizations go here
        },
    },
);
