/**
 * @fileoverview setTimeout
 * @author yeyan1996
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
// @see https://cn.eslint.org/docs/developer-guide/working-with-rules#rule-basics
//------------------------------------------------------------------------------
module.exports = {
    meta: {
        // 报错信息描述
        messages: {
            fuzzySetTimeout: "禁止给定时器直接使用数字作为时间",
        },
    },

    create(context) {
        return {
            "CallExpression"(node) {
                let nameNode = node.callee && node.callee.name;
                let timeNode = node.arguments && node.arguments[1];
                if (nameNode !== 'setTimeout') return;
                if (!timeNode) return
                // 0 秒定时器是允许的
                if ((timeNode.type === 'NumberLiteral' || timeNode.type === 'Literal') && timeNode.value !== 0) {
                    context.report({
                        node,
                        messageId: 'fuzzySetTimeout'
                    })
                } else {
                    // setTimeout 第二个参数可能是一个表达式
                    // 使用 eval 执行表达式
                    // todo 希望有更好的方案
                    let sourceCode = context.getSourceCode()
                    let timeCode = sourceCode.getText(timeNode)
                    try {
                        let time = eval(timeCode)
                        if (time !== 0) {
                            context.report({
                                node,
                                messageId: 'fuzzySetTimeout'
                            })
                        }
                    } catch (e) {
                        // 引用外部变量会直接报错，但是符合当前规则的定义
                    }
                }
            }
        };
    }
};
