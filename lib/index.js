
const requireIndex = require('requireindex');

module.exports = {
  // import all rules in lib/rules
  rules: requireIndex(`${__dirname}/rules`),
  // processors: {
  //     '.vue': {
  //         preprocess (code) {
  //             console.log('--------------------------------------',code)
  //             return [code]
  //         },
  //     }
  // }
};
