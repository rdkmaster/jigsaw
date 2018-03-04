var PROTECTED = 113;
var PUBLIC = 114;
var STATIC = 115;

var fs = require('fs');

var input = process.argv[2];
if (!fs.existsSync(input)) {
    console.log('need an input json file!');
    process.exit(1);
}
var docInfo = require(input);
if (!docInfo) {
    console.log('input json file is invalid!');
    process.exit(1);
}

var output = process.argv[3];
if (!output) {
    console.error("ERROR: need an output dir");
    process.exit(1);
}
if (fs.existsSync(output)) {
    console.error("ERROR: output dir already exists, remove it and try again: " + output);
    process.exit(1);
}
output = output[output.length - 1] == '/' ? output.substring(0, output.length - 1) : output;
fs.mkdirSync(`${output}`, 755);
fs.mkdirSync(`${output}/components`, 755);
fs.mkdirSync(`${output}/classes`, 755);
fs.mkdirSync(`${output}/directives`, 755);
fs.mkdirSync(`${output}/injectables`, 755);
fs.mkdirSync(`${output}/interfaces`, 755);
fs.mkdirSync(`${output}/modules`, 755);

docInfo.components.forEach(ci => {
    fixMetaInfo(ci);
    var html = getComponentTemplate();
    html = processCommon(ci ,html);
    html = processSelector(ci ,html)
    html = processInputs(ci, html);
    html = processOutputs(ci, html);
    html = processProperties(ci, html);
    html = processMethods(ci, html);
    fs.writeFileSync(`${output}/components/${ci.name}.html`, html);
});

docInfo.classes.forEach(ci => {
    fixMetaInfo(ci);
    var html = getClassesTemplate();
    html = processCommon(ci ,html);
    html = processProperties(ci, html);
    html = processMethods(ci, html);
    fs.writeFileSync(`${output}/classes/${ci.name}.html`, html);
});

function processCommon(ci, html) {
    html = html.replace('$since', ci.since);
    html = html.replace('$name', ci.name);
    html = html.replace('$description', ci.description);
    html = html.replace('$extends', ci.extends ? ci.extends : '无');
    html = html.replace('$implements', ci.implements && ci.implements.length > 0 ? ci.implements.join(' / ') : '无');
    return html;
}

function processSelector(ci ,html) {
    var matchSelector = ci.sourceCode.match(/selector\s*:\s*['"](.*?)['"]/);
    var selectors = matchSelector ? matchSelector[1].split(/\s*,\s*/g) : ['unknown'];
    return html.replace('$selectors', `<ul><li>${selectors.join('</li><li>')}</li></ul>`);
}

function processInputs(ci, html) {
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
    if (inputs.length == 0) {
        inputs.push(getNoDataRowTemplate());
    }
    return html.replace('$inputs', inputs.join(''));
}

function processOutputs(ci, html) {
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
    if (outputs.length == 0) {
        outputs.push(getNoDataRowTemplate());
    }
    return html.replace('$outputs', outputs.join(''));
}

function processProperties(ci ,html) {
    // 这块有点绕，当一个属性被拆开为getter/setter后，ci.propertiesClass就找不到他了
    // 但是会出现在ci.accessors里，而ci.accessors里还有一部分同时出现在inputsClass里的，需要剔除
    var propertiesClass = [].concat(ci.propertiesClass || ci.properties);
    if (ci.hasOwnProperty('accessors')) {
        for (var prop in ci.accessors) {
            if (ci.inputsClass && ci.inputsClass.find(i => i.name == prop)) {
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
        var modifier = getModifierInfo(property.modifierKind);
        properties.push(`
            <tr><td style="white-space: nowrap;">${modifier}${property.name}</td>
            <td>${property.type}</td><td>${property.accessibility}</td>
            <td>${property.description}</td><td>${property.defaultValue}</td>
            <td>${property.since}</td></tr>
        `);
    });
    if (properties.length == 0) {
        properties.push(getNoDataRowTemplate());
    }
    return html.replace('$properties', properties.join(''));
}

function processMethods(ci, html) {
    var methods = [];
    (ci.methodsClass || ci.methods).forEach(method => {
        fixMetaInfo(method);
        method.since = method.since ? method.since : ci.since;

        var returns = `<p>返回类型 <code>${method.returnType}</code></p>`;
        var returnComment = method.jsdoctags ? method.jsdoctags.find(t => t.tagName.text == 'returns') : undefined;
        returns += returnComment ? returnComment.comment : '';

        var args = [];
        var jsdoctags = method.jsdoctags ? method.jsdoctags : [];
        jsdoctags.forEach(a => {
            if (a.tagName.text !== 'param') {
                return;
            }
            var arg = `<span style="white-space: nowrap;">
                ${a.name.text || a.name}${a.type ? ': <code>' + a.type : ''}</code>
                </span>${a.comment ? a.comment : ''}`;
            args.push(arg);
        });
        if (args.length == 0) {
            args.push('无');
        }
        args = `<ul><li>${args.join('</li><li>')}</li></ul>`;
        var modifier = getModifierInfo(method.modifierKind);
        methods.push(`
            <tr><td style="white-space: nowrap;">${modifier}${method.name}</td><td>${method.description}</td>
            <td>${returns}</td><td>${args}</td><td>${method.since}</td></tr>
        `);
    });
    if (methods.length == 0) {
        methods.push(getNoDataRowTemplate());
    }
    return html.replace('$methods', methods.join(''));
}

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
        metaInfo.since = 'v1.0.0';
    }
}

function getModifierInfo(modifier) {
    var clazz, title, color;
    if (modifier && modifier.indexOf(STATIC) !== -1) {
        clazz = 'cube';
        title = 'public static';
        color = '#0575b9';
    } else if (modifier && modifier.indexOf(PROTECTED) !== -1) {
        clazz = 'lock';
        title = 'protected';
        color = 'orange';
    } else {
        clazz = 'unlock';
        title = 'public';
        color = 'green';
    }
    return `<span class="fa fa-${clazz}" style="color: ${color}; margin-right: 4px" title="${title}"></span>`;
}

function getComponentTemplate() {
    return `
<h2>$name</h2>

<p>起始版本：$since</p>
$description

<h3>选择器 / Selectors</h3>
<p>$selectors</p>

<h3>输入属性 / Inputs</h3>
<table>
    <thead>
        <tr><th>名称</th><th>类型</th><th>默认值</th><th>双绑</th><th>说明</th><th>起始版本</th></tr>
    </thead>
    <tbody>$inputs</tbody>
</table>

<h3>输出属性 / Outputs</h3>
<table>
    <thead>
        <tr><th>名称</th><th>数据类型</th><th>说明</th><th>起始版本</th></tr>
    </thead>
    <tbody>$outputs</tbody>
</table>

<h3>普通属性 / Properties</h3>
<table>
    <thead>
        <tr><th>名称</th><th>类型</th><th>访问性</th><th>说明</th><th>默认值</th><th>起始版本</th></tr>
    </thead>
    <tbody>$properties</tbody>
</table>

<h3>方法 / Methods</h3>
<table>
    <thead>
        <tr><th>名称</th><th>说明</th><th>返回值</th><th>参数说明</th><th>起始版本</th></tr>
    </thead>
    <tbody>$methods</tbody>
</table>

<h3>面向对象 / Object Oriented</h3>
<ul><li>继承自 $extends</li><li>实现接口 $implements</li></ul>
`
}

function getClassesTemplate() {
    return `
<h2>$name</h2>

<p>起始版本：$since</p>
$description

<h3>属性 / Properties</h3>
<table>
    <thead>
        <tr><th>名称</th><th>类型</th><th>访问性</th><th>说明</th><th>默认值</th><th>起始版本</th></tr>
    </thead>
    <tbody>$properties</tbody>
</table>

<h3>方法 / Methods</h3>
<table>
    <thead>
        <tr><th>名称</th><th>说明</th><th>返回值</th><th>参数说明</th><th>起始版本</th></tr>
    </thead>
    <tbody>$methods</tbody>
</table>

<h3>面向对象 / Object Oriented</h3>
<ul><li>继承自 $extends</li><li>实现接口 $implements</li></ul>
`
}

function getNoDataRowTemplate() {
    return '<tr><td style="text-align: center;" colspan="1000">无</td></tr>';
}