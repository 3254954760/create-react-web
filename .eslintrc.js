module.exports = {
    parser: '@typescript-eslint/parser',
    // 优先级高的放后面
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
    env: {
        es6: true,
        node: true
    },
    root: true,
    plugins: ['@typescript-eslint', 'react-hooks', 'react', 'prettier'],
    overrides: [
        {
            // 针对 build 目录下的 JavaScript 配置文件
            files: ['build/**/*.js'],
            parser: 'espree', // 使用默认的 JavaScript 解析器
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module'
            },
            rules: {
                // 禁用 TypeScript 相关规则
                '@typescript-eslint/no-var-requires': 'off', // 允许 require()
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off'
                // 其他需要禁用的 TypeScript 规则...
            }
        },
        {
            // 针对 ESLint 配置文件本身
            files: ['.eslintrc.js'],
            parser: 'espree',
            rules: {
                '@typescript-eslint/no-var-requires': 'off'
            }
        }
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true // 开启 JSX 支持
        },
        project: './tsconfig.json' // 指定 tsconfig 文件路径
    },
    globals: {
        map: true,
        Page: true,
        wx: true,
        getApp: true,
        Component: true,
        getCurrentPages: true,
        requirePlugin: true,
        Behavior: true,
        App: true
    },
    rules: {
        curly: ['error', 'all'],
        'brace-style': ['error', '1tbs'],
        // 默认是4个空格
        indent: ['error', 4, { SwitchCase: 1 }],
        // 打开语句强制分号结尾
        semi: [2, 'always'],
        'no-prototype-builtins': 'off',
        // 'vetur.validation.template': false,
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'no-dupe-else-if': 'off',
        'no-unused-vars': 'warn',
        'no-mixed-spaces-and-tabs': 'error', // 禁止使用 空格 和 tab 混合缩进
        'no-regex-spaces': 'error', // 禁止正则表达式字面量中出现多个空格
        'no-multi-spaces': 'error', // 禁止出现多个空格而且不是用来作缩进的
        'array-bracket-spacing': ['error', 'never'], // 数组紧贴括号部分不允许包含空格。
        'object-curly-spacing': ['error', 'always'], // 对象紧贴花括号部分不允许包含空格。
        'block-spacing': ['error', 'never'], // 单行代码块中紧贴括号部分不允许包含空格。
        'comma-spacing': ['error', { before: false, after: true }], // 在变量声明、数组字面量、对象字面量、函数参数 和 序列中禁止在逗号前使用空格,要求在逗号后使用一个或多个空格
        'semi-spacing': ['error', { before: false, after: true }], // 禁止分号周围的空格
        'computed-property-spacing': ['error', 'never'], // 禁止括号和其内部值之间的空格
        // eslint-disable-next-line max-len
        // 'eslint keyword-spacing': ['error', {'before': true, 'after': true}], // 该规则强制关键字和类似关键字的符号周围空格的一致性：as、break、case、catch、class、const、continue、debugger、default、delete、do、else、export、extends、finally、for、from、function、get、if、import、in、instanceof、let、new、of、return、set、static、super、switch、this、throw、try、typeof、var、void、while、with 和 yield。
        'no-trailing-spaces': 'error', // 禁用行尾空格
        'no-spaced-func': 'error', // 禁止 function 标识符和圆括号之间有空格
        'space-before-blocks': ['error', 'always'], // 禁止语句块之前的空格
        'space-in-parens': ['error', 'never'], // 禁止圆括号内的空格
        'space-infix-ops': ['error', { int32Hint: false }], // 要求中缀操作符周围有空格,设置 int32Hint 选项为 true (默认 false) 允许 a|0 不带空格。
        'space-unary-ops': 'error', // 要求或禁止在一元操作符之前或之后存在空格,new、delete、typeof、void、yield要求有空格，-、+、--、++、!、!!要求无空格。
        'spaced-comment': ['error', 'always'], // 要求在注释前有空白
        'arrow-spacing': 'error', // 要求箭头函数的箭头之前和之后有空格
        'generator-star-spacing': ['error', { before: false, after: true }], // 强制 generator 函数中 * 号前有空格，后无空格。
        'yield-star-spacing': ['error', { before: true, after: false }], // 强制 yield* 表达式中  * 号前有空格，后无空格。
        'no-irregular-whitespace': 'error', // 禁止不规则的空白。
        'template-curly-spacing': ['error', 'never'], // 强制模板字符串中花括号内不能出现空格,
        'no-bitwise': ['off'],
        camelcase: 'off',
        'comma-dangle': ['error', 'never'],
        'max-len': ['error', { code: 300 }]
    }
};
