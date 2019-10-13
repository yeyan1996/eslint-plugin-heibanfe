const inquirer = require('inquirer')
const {execSync} = require("child_process")
const task = tasks => tasks.join("&&")

inquirer.prompt([
    {
        type: 'list',
        name: 'version',
        choices:['patch','major','minor'],
        message: 'which type does this update belongs to?',
        default: 'patch'
    }
]).then((version) => {
    execSync(
        task([
            `npm version ${version.type}`,
            `npm publish`,
        ])
    )
})
