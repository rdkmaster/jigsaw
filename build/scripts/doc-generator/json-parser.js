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

var processingAPI;
var unknownTypes = [];
var apiList = [];
fs.mkdirSync(`${output}`, 755);

console.log('processing components / directives...');
docInfo.components.concat(docInfo.directives).forEach(ci => {
    processingAPI = ci;
    fixMetaInfo(ci);
    var html = getComponentTemplate();
    html = processCommon(ci, html);
    html = processSelector(ci, html)
    html = processInputs(ci, html);
    html = processOutputs(ci, html);
    html = processProperties(ci, html);
    html = processMethods(ci, html);
    saveFile(ci.type, ci.name, html);
});

console.log('processing classes / injectables / interfaces...');
docInfo.classes.concat(docInfo.injectables).concat(docInfo.interfaces).forEach(ci => {
    processingAPI = ci;
    fixMetaInfo(ci);
    var html = getClassesTemplate();
    html = processCommon(ci, html);
    html = processProperties(ci, html);
    html = processMethods(ci, html);
    saveFile(ci.type, ci.name, html);
});

console.log('processing typealiases...');
docInfo.miscellaneous.typealiases.forEach(ci => {
    processingAPI = ci;
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
    processingAPI = ci;
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

fs.writeFileSync(`${output}/list`, JSON.stringify(apiList));
if (!checkUnknownTypes()) {
    process.exit(1);
}

function processCommon(ci, html) {
    html = html.replace('$since', ci.since);
    html = html.replace('$name', ci.name);
    html = html.replace('$description', ci.description);
    html = html.replace('$extends', ci.extends ? addTypeLink(ci.extends) : '--');
    html = html.replace('$implements', ci.implements && ci.implements.length > 0 ?
                                        addTypeLink(ci.implements).join(' / ') : '--');
    return html;
}

function processSelector(ci, html) {
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
            <tr><td>${anchor(input.name)}${input.name}${dualBinding}</td><td>${addTypeLink(input.type)}</td>
            <td>${input.defaultValue}</td><td>${input.description}</td><td>${input.since}</td></tr>`);
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
            <tr><td>${anchor(output.name)}${output.name}</td><td>${addTypeLink(type)}</td>
            <td>${output.description}</td><td>${output.since}</td></tr>`);
    });
    if (outputs.length == 0) {
        outputs.push(getNoDataRowTemplate());
    }
    return html.replace('$outputs', outputs.join(''));
}

// 这块有点绕，当一个属性被拆开为getter/setter后，ci.propertiesClass就找不到他了
// 但是会出现在ci.accessors里，而ci.accessors里还有一部分同时出现在inputsClass里的，需要剔除
function mergeProperties(ci) {
    var propertiesClass = [].concat(ci.propertiesClass || ci.properties || []);
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
    return propertiesClass;
}

function processProperties(ci, html) {
    var properties = [];
    mergeProperties(ci).forEach(property => {
        fixMetaInfo(property);
        property.since = property.since ? property.since : ci.since;
        property.defaultValue = property.defaultValue ? property.defaultValue : '';
        property.accessibility = property.accessibility ? property.accessibility : '读写';
        var modifier = getModifierInfo(property.modifierKind);
        properties.push(`
            <tr><td style="white-space: nowrap;">${anchor(property.name)}${modifier}${property.name}</td>
            <td>${addTypeLink(property.type)}</td><td>${property.accessibility}</td><td>${property.description}</td>
            <td>${property.defaultValue}</td><td>${property.since}</td></tr>`);
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
            <tr><td style="white-space: nowrap;">${anchor(method.name)}${modifier}${method.name}</td>
            <td>${method.description}</td><td>${returns}</td><td>${args}</td><td>${method.since}</td></tr>`);
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
    metaInfo.description = addDescLink(metaInfo.description);
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
        return (type || '').replace(/['"]?\w+['"]?/g, subType => {
            var url = getTypeUrl(subType);
            var target = url.match(/^https?:/) ? '_blank' : '_self';
            return url ? `<a href="${url}" target="${target}">${subType}</a>` : subType;
        });
    } else if (type instanceof Array) {
        return type.map(i => addTypeLink(i));
    }
}

// 此规则详情参考这里  https://github.com/rdkmaster/jigsaw/issues/542
function addDescLink(desc) {
    if (desc == null || desc == undefined) {
        return '';
    }
    return desc
        .replace(/<code>\s*(\w+?)\.(\w+?)\s*<\/code>/g, (found, clazz, property) => {
            console.log(`clazz=${clazz}, prop=${property}`)
            if (!property || !clazz) {
                console.warn('WARN: bad format found while adding description links: ' + found);
                return found;
            }
            return found;
        })
        .replace(/<code>\s*(\w+?)\s*<\/code>/g, (found, source) => {
            var type = processingAPI.type || processingAPI.subtype;
            if (source === processingAPI.name) {
                return `<a href="/components/jigsaw/api?apiItem=${source}&parentName=${type}">${found}</a>`;
            }
            var info = (processingAPI.inputsClass || []).find(i => i.name == source) ||
                        (processingAPI.outputsClass || []).find(i => i.name == source) ||
                        mergeProperties(processingAPI).find(i => i.name == source) ||
                        (processingAPI.methodsClass || processingAPI.methods || []).find(i => i.name == source);
            if (info) {
                var name = processingAPI.name;
                return `<a href="/components/jigsaw/api?apiItem=${name}&parentName=${type}#${info.name}">${found}</a>`;
            }
            return found;
        });
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
    var jsTypes = ["number", "boolean", "string", "object", "date", "function", "json"];
    lcType = lcType.toLowerCase();
    if (tsTypes.indexOf(lcType) != -1) {
        return 'https://www.tslang.cn/docs/handbook/basic-types.html'
    } else if (jsTypes.indexOf(lcType) != -1) {
        return `https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/${type}`;
    }

    // try more js types
    if (type == 'Element') {
        return `https://developer.mozilla.org/zh-CN/docs/Glossary/${type}`;
    }
    if (type == 'HTMLElement' || type == 'FocusEvent' || type == 'DragEvent') {
        return `https://developer.mozilla.org/zh-CN/docs/Web/API/${type}`;
    }
    if (type == 'IterableIterator') {
        return `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols`;
    }
    if (type == 'NodeListOf') {
        return `https://developer.mozilla.org/en-US/docs/Web/API/NodeList`;
    }

    // try rxjs types
    if (type == 'Subscription') {
        return `http://cn.rx.js.org/class/es6/Subscription.js~Subscription.html`;
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

    // 忽略这些已知非类型值：
    // - 字符串常量类型
    // - 纯数字常量类型
    // - T 一般用于泛型类型定义
    if (!type.match(/['"]/) && !type.match(/\d+/) && type != 'T') {
        unknownTypes.push(type);
    }
    return '';
}

function saveFile(type, fileName, content) {
    var path = `${output}/${type}`;
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, 755);
    }
    fs.writeFileSync(`${path}/${fileName}.html`, content);

    apiList.push({name: fileName, parentName: type});
}

function checkUnknownTypes() {
    if (unknownTypes.length == 0) {
        return true;
    }
    console.log('Unknown types found:')
    unknownTypes.forEach(t => console.log(t));
    return false;
}

function getComponentTemplate() {
    return `
<h2>$name</h2>

<p>起始版本：$since</p>
$description

<a name="selectors"></a>
<h3>选择器 / Selectors</h3>
<p>$selectors</p>

<a name="inputs"></a>
<h3>输入属性 / Inputs</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>类型</th><th>默认值</th><th>说明</th><th>起始版本</th></tr>
    </thead>
    <tbody>$inputs</tbody>
</table>

<a name="outputs"></a>
<h3>输出属性 / Outputs</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>数据类型</th><th>说明</th><th>起始版本</th></tr>
    </thead>
    <tbody>$outputs</tbody>
</table>

<a name="properties"></a>
<h3>普通属性 / Properties</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>类型</th><th>访问性</th><th>说明</th><th>默认值</th><th>起始版本</th></tr>
    </thead>
    <tbody>$properties</tbody>
</table>

<a name="methods"></a>
<h3>方法 / Methods</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>说明</th><th>返回值</th><th>参数说明</th><th>起始版本</th></tr>
    </thead>
    <tbody>$methods</tbody>
</table>

<a name="object-oriented"></a>
<h3>面向对象 / Object Oriented</h3>
<ul><li>继承自 $extends</li><li>实现接口 $implements</li></ul>
`
}

function getClassesTemplate() {
    return `
<h2>$name</h2>

<p>起始版本：$since</p>
$description

<a name="properties"></a>
<h3>属性 / Properties</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>类型</th><th>访问性</th><th>说明</th><th>默认值</th><th>起始版本</th></tr>
    </thead>
    <tbody>$properties</tbody>
</table>

<a name="methods"></a>
<h3>方法 / Methods</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>说明</th><th>返回值</th><th>参数说明</th><th>起始版本</th></tr>
    </thead>
    <tbody>$methods</tbody>
</table>

<a name="object-oriented"></a>
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

function anchor(name) {
    // 给这些样式是为了让这个anchor往上顶一点
    return `<a style="position:relative;top:-10px;left:-16px;text-decoration:none;cursor:default;" name="${name}">&nbsp;</a>`;
}
