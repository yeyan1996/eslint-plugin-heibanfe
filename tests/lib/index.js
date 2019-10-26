const { RuleTester } = require('eslint');

module.exports = new RuleTester({
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
  },
});
