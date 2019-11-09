const utils = require("eslint-plugin-vue/lib/utils");

const firstWordUpperCase = str =>
  str.replace(/\b(\w)(\w*)/g, ($0, $1, $2) => $1.toUpperCase() + $2);
const removeExt = str => str.slice(0, str.lastIndexOf("."));
const removeParentPath = str =>
  str.includes("/") ? str.slice(str.lastIndexOf("/") + 1, str.length) : str;
const pipe = (...fns) => arg => fns.reduce((pre, cur) => cur(pre), arg);

const verifyNode = node =>
  node.value && node.value.value && typeof node.value.value === "string";

module.exports = {
  meta: {
    // 报错信息描述
    messages: {
      sameFilenameComponentName: ".vue 文件名必须和组件的 name 属性相同"
    },
    fixable: "code"
  },

  create(context) {
    const originPath = context.getFilename();
    const filename = pipe(
      removeParentPath,
      removeExt,
      firstWordUpperCase
    )(originPath);

    const report = node => {
      context.report({
        node,
        messageId: "sameFilenameComponentName",
        fix(fixer) {
          return fixer.replaceTextRange(
            [node.value.range[0] + 1, node.value.range[1] - 1],
            filename
          );
        }
      });
    };
    // objNode 为 .vue 文件中 export default 导出的对象的 node 节点
    return utils.executeOnVueComponent(context, objNode => {
      if (!objNode.properties) return;
      const nameProperty = objNode.properties.find(
        node => node.key.name === "name"
      );
      if (!nameProperty) return;
      if (!verifyNode(nameProperty)) {
        report(nameProperty);
        return;
      }
      const componentName = firstWordUpperCase(nameProperty.value.value);
      if (!componentName) return;

      if (componentName !== filename) {
        report(nameProperty);
      }
    });
  }
};
