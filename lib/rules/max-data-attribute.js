const utils = require('eslint-plugin-vue/lib/utils');


module.exports = {
  meta: {
    // 报错信息描述
    messages: {
      maxDataAttribute: 'data 根属性的数量最大为 {{number}} 个',
    },
  },

  create(context) {
    const MAX_NUMBER = context.options[0] || 8;

    const report = (node) => {
      context.report({
        node,
        messageId: 'maxDataAttribute',
        data: {
          number: MAX_NUMBER,
        },
      });
    };

    // objNode 为 .vue 文件中 export default 导出的对象的 node 节点
    return utils.executeOnVueComponent(context, (objNode) => {
      const dataNode = objNode.properties.find((node) => node.key.name === 'data');
      if (!dataNode) return;
      // 方法
      if (dataNode.method) {
        const returnStatement = dataNode.value.body.body.find((node) => node.type === 'ReturnStatement');
        if (!returnStatement) return;
        if (returnStatement.argument.properties.length > MAX_NUMBER) {
          report(dataNode);
        }
        return;
      }
      // 箭头函数
      if (dataNode.type === 'Property') {
        const arrowFunctionExpression = dataNode.value;
        // 箭头函数直接返回对象的情况
        if (!arrowFunctionExpression.body.body) {
          if (arrowFunctionExpression.body.properties.length > MAX_NUMBER) {
            report(dataNode);
          }
          return;
        }
        // 箭头函数显式声明 return 返回对象的情况
        const returnStatement = arrowFunctionExpression.body.body.find((node) => node.type === 'ReturnStatement');
        if (!returnStatement) return;
        if (returnStatement.argument.properties.length > MAX_NUMBER) {
          report(dataNode);
        }
      }
    });
  },
};
