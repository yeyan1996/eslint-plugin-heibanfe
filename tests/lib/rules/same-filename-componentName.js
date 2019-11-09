
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/same-filename-componentName');
const tester = require('../index');


tester.run('same-filename-componentName', rule, {

  valid: [
    {
      filename: 'test.vue',
      code: `
        export default {
            name:()=>{}
        }
      `,
    },
    {
      filename: 'test1.vue',
      code: `
        export default {
          name:"test1",
          props:{
            a:1
          }
        }
      `,
    },
    {
      filename: 'test.vue',
      code: `
        export default {

        }
      `,
    },

  ],

  invalid: [
    {
      filename: 'abc.vue',
      code: `
        export default {
         name:"test1"
        }
      `,
      errors: [{
        message: '.vue 文件名必须和组件的 name 属性相同',
      }],
    },
  ],
});
