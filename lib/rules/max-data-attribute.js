const utils = require("eslint-plugin-vue/lib/utils");

const DEFAULT = 8;
const isMethod = node => node.method;
const isProperty = node => node.type === "Property";
const isFunction = node =>
  node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression";
const hasProperties = node => node && node.argument && node.argument.properties;

module.exports = {
  meta: {
    // 报错信息描述
    messages: {
      maxDataAttribute: "data 根属性的数量最大为 {{number}} 个"
    }
  },

  create(context) {
    const MAX_NUMBER = context.options[0] || DEFAULT;

    const report = node => {
      context.report({
        node,
        messageId: "maxDataAttribute",
        data: {
          number: MAX_NUMBER
        }
      });
    };

    // objNode 为 .vue 文件中 export default 导出的对象的 node 节点
    return utils.executeOnVueComponent(context, objNode => {
      const dataNode = objNode.properties.find(
        node => node.key.name === "data"
      );
      if (!dataNode) return;
      // data 方法
      if (isMethod(dataNode)) {
        const returnStatement = dataNode.value.body.body.find(
          node => node.type === "ReturnStatement"
        );
        if (!hasProperties(returnStatement)) return;
        if (returnStatement.argument.properties.length > MAX_NUMBER) {
          report(dataNode);
        }
        return;
      }
      // data 属性
      if (isProperty(dataNode)) {
        // 箭头函数/普通函数
        const functionExpression = dataNode.value;
        if (!isFunction(functionExpression)) return;
        // 函数直接返回对象的情况
        if (!functionExpression.body.body) {
          if (functionExpression.body.properties.length > MAX_NUMBER) {
            report(dataNode);
          }
          return;
        }

        // 函数显式声明 return 返回对象的情况
        const returnStatement = functionExpression.body.body.find(
          node => node.type === "ReturnStatement"
        );
        if (!hasProperties(returnStatement)) return;
        if (returnStatement.argument.properties.length > MAX_NUMBER) {
          report(dataNode);
        }
      }
    });
  }
};
