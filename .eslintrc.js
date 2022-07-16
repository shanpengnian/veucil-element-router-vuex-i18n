module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // enable additional rules
        "indent": ['error', 4],
        "linebreak-style": ["error", "unix"],
        // "quotes": ["error", "double"],
        semi: ["error", "never"],

        // override default options for rules from base configurations
        "comma-dangle": ["error", "never"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "no-console": "off",
        "space-in-parens": ['error', "never"],
        "linebreak-style": ["off", "windows"],
        'space-before-blocks': ["error", "always"],
        "space-before-function-paren": ["error", "never"],
    }
}
