/**
 * @fileoverview setTimeout
 * @author yeyan1996
 */


//------------------------------------------------------------------------------
// Rule Definition
// @see https://cn.eslint.org/docs/developer-guide/working-with-rules#rule-basics
//------------------------------------------------------------------------------

const isLiteral = (node) => node.type === 'NumberLiteral' || node.type === 'Literal';
const isSetTimeout = (node) => node.callee && node.callee.name === 'setTimeout';

module.exports = {
  meta: {
    // 报错信息描述
    messages: {
      fuzzySetTimeout: '禁止给定时器直接使用数字作为时间',
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        const timeNode = node.arguments && node.arguments[1];
        if (!isSetTimeout(node)) return;
        if (!timeNode) return;
        // 0 秒定时器是允许的
        if (isLiteral(timeNode) && timeNode.value !== 0) {
          context.report({
            node,
            messageId: 'fuzzySetTimeout',
          });
        } else {
          // setTimeout 第二个参数可能是一个表达式
          // 这里使用 eval 运行表达式，返回结果
          // todo 希望有更好的方案
          const sourceCode = context.getSourceCode();
          const timeCode = sourceCode.getText(timeNode);
          try {
            // eslint-disable-next-line no-eval
            const time = eval(timeCode);
            if (time !== 0) {
              context.report({
                node,
                messageId: 'fuzzySetTimeout',
              });
            }
          } catch (e) {
            // 引用外部变量会直接报错，但是符合当前规则的定义
          }
        }
      },
    };
  },
};
