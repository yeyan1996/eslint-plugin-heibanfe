const inquirer = require('inquirer')
const {execSync} = require("child_process")
const task = tasks => tasks.join("&&")

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
        task([
            `npm version ${version.type}`,
            `npm publish`,
        ])
    )
}).catch(e=> console.log(e))
