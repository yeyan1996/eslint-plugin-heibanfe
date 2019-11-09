const utils = require('eslint-plugin-vue/lib/utils');

const firstWordUpperCase = (str) => str.replace(/\b(\w)(\w*)/g, ($0, $1, $2) => $1.toUpperCase() + $2);
const verifyNode = (node) => node && node.value && node.value.value && typeof node.value.value === 'string';

module.exports = {
  meta: {
    // 报错信息描述
    messages: {
      sameFilenameComponentName: '.vue 文件名必须和组件的 name 属性相同',
    },
    fixable: 'code',
  },

  create(context) {
    const report = (node) => {
      context.report({
        node,
        messageId: 'sameFilenameComponentName',
        fix(fixer) {
          let filename = context.getFilename();
          filename = firstWordUpperCase(filename.slice(0, filename.lastIndexOf('.')));
          return fixer.replaceText(node.value, filename);
        },
      });
    };
    // objNode 为 .vue 文件中 export default 导出的对象的 node 节点
    return utils.executeOnVueComponent(context, (objNode) => {
      if (!objNode.properties) return;
      const nameProperty = objNode.properties.find((node) => node.key.name === 'name');
      if (!verifyNode(nameProperty)) return;
      const componentName = firstWordUpperCase(nameProperty.value.value);
      if (!componentName) return;

      let filename = context.getFilename();
      filename = firstWordUpperCase(filename.slice(0, filename.lastIndexOf('.')));
      if (componentName !== filename) {
        report(nameProperty);
      }
    });
  },
};
