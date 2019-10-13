"use strict";

//------------------------------------------------------------------------------
// Rule Definition
// @see https://cn.eslint.org/docs/developer-guide/working-with-rules#rule-basics
//------------------------------------------------------------------------------


module.exports = {
    meta: {
        // 报错信息描述
        messages: {
            noStaticMethod: "禁止给Vue添加静态方法",
        },
    },
    create(context) {
        return {
            "AssignmentExpression"(node) {
                let name = node.left && node.left.object && node.left.object.name
                if(!name) return
                if (node.left.object.name === 'Vue') {
                    context.report({
                        node,
                        messageId: 'noStaticMethod'
                    })
                }
            }
        };
    }
};
