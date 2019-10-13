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
                const report = () => context.report({
                    node,
                    messageId: 'fuzzySetTimeout'
                })
                let nameNode = node.callee.name
                let timeNode = node.arguments[1]
                if (nameNode !== 'setTimeout') return;
                if (!timeNode) return
                // 0 秒定时器是允许的
                if (timeNode.type === 'NumberLiteral' && timeNode.value !== 0) {
                    report()
                } else {
                    // todo 希望有更好的方案
                    // 可能是一个表达式
                    // 使用 eval 执行表达式
                    let sourceCode = context.getSourceCode()
                    let timeCode = sourceCode.getText(timeNode)
                    try {
                        let time = eval(timeCode)
                        if (time !== 0) {
                            report()
                        }
                    } catch (e) {
                        // 变量会直接报错，但是符合当前规则的定义
                    }
                }
            }
        };
    }
};
