# eslint-plugin-heibanfe

晓信前端 eslint 插件扩展包

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-heibanfe`:

```
$ npm install eslint-plugin-heibanfe --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-heibanfe` globally.

## Usage

Add `heibanfe` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "heibanfe"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "heibanfe/rule-name": "error"
    }
}
```

## Supported Rules

* no-static-method
* no-fuzzy-setTimeout
* max-data-attribute
* max-props-attribute




