const fs = require("fs");
const glob = require('glob').sync;

const excludesFiles = [
    'common/core/data/graph-data.ts', 'common/core/theming/echarts-theme.ts'
];

process.chdir(`${__dirname}/../../src/jigsaw/`);

const sourceFiles = [
    ...glob('**/*.@(ts|html|css|scss)', {cwd: `pc-components`}).map(f => `pc-components/${f}`),
    ...glob('**/*.@(ts|html|css|scss)', {cwd: `common`}).map(f => `common/${f}`),
];
const invalidFiles = sourceFiles.filter(file => {
    if (file.endsWith('.spec.ts') || excludesFiles.some(ef => file.endsWith(ef))) {
        return false;
    }
    const src = fs.readFileSync(file).toString()
        // 去掉手工忽略的代码段
        .replace(/@ignoring-i18n-start[\s\S]*?@ignoring-i18n-end\b/, '')
        // 代码里的注释，这里头是有汉字的
        .replace(/\/\/.*$/mg, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        // 去掉控制台打印里的汉字
        .replace(/\bconsole\.(log|error|info|warn)\(.*?\)/g, '')
        // 删掉国际化词条定义的代码
        .replace(/\bTranslateHelper\.initI18n\([\s\S]*?}\);?/g, '')
    return /\p{Unified_Ideograph}/u.test(src);
});
if (invalidFiles.length > 0) {
    console.log("以下代码中疑似包含未国际化的汉字，请检查");
    console.log(invalidFiles.map(f => `  --> ${f}`).join('\n'));
    console.log("----------------------------------------------------------------------------------------------");
    console.log("提示，可以使用类似如下格式来忽略误报的代码片段");
    console.log("  // @ignoring-i18n-start");
    console.log("  public data1 = '这个词条是误报的';");
    console.log("  public data2 = '这个词条也是误报的';");
    console.log("  // @ignoring-i18n-end");
    console.log("----------------------------------------------------------------------------------------------");
}
process.exit(invalidFiles.length);
