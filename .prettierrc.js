module.exports = {
    printWidth: 120,
    tabWidth: 4,
    // 使用tab缩紧
    useTabs: false,
    // 结尾是否添加分号
    semi: true,
    singleQuote: true,
    // object对象里面的key和value值和括号间的空格
    bracketSpacing: true,
    // 箭头函数单个参数的情况是否省略括号，默认always是总是带括号（arrowParens: "<always|avoid>"）
    arrowParens: 'avoid',
    // object对象中key值是否加引号，（quoteProps: "<as-needed|consistent|preserve>"）as-needed只有在需求要的情况下加引号，consistent是有一个需要引号就统一加，preserve是保留用户输入的引号
    quoteProps: 'as-needed',
    // 尾部逗号设置，es5是尾部逗号兼容es5，none就是没有尾部逗号，all是指所有可能的情况，需要node8和es2017以上的环境。（trailingComma: "<es5|none|all>"）
    trailingComma: 'none',
    // endOfLine: "<lf|crlf|cr|auto>" 行尾换行符,默认是lf,
    endOfLine: 'lf'
    // BracketLine: "",
    // Range: "",
    // Parser: "",
    // FilePath: "",
    // RequirePragma: "",
    // InsertPragma: "",
    // ProseWrap: "",
    // SingleAttributePerLine: ""
};
