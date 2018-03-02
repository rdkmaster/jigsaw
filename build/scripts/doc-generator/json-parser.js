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
    if (ci.name !== 'JigsawTable') {
        // console.log(md);
        return;
    }



    fixMetaInfo(ci);
    ci.since = ci.since ? ci.since : 'v1.0.0';
    var md = getMarkdownTemplate();
    md = md.replace('$since', ci.since);

    var inputs = [];
    ci.inputsClass.forEach(input => {
        fixMetaInfo(input);
        input.since = input.since ? input.since : ci.since;
        input.defaultValue = input.defaultValue ? input.defaultValue : '';
        var dualBinding = ci.outputsClass.find(i => i.name == input.name + 'Change') ? '是' : '否';
        inputs.push(`
            <tr><td>${input.name}</td><td>${input.type}</td><td>${input.defaultValue}</td>
            <td>${dualBinding}</td><td>${input.description}</td><td>${input.since}</td></tr>
        `);
    });
    md = md.replace('$inputs', inputs.join(''));

    var outputs = [];
    ci.outputsClass.forEach(output => {
        fixMetaInfo(output);
        output.since = output.since ? output.since : ci.since;
        output.defaultValue = output.defaultValue ? output.defaultValue : '';
        var match = output.defaultValue.match(/<(.*)>/);
        var type = 'any';
        if (match) {
            type = match[1];
        }
        outputs.push(`
            <tr><td>${output.name}</td><td>${type}</td><td>${output.description}</td>
            <td>${output.since}</td></tr>
        `);
    });
    md = md.replace('$output', outputs.join(''));

    // 这块有点绕，当一个属性被拆开为getter/setter后，ci.propertiesClass就找不到他了
    // 但是会出现在ci.accessors里，而ci.accessors里还有一部分同时出现在inputsClass里的，需要剔除
    var propertiesClass = [].concat(ci.propertiesClass);
    if (ci.hasOwnProperty('accessors')) {
        for (var prop in ci.accessors) {
            if (ci.inputsClass.find(i => i.name == prop)) {
                // 同时出现在inputsClass里的，需要剔除
                continue;
            }
            var info = ci.accessors[prop];
            if (!info.hasOwnProperty('getSignature')) {
                // 不可读属性，不理他
                continue;
            }

            propertiesClass.push({
                name: info.name,
                type: info.getSignature.returnType || info.getSignature.type,
                description: info.hasOwnProperty('description') ? info.description : '',
                accessibility: info.hasOwnProperty('setSignature') ? '读写' : '只读'
            });
        }
    }
    var properties = [];
    propertiesClass.forEach(property => {
        fixMetaInfo(property);
        property.since = property.since ? property.since : ci.since;
        property.defaultValue = property.defaultValue ? property.defaultValue : '';
        property.accessibility = property.accessibility ? property.accessibility : '读写';
        properties.push(`
            <tr><td>${property.name}</td><td>${property.type}</td><td>${property.accessibility}</td>
            <td>${property.description}</td><td>${property.defaultValue}</td><td>${property.since}</td></tr>
        `);
    });
    md = md.replace('$properties', properties.join(''));

    console.log(md);
});

function fixMetaInfo(metaInfo) {
    if (!metaInfo.hasOwnProperty('description')) {
        metaInfo.description = '';
        return;
    }
    metaInfo.description = metaInfo.description.replace(/\$(\w+)\s*=\s*(.*?)\s*(\n|<\/p>)/g,
        function(found, prop, value, suffix) {
            metaInfo[prop] = value;
            // remove these messages
            return suffix;
        });
    if (!metaInfo.since) {
        metaInfo.since = '';
    }
}

function getMarkdownTemplate() {
    return `
# $componentName

起始版本：$since

## 选择器 / Selectors

$selectors

## 输入属性 / Inputs

<table>
    <thead>
        <tr><th>名称</th><th>类型</th><th>默认值</th><th>双绑</th><th>说明</th><th>起始版本</th></tr>
    </thead>
    <tbody>$inputs</tbody>
</table>

## 输出属性 / Outputs

<table>
    <thead>
        <tr><th>名称</th<th>数据类型</th>><th>说明</th><th>起始版本</th></tr>
    </thead>
    <tbody>$outputs</tbody>
</table>

## 普通属性 / Properties

<table>
    <thead>
        <tr><th>名称</th><th>类型</th><th>访问性</th><th>说明</th><th>默认值</th><th>起始版本</th></tr>
    </thead>
    <tbody>$properties</tbody>
</table>

## 方法 / Methods

$methods

## 已知问题 / Known Issues

$knownIssues

## 典型用法 / Typical Usages

$typicalUsages
`
}
