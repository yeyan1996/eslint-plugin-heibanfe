const RuleTester = require("eslint").RuleTester;
module.exports = new RuleTester({
    parserOptions: {
        ecmaVersion: 10,
    },
});
