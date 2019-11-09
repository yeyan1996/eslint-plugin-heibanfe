/**
 * @fileoverview setTimeout
 * @author yeyan1996
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-props-attribute");
const tester = require("../index");

tester.run("max-props-attribute", rule, {
  valid: [
    {
      filename: "test.vue",
      code: `
        export default {
          props:{
            a:1
          }
        }
      `
    },
    {
      filename: "test.vue",
      code: `
        export default {
          props:["a","b"]
        }
      `
    },
    {
      filename: "test.vue",
      code: `
        export default {
          props:123
        }
      `
    }
  ],

  invalid: [
    {
      filename: "test.vue",
      code: `
        export default {
          props:{
             a:1,
            b:2,
            c:3,
            d:4,
            e:5,
            f:6
          }
        }
      `,
      errors: [
        {
          message: "props 根属性的数量最大为 5 个"
        }
      ]
    },
    {
      filename: "test.vue",
      code: `
        export default {
         props:["a","b","c","d","e","f"]
        }
      `,
      errors: [
        {
          message: "props 根属性的数量最大为 5 个"
        }
      ]
    },
    {
      filename: "test.vue",
      options: [3],
      code: `
        export default {
          props:{
            a:1,
            b:2,
            c:3,
            d:4,
            e:5,
            f:6
          }
        }
      `,
      errors: [
        {
          message: "props 根属性的数量最大为 3 个"
        }
      ]
    },
    {
      filename: "test.vue",
      options: [3],
      code: `
         export default {
         props:["a","b","c","d","e","f"]
        }
      `,
      errors: [
        {
          message: "props 根属性的数量最大为 3 个"
        }
      ]
    }
  ]
});
