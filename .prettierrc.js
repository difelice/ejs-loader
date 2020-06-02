module.exports = {
    parser: 'babel',
    printWidth: 80,
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
    useTabs: false,
    bracketSpacing: true,
    overrides: [
        {
            files: '*.less',
            options: {
                parser: 'less',
            },
        },
    ],
};
