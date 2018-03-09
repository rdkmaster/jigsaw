var PROTECTED = 113;
var PUBLIC = 114;
var STATIC = 115;

var fs = require('fs');
var angularApis = require(__dirname + '/angular-api-list.json');
if (!angularApis) {
    console.warn('angular api list not found!');
    angularApis = [];
}

var workDir = process.argv[2];
if (!workDir) {
    console.error("ERROR: need an workDir dir");
    process.exit(1);
}
workDir = workDir[workDir.length - 1] == '/' ? workDir.substring(0, workDir.length - 1) : workDir;
var output = `${workDir}/fragments`;
if (fs.existsSync(output)) {
    console.error("ERROR: output dir already exists, remove it and try again: " + output);
    process.exit(1);
}
var input = `${workDir}/documentation.json`;
if (!fs.existsSync(input)) {
    console.log(`need an input json file located at ${input}`);
    process.exit(1);
}
var docInfo = require(input);
if (!docInfo) {
    console.log(`input json file is invalid! path=${input}`);
    process.exit(1);
}

fs.mkdirSync(`${output}`, 755);

console.log('processing components...');
docInfo.components.forEach(ci => {
    fixMetaInfo(ci);
    var html = getComponentTemplate();
    html = processCommon(ci ,html);
    html = processSelector(ci ,html)
    html = processInputs(ci, html);
    html = processOutputs(ci, html);
    html = processProperties(ci, html);
    html = processMethods(ci, html);
    saveFile(ci.type, ci.name, html);
});

console.log('processing classes...');
docInfo.classes.forEach(ci => {
    fixMetaInfo(ci);
    var html = getClassesTemplate();
    html = processCommon(ci ,html);
    html = processProperties(ci, html);
    html = processMethods(ci, html);
    saveFile(ci.type, ci.name, html);
});

console.log('processing typealiases...');
docInfo.miscellaneous.typealiases.forEach(ci => {
    fixMetaInfo(ci);
    var html = getTypeAliasesTemplate();
    html = html.replace('$title', ci.name);
    html = html.replace('$name', '类型别名：' + ci.name);
    html = html.replace('$rawtype', '原始类型：' + addTypeLink(ci.rawtype));
    html = html.replace('$since', '起始版本：' + ci.since);
    html = html.replace('$description', ci.description);
    saveFile(ci.subtype, ci.name, html);
});

console.log('processing enumerations...');
docInfo.miscellaneous.enumerations.forEach(ci => {
    fixMetaInfo(ci);
    var html = getTypeEnumTemplate();
    html = html.replace('$name', ci.name);
    html = html.replace('$since', ci.since);
    var items = [];
    ci.childs.forEach(i => items.push(`<li>${i.name}</li>`));
    html = html.replace('$enumItems', items.join('\n'));
    html = html.replace('$description', ci.description);
    saveFile(ci.subtype, ci.name, html);
});


function processCommon(ci, html) {
    html = html.replace('$since', ci.since);
    html = html.replace('$name', ci.name);
    html = html.replace('$description', ci.description);
    html = html.replace('$extends', ci.extends ? addTypeLink(ci.extends) : '--');
    html = html.replace('$implements', ci.implements && ci.implements.length > 0 ?
                                        addTypeLink(ci.implements).join(' / ') : '--');
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
        var dualBinding = ci.outputsClass.find(i => i.name == input.name + 'Change') ?
            '<span class="fa fa-retweet" style="margin-left:4px" title="本属性支持双向绑定"></span>' : '';
        inputs.push(`
            <tr><td>${input.name}${dualBinding}</td><td>${addTypeLink(input.type)}</td>
            <td>${input.defaultValue}</td><td>${input.description}</td><td>${input.since}</td></tr>
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
            <tr><td>${output.name}</td><td>${addTypeLink(type)}</td><td>${output.description}</td>
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
            <td>${addTypeLink(property.type)}</td><td>${property.accessibility}</td>
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

        var returns = `<p>返回类型 ${addTypeLink(method.returnType)}</p>`;
        var returnComment = method.jsdoctags ? method.jsdoctags.find(t => t.tagName.text == 'returns') : undefined;
        returns += returnComment ? returnComment.comment : '';

        var args = [];
        var jsdoctags = method.jsdoctags ? method.jsdoctags : [];
        jsdoctags.forEach(a => {
            if (a.tagName.text !== 'param') {
                return;
            }
            var type = a.type ? `: ${addTypeLink(a.type)}` : '';
            var arg = `<span style="white-space: nowrap;">
                ${a.name.text || a.name}${type}</code>
                </span>${a.comment ? a.comment : ''}`;
            args.push(arg);
        });
        if (args.length == 0) {
            args = '<p>无参数</p>';
        } else {
            args = `<ul><li>${args.join('</li><li>')}</li></ul>`;
        }
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

function addTypeLink(type) {
    if (typeof type === 'string') {
        type = type == 'literal type' ? '' : type;
        return (type || '').replace(/\w+/g, subType => {
            var url = getTypeUrl(subType);
            var target = url.match(/^https?:/) ? '_blank' : '_self';
            return url ? `<a href="${url}" target="${target}">${subType}</a>` : subType;
        });
    } else if (type instanceof Array) {
        return type.map(i => addTypeLink(i));
    }
}

function getTypeUrl(type) {
    if (!type) {
        return '';
    }
    type = type.trim();
    var lcType = type.toLowerCase();
    if (!lcType) {
        return '';
    }

    // try basic types
    var tsTypes = ['any', 'void', 'array'];
    var jsTypes = ["number", "boolean", "string", "object", "date", "function"];
    lcType = lcType.toLowerCase();
    if (tsTypes.indexOf(lcType) != -1) {
        return 'https://www.typescriptlang.org/docs/handbook/basic-types.html'
    } else if (jsTypes.indexOf(lcType) != -1) {
        return `https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/${type}`;
    }

    // try more js types
    if (type == 'Element') {
        return `https://developer.mozilla.org/zh-CN/docs/Glossary/${type}`;
    }
    if (type == 'HTMLElement' || type == 'FocusEvent') {
        return `https://developer.mozilla.org/zh-CN/docs/Web/API/${type}`;
    }

    // try third party apis
    if (type == 'Moment') {
        return `https://momentjs.com/docs/#/parsing/`;
    }
    if (type == 'TranslateService') {
        return `https://github.com/ngx-translate/core#api`;
    }
    if (type == 'PerfectScrollbarDirective') {
        return `https://github.com/utatti/perfect-scrollbar#options`;
    }

    // try native types
    var info = docInfo.classes.find(i => i.name === type) ||
               docInfo.components.find(i => i.name === type) ||
               docInfo.directives.find(i => i.name === type) ||
               docInfo.injectables.find(i => i.name === type) ||
               docInfo.interfaces.find(i => i.name === type) ||
               docInfo.modules.find(i => i.name === type) ||
               docInfo.miscellaneous.typealiases.find(i => i.name === type) ||
               docInfo.miscellaneous.enumerations.find(i => i.name === type);
    if (info) {
        return `/components/jigsaw/api?apiItem=${type}&parentName=${info.subtype || info.type}`;
    }


    // try angular types
    angularApis.find(set => info = set.items.find(i => i.title === type));
    if (info) {
        return `https://angular.io/${info.path}`;
    }

    console.warn('unknown type: ' + type);
    return '';
}

function saveFile(type, fileName, content) {
    var path = `${output}/${type}`;
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, 755);
    }
    fs.writeFileSync(`${path}/${fileName}.html`, content);
}

function getComponentTemplate() {
    return `
<h2>$name</h2>

<p>起始版本：$since</p>
$description

<h3>选择器 / Selectors</h3>
<p>$selectors</p>

<h3>输入属性 / Inputs</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>类型</th><th>默认值</th><th>说明</th><th>起始版本</th></tr>
    </thead>
    <tbody>$inputs</tbody>
</table>

<h3>输出属性 / Outputs</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>数据类型</th><th>说明</th><th>起始版本</th></tr>
    </thead>
    <tbody>$outputs</tbody>
</table>

<h3>普通属性 / Properties</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>类型</th><th>访问性</th><th>说明</th><th>默认值</th><th>起始版本</th></tr>
    </thead>
    <tbody>$properties</tbody>
</table>

<h3>方法 / Methods</h3>
<table style="width:100%">
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
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>类型</th><th>访问性</th><th>说明</th><th>默认值</th><th>起始版本</th></tr>
    </thead>
    <tbody>$properties</tbody>
</table>

<h3>方法 / Methods</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>说明</th><th>返回值</th><th>参数说明</th><th>起始版本</th></tr>
    </thead>
    <tbody>$methods</tbody>
</table>

<h3>面向对象 / Object Oriented</h3>
<ul><li>继承自 $extends</li><li>实现接口 $implements</li></ul>
`
}

function getTypeAliasesTemplate() {
    return `
<h2>$title</h2>
<ul>
    <li>$name</li>
    <li>$rawtype</li>
    <li>$since</li>
</ul>
$description
`
}

function getTypeEnumTemplate() {
    return `
<h2>$name</h2>

$description

<h3>起始版本</h3>
$since

<h3>枚举项</h3>
<ul>
    $enumItems
</ul>
`
}

function getNoDataRowTemplate() {
    return '<tr><td style="text-align: center;" colspan="1000">无</td></tr>';
}
