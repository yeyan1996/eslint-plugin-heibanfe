"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-static-method")
const tester = require("../index")


tester.run("no-static-method", rule, {

    valid: [],

    invalid: [
        {
            code: "Vue.router = {}",
            errors: [{
                message: "禁止给Vue添加静态方法",
                type: "AssignmentExpression"
            }]
        },

        {
            code: "Vue.store = {}",
            errors: [{
                message: "禁止给Vue添加静态方法",
                type: "AssignmentExpression"
            }]
        },

    ]
});
