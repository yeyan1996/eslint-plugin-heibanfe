const requireIndex = require("requireindex");

module.exports = {
  // import all rules in lib/rules
  rules: requireIndex(`${__dirname}/rules`)
};
