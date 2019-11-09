const utils = require("eslint-plugin-vue/lib/utils");

const isArrayExpression = node => node.type === "ArrayExpression";
const isObjectExpression = node => node.type === "ObjectExpression";
const DEFAULT = 5;

module.exports = {
  meta: {
    // 报错信息描述
    messages: {
      maxPropsAttribute: "props 根属性的数量最大为 {{number}} 个"
    }
  },

  create(context) {
    const MAX_NUMBER = context.options[0] || DEFAULT;

    const report = node => {
      context.report({
        node,
        messageId: "maxPropsAttribute",
        data: {
          number: MAX_NUMBER
        }
      });
    };

    // objNode 为 .vue 文件中 export default 导出的对象的 node 节点
    return utils.executeOnVueComponent(context, objNode => {
      const propsNode = objNode.properties.find(
        node => node.key.name === "props"
      );
      if (!propsNode || !propsNode.value) return;
      if (isArrayExpression(propsNode.value)) {
        // props 值是数组
        if (propsNode.value.elements.length > MAX_NUMBER) {
          report(propsNode);
        }
      } else if (isObjectExpression(propsNode.value)) {
        // props 值是对象
        if (propsNode.value.properties.length > MAX_NUMBER) {
          report(propsNode);
        }
      }
    });
  }
};
