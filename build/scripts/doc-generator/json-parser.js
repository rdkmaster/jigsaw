var fs = require('fs');

var input = process.argv[2];
if (!fs.existsSync(input)) {
    console.log('need a input json file!');
    process.exit(1);
}
var docInfo = require(input);
if (!docInfo || !docInfo.components || !docInfo.components.length) {
    console.log('input json file is invalid!');
    process.exit(1);
}
var components = docInfo.components;

var output = process.argv[3];
if (!fs.existsSync(output)) {
    console.log('need a output dir!');
    process.exit(1);
}
output = output[output.length - 1] == '/' ? output.substring(0, output.length - 1) : output;

components.forEach(ci => {
    var md = getMarkdownTemplate();
    var inputs = [];
    ci.inputsClass.forEach(input => {
        input.description = input.hasOwnProperty('description') ? input.description : '';
        inputs.push(`<tr>
            <td>${input.name}</td><td>${input.description}</td>
            <td>${input.type}</td><td>${input.defaultValue}</td><td>${}</td></tr>`);
    })
});

function parseExtensionInfo(description) {
    var info = {};
    if (!description) {
        info.desc = description;
        return info;
    }
    description.replace(/<p>\s*\$\w+\s*=\s*.*\s*<\/p>/g, function() {

        // remove these messages
        return '';
    })

}

function getMarkdownTemplate() {
    return `
# $componentName

起始版本：$version

## 选择器 / Selectors

$selectors

## 输入 / Inputs

<table>
    <thead>
        <tr><th>名称</th><th>说明</th><th>类型</th><th>默认值</th><th>起始版本</th></tr>
    </thead>
    <tbody>$inputs</tbody>
</table>

## 输出 / Outputs

$outputs

## 属性

$properties

## 方法

$methods

## 已知问题及应对措施

$knownIssues

## 典型用法

$usuallyUsages
`
}
