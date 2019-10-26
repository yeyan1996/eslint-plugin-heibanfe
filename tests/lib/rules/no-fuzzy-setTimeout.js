/**
 * @fileoverview setTimeout
 * @author yeyan1996
 */


//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-fuzzy-setTimeout');
const tester = require('../index');

tester.run('no-fuzzy-setTimeout', rule, {

  valid: [
    'setTimeout(()=>{},X)',
    'setTimeout(()=>{},Number(0))',
  ],

  invalid: [
    {
      code: 'setTimeout(()=>{},300)',
      errors: [{
        message: '禁止给定时器直接使用数字作为时间',
        type: 'CallExpression',
      }],
    },
    {
      code: 'setTimeout(()=>{},150 + 200)',
      errors: [{
        message: '禁止给定时器直接使用数字作为时间',
        type: 'CallExpression',
      }],
    },
    {
      code: 'setTimeout(()=>{},Number(200) + Number(500))',
      errors: [{
        message: '禁止给定时器直接使用数字作为时间',
        type: 'CallExpression',
      }],
    },
  ],
});
