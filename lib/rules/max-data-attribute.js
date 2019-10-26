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
    // objNode 为 .vue 文件中 export default 导出的对象的 node 节点
    return utils.executeOnVueComponent(context, (objNode) => {
      const dataNode = objNode.properties.find((node) => node.key.name === 'data');
      if (!dataNode) return;
      // 方法
      if (dataNode.method) {
        const returnNode = dataNode.value.body.body.find((node) => node.type === 'ReturnStatement');
        if (!returnNode) return;
        if (returnNode.argument.properties.length > MAX_NUMBER) {
          context.report({
            node: dataNode,
            messageId: 'maxDataAttribute',
            data: {
              number: MAX_NUMBER,
            },
          });
        }
        return;
      }
      // 箭头函数
      if (dataNode.type === 'Property') {
        const returnObjNode = dataNode.value.body;
        if (returnObjNode.properties.length > MAX_NUMBER) {
          context.report({
            node: dataNode,
            messageId: 'maxDataAttribute',
            data: {
              number: MAX_NUMBER,
            },
          });
        }
      }
    });
  },
};
