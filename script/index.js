const inquirer = require('inquirer')
const {execSync} = require("child_process")

inquirer.prompt([
    {
        type: 'list',
        name: 'type',
        choices:['patch','minor','major'],
        message: 'which type does this update belongs to?',
        default: 'patch'
    }
]).then(version => {
    execSync(
        `npm version ${version.type} && npm publish`
    )
}).catch()
