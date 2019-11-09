/**
 * @fileoverview setTimeout
 * @author yeyan1996
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-data-attribute");
const tester = require("../index");

tester.run("max-data-attribute", rule, {
  valid: [
    {
      filename: "test.vue",
      code: `
        export default {
          data () {
            return {
              msg: 'Welcome to Your Vue.js App'
            }
          },
        }
      `
    },
    {
      filename: "test.vue",
      code: `
        export default {
          data:()=>({
              msg: 'Welcome to Your Vue.js App'
          })
        }
      `
    },
    {
      filename: "test.vue",
      code: `
        export default {
          data:{}
        }
      `
    }
  ],

  invalid: [
    {
      filename: "test.vue",
      code: `
        export default {
          data () {
            return {
              msg: 1,
              msg2: 1,
              msg3: 1,
              msg4: 1,
              msg5: 1,
              msg6: 1,
              msg7: 1,
              msg8: 1,
              msg9: 1
            }
          },
        }
      `,
      errors: [
        {
          message: "data 根属性的数量最大为 8 个"
        }
      ]
    },
    {
      filename: "test.vue",
      code: `
          export default {
            data:function() {
              return {
                msg: 1,
                msg2: 1,
                msg3: 1,
                msg4: 1,
                msg5: 1,
                msg6: 1,
                msg7: 1,
                msg8: 1,
                msg9: 1
              }
            },
          }
      `,
      errors: [
        {
          message: "data 根属性的数量最大为 8 个"
        }
      ]
    },
    {
      filename: "test.vue",
      code: `
          export default {
            data:()=> {
              return {
                msg: 1,
                msg2: 1,
                msg3: 1,
                msg4: 1,
                msg5: 1,
                msg6: 1,
                msg7: 1,
                msg8: 1,
                msg9: 1
              }
            },
          }
      `,
      errors: [
        {
          message: "data 根属性的数量最大为 8 个"
        }
      ]
    },

    {
      filename: "test.vue",
      options: [5],
      code: `
        export default {
          data () {
          let a = 1
            return {
              msg: 1,
              msg2: 1,
              msg3: 1,
              msg4: 1,
              msg5: 1,
              msg6: 1,
              msg7: 1,
              msg8: 1,
              msg9: 1
            }
          },
        }
      `,
      errors: [
        {
          message: "data 根属性的数量最大为 5 个"
        }
      ]
    },
    {
      filename: "test.vue",
      options: [5],
      code: `
        export default {
          data () {
            return {
              msg: 1,
              msg2: 1,
              msg3: 1,
              msg4: 1,
              msg5: 1,
              msg6: 1,
              msg7: 1,
              msg8: 1,
              msg9: 1
            }
          },
        }
      `,
      errors: [
        {
          message: "data 根属性的数量最大为 5 个"
        }
      ]
    }
  ]
});
