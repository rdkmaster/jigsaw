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

var tags = getDemoTags();
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
    html = processConstractor(ci, html);
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
    html = html.replace('$since', '起始版本：' + (ci.since ? ci.since : 'v1.0.0'));
    html = html.replace('$description', ci.description);
    html = html.replace('$demos', getDemoListWithHeader(ci));
    saveFile(ci.subtype, ci.name, html);
});

console.log('processing enumerations...');
docInfo.miscellaneous.enumerations.forEach(ci => {
    processingAPI = ci;
    fixMetaInfo(ci);
    var html = getTypeEnumTemplate();
    html = html.replace('$name', ci.name);
    html = html.replace('$since', '起始版本：' + (ci.since ? ci.since : 'v1.0.0'));
    var items = [];
    ci.childs.forEach(i => items.push(`<li>${i.name}</li>`));
    html = html.replace('$enumItems', items.join('\n'));
    html = html.replace('$description', ci.description);
    html = html.replace('$demos', getDemoListWithHeader(ci));
    saveFile(ci.subtype, ci.name, html);
});

fs.writeFileSync(`${output}/list`, JSON.stringify(apiList));
if (!checkUnknownTypes()) {
    process.exit(1);
}

function processCommon(ci, html) {
    html = html.replace('$since', (ci.since ? ci.since : 'v1.0.0'));
    html = html.replace('$name', ci.name);
    html = html.replace('$description', ci.description);
    html = html.replace('$extends', ci.extends ? addTypeLink(ci.extends) : '--');
    var implements = (ci.implements || ['--'])
        .filter(i => !isAngularLifeCircle(i))
        .map(i => addTypeLink(i));
    if (implements.length == 0) {
        implements.push('--');
    }
    html = html.replace('$implements', implements.join(' / '));
    html = html.replace('$demos', getDemoListWithHeader(ci));
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
        input.defaultValue = input.defaultValue ? input.defaultValue : '';
        var dualBinding = ci.outputsClass.find(i => i.name == input.name + 'Change') ?
            '<span class="fa fa-retweet" style="margin-left:4px" title="本属性支持双向绑定"></span>' : '';
        var description = input.description + (input.since ? `<p>起始版本：${input.since}</p>` : '');
        inputs.push(`<tr><td>${anchor(input.name)}${input.name}${dualBinding}</td>
            <td>${addTypeLink(input.type)}</td><td>${input.defaultValue}</td>
            <td>${description}</td><td>${getDemoList(ci.name, input.name)}</td></tr>`);
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
        output.defaultValue = output.defaultValue ? output.defaultValue : '';
        var match = output.defaultValue.match(/<(.*)>/);
        var type = 'any';
        if (match) {
            type = match[1];
        }
        var description = output.description + (output.since ? `<p>起始版本：${output.since}</p>` : '');
        outputs.push(`<tr><td>${anchor(output.name)}${output.name}</td><td>${addTypeLink(type)}</td>
            <td>${description}</td><td>${getDemoList(ci.name, output.name)}</td></tr>`);
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
            var desc = info.getSignature && info.getSignature.description ? info.getSignature.description : '';
            desc += info.setSignature && info.setSignature.description ? info.setSignature.description : '';
            var type = info.getSignature ? (info.getSignature.returnType || info.getSignature.type) :
                                            info.setSignature ? info.setSignature.args[0].type : '';
            propertiesClass.push({
                name: info.name, description: desc, type: type,
                readOnly: info.hasOwnProperty('setSignature') ? false : true
            });
        }
    }
    return propertiesClass;
}

// 在当前对象以及所有父类、实现的接口中，寻找最近一个包含有效描述信息`propertyName`的描述信息
// 因为编写文档的时候，是尽量将详细描述写在尽可能基础的接口、基类上的
// 因此本方法优先寻找接口类，然后才是父类。
function findPropertyWithValidDescription(type, propertyName) {
    type = findTypeMetaInfo(type);
    if (!type) {
        return '';
    }
    var property = mergeProperties(type).find(p => p.name === propertyName && !!p.description);
    if (property) {
        return property.description;
    }

    var parents = (type.implements || []).concat();
    if (type.extends) {
        parents.push(type.extends);
    }
    for (var i = 0; i < parents.length; i++) {
        var propertyDesc = findPropertyWithValidDescription(parents[i], propertyName);
        if (propertyDesc) {
            return propertyDesc;
        }
    }
    return '';
}

function processProperties(ci, html) {
    var properties = [];
    mergeProperties(ci).forEach(property => {
        if (property.inheritance) {
            // 继承过来的，暂时隐藏，参考 https://github.com/rdkmaster/jigsaw/issues/554
            return;
        }
        fixMetaInfo(property);
        property.defaultValue = property.defaultValue ? property.defaultValue : '';
        var readOnly = property.readOnly ?
            '<span style="margin-right:4px;color:#9a14a9;" title="Read Only" class="fa fa-adjust"></span>' : '';
        var modifier = getModifierInfo(property.modifierKind);
        var description = findPropertyWithValidDescription(ci, property.name);
        description += (property.since ? `<p>起始版本：${property.since}</p>` : '');
        description = addDescLink(description);
        properties.push(`<tr><td style="white-space: nowrap;">
            ${anchor(property.name)}${modifier}${readOnly}${property.name}</td><td>${addTypeLink(property.type)}</td>
            <td>${description}</td><td>${property.defaultValue}</td><td>${getDemoList(ci.name, property.name)}</td></tr>`);
    });
    if (properties.length == 0) {
        properties.push(getNoDataRowTemplate());
    }
    return html.replace('$properties', properties.join(''));
}

function processConstractor(ci, html) {
    if(ci.constructorObj&&ci.type=='class'){
        html = html.replace('$constractor', `<h3>构造函数 / Methods</h3>
        <p>${ci.constructorObj.description}</p>
        <p>输入参数</p>
        <ul>
         $parameters
        </ul>`);
        var parameters = [];
        ci.constructorObj.args.forEach((parameterObj)=>{
            parameters.push(`<li><span style="white-space: nowrap;">${parameterObj.name}: <a>${addTypeLink(parameterObj.type)}</a></span>${parameterObj.description?parameterObj.description:''}</li>`)
        });
        html = html.replace('$parameters',parameters.join(''));
    }else{
        html = html.replace('$constractor','');
    }
    return html;
}

function processMethods(ci, html) {
    var methods = [];
    (ci.methodsClass || ci.methods).forEach(method => {
        if (isAngularLifeCircle(method.name)) {
            return;
        }
        if (method.inheritance) {
            // 继承过来的，暂时隐藏，参考 https://github.com/rdkmaster/jigsaw/issues/554
            return;
        }
        fixMetaInfo(method);

        var returns = `<p>返回类型 ${addTypeLink(method.returnType)}</p>`;
        var parentMethod = findMethodWithValidDescription(ci, method.name,
            m => m.jsdoctags && m.jsdoctags.find(t => t.tagName.text == 'returns' && !!t.comment));
        var returnComment = '';
        if (parentMethod) {
            returnComment = parentMethod.jsdoctags
                .find(t => t.tagName.text == 'returns' && !!t.comment).comment;
        }
        returns += addDescLink(returnComment);

        var args = [];
        var jsdoctags = method.jsdoctags ? method.jsdoctags : [];
        jsdoctags.forEach((argument, index) => {
            if (argument.tagName.text !== 'param') {
                return;
            }
            var type = argument.type ? `: ${addTypeLink(argument.type)}` : '';
            var matchCondition = parentArgument => {
                if (parentArgument.tagName.text !== 'param') {
                    return false;
                }
                var paName = parentArgument.name.text || parentArgument.name;
                var name = argument.name.text || argument.name;
                return paName === name && !!parentArgument.comment;
            }
            var parentMethod = findMethodWithValidDescription(ci, method.name,
                m => m.jsdoctags && m.jsdoctags.find(matchCondition));
            var comment = parentMethod ? parentMethod.jsdoctags.find(matchCondition).comment : '';
            comment = addDescLink(comment);
            var arg = `<span style="white-space: nowrap;">${argument.name.text || argument.name}${type}</span>${comment}`;
            args.push(arg);
        });
        if (args.length == 0) {
            args = '--';
        } else {
            args = `<ul><li>${args.join('</li><li>')}</li></ul>`;
        }

        var modifier = getModifierInfo(method.modifierKind);

        //如果当前方法没有描述，则往上找他的父类里要描述
        var parentMethod = findMethodWithValidDescription(ci, method.name, m => !!m.description);
        var description = parentMethod ? parentMethod.description : '';
        description += (method.since ? `<p>起始版本：${method.since}</p>` : '');
        description = addDescLink(description);

        methods.push(`
            <tr><td style="white-space: nowrap;">${anchor(method.name)}${modifier}${method.name}</td>
            <td>${description}</td><td>${returns}</td><td>${args}</td><td>${getDemoList(ci.name, method.name)}</td></tr>`);
    });
    if (methods.length == 0) {
        methods.push(getNoDataRowTemplate());
    }
    return html.replace('$methods', methods.join(''));
}

// 在当前对象以及所有父类、实现的接口中，寻找最近一个包含有效描述信息且名为`methodName`的方法的元信息，
// `condition`是额外的过滤条件
// 因为编写文档的时候，是尽量将详细描述写在尽可能基础的接口、基类上的
// 因此本方法优先寻找接口类，然后才是父类。
function findMethodWithValidDescription(type, methodName, condition) {
    type = findTypeMetaInfo(type);
    if (!type) {
        return;
    }
    var methods = type.methodsClass || type.methods || [];
    var method = methods.find(m => m.name === methodName && condition(m));
    if (method) {
        return method;
    }

    var parents = (type.implements || []).concat();
    if (type.extends) {
        parents.push(type.extends);
    }
    for (var i = 0; i < parents.length; i++) {
        method = findMethodWithValidDescription(parents[i], methodName, condition);
        if (method) {
            return method;
        }
    }
}

function fixMetaInfo(metaInfo) {
    if (!metaInfo.hasOwnProperty('description')) {
        metaInfo.description = '';
    }
    metaInfo.description = metaInfo.description.replace(/\$(\w+)\s*=\s*(.*?)\s*(\n|<\/p>)/g,
        function (found, prop, value, suffix) {
            metaInfo[prop] = value;
            // remove these messages
            return suffix;
        });
    metaInfo.description = addDescLink(metaInfo.description);
}

function getModifierInfo(modifier) {
    var clazz, title, color;
    if (modifier && modifier.indexOf(STATIC) !== -1) {
        clazz = 'cube';
        title = 'Static';
        color = '#0575b9';
    } else if (modifier && modifier.indexOf(PROTECTED) !== -1) {
        clazz = 'lock';
        title = 'Protected';
        color = 'orange';
    } else {
        clazz = 'unlock';
        title = 'Public';
        color = 'green';
    }
    return `<span class="fa fa-${clazz}" style="color: ${color}; margin-right: 4px" title="${title}"></span>`;
}

function addTypeLink(type) {
    type = type == 'literal type' ? '' : type;
    return (type || '').replace(/['"]?\w+['"]?/g, subType => {
        var url = getTypeUrl(subType);
        var target = url.match(/^https?:/) ? '_blank' : '_self';
        return url ? `<a href="${url}" target="${target}">${subType}</a>` : subType;
    });
}

// 此规则详情参考这里  https://github.com/rdkmaster/jigsaw/issues/542
function addDescLink(desc) {
    if (!isDefined(desc)) {
        return '';
    }
    return desc
        .replace(/{@link\s+(.*?)}/g, '<code>$1</code>')
        .replace(/<code>\s*(\w+?)\.(\w+?)\s*[()]*\s*<\/code>/g, (found, clazz, property) => {
            if (!property || !clazz) {
                console.warn('WARN: bad format found while adding description links: ' + found);
                return found;
            }
            var url = getPropertyUrl(clazz, property, processingAPI);
            var target = url.match(/^https?:/) ? '_blank' : '_self';
            return url ? `<a href="${url}" target="${target}">${found}</a>` : found;
        })
        .replace(/<code>\s*(\w+?)\s*[()]*\s*<\/code>/g, (found, type) => {
            var url = getPropertyUrl(type, processingAPI);
            var target = url.match(/^https?:/) ? '_blank' : '_self';
            return url ? `<a href="${url}" target="${target}">${found}</a>` : found;
        })
        .replace(/Jigsaw/g, '<a href="https://github.com/rdkmaster/jigsaw" ' +
            'title="请帮忙到GitHub上点个星星，更多的星星可以吸引越多的人加入我们。">Jigsaw</a>');
}

function getTypeUrl(type, allowUnknown) {
    if (!isDefined(type)) {
        return '';
    }
    type = type.trim();

    // try native types
    var info = findTypeMetaInfo(type);
    if (info) {
        return `/components/jigsaw/api?apiItem=${type}&parentName=${info.subtype || info.type}`;
    }

    // try angular types
    angularApis.find(set => info = set.items.find(i => i.title === type));
    if (info) {
        return `https://angular.io/${info.path}`;
    }

    // try basic types
    var lcType = type.toLowerCase();
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
        return `https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols`;
    }
    if (type == 'NodeListOf') {
        return `https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList`;
    }
    if (type == 'setTimeout') {
        return `https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/${type}`;
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

    // 忽略这些已知非类型值：
    // - 字符串常量类型
    // - 纯数字常量类型
    // - T 一般用于泛型类型定义
    if (!type.match(/['"]/) && !type.match(/\d+/) && type != 'T'
        && !allowUnknown && unknownTypes.indexOf(type) == -1) {
        unknownTypes.push(type);
    }
    return '';
}

function getPropertyUrl(type, property, context) {
    if (arguments.length == 2) {
        context = property;

        var info = findPropertyMetaInfo(context, type);
        if (info) {
            // 此时的type是一个属性，这里的info里包含的可能是该属性在其父类里的信息
            var name = info.type.name;
            var subtype = info.type.subtype || info.type.type;
            return `/components/jigsaw/api?apiItem=${name}&parentName=${subtype}#${type}`;
        }
        var info = findTypeMetaInfo(type);
        if (info) {
            // 此时的type是一个类
            return `/components/jigsaw/api?apiItem=${info.name}&parentName=${info.subtype || info.type}`;
        }
        // 试一下是不是angular、ts等其他的类型
        return getTypeUrl(type, true);
    } else {
        var info = findPropertyMetaInfo(type, property);
        if (info) {
            // 这里的info里包含的可能是该属性在其父类里的信息
            var name = info.type.name;
            var subtype = info.type.subtype || info.type.type;
            return `/components/jigsaw/api?apiItem=${name}&parentName=${subtype}#${property}`;
        }
    }
    return '';
}

function findTypeMetaInfo(type) {
    return typeof type === 'string' ?
        docInfo.classes.find(i => i.name === type) ||
        docInfo.components.find(i => i.name === type) ||
        docInfo.directives.find(i => i.name === type) ||
        docInfo.injectables.find(i => i.name === type) ||
        docInfo.interfaces.find(i => i.name === type) ||
        docInfo.modules.find(i => i.name === type) ||
        docInfo.miscellaneous.typealiases.find(i => i.name === type) ||
        docInfo.miscellaneous.enumerations.find(i => i.name === type)
        :
        type;
}

// 在一个类中寻找一个属性，这个方法支持追溯到父类里
function findPropertyMetaInfo(type, property) {
    if (!type) {
        return;
    }
    if (typeof type === 'string') {
        var context = findTypeMetaInfo(type);
    } else {
        var context = type;
        type = type.name;
    }
    if (!context) {
        return;
    }

    var info = (context.inputsClass || []).find(i => i.name == property) ||
        (context.outputsClass || []).find(i => i.name == property) ||
        mergeProperties(context).find(i => i.name == property) ||
        (context.methodsClass || context.methods || []).find(i => i.name == property);
    if (info) {
        return {type: context, property: info};
    }
    return findPropertyMetaInfo(context.extends, property);
}

function isDefined(x) {
    return x !== null && x !== undefined;
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
    unknownTypes.forEach(t => console.log('Unknown type found: ' + t));
    return false;
}

function getDemoTags() {
    var appPath = `${__dirname}/../../../src/app`;
    var demoStr = fs.readFileSync(`${appPath}/router-config.ts`).toString();
    var match = demoStr.match(/\[[\s\S]*\]/);
    if (!match) {
        console.error('ERROR: can not read demo info, invalid router-config.ts');
        process.exit(1);
    }
    var demosRouters = eval(match[0]);
    var tags = {};
    demosRouters.filter(r => !!r.path).forEach(r => {
        var code = fs.readFileSync(`${appPath}/demo/${r.path}/demo-set.module.ts`).toString();
        var match = code.match(/routerConfig\s*:?.*?=\s*(\[[\s\S]*?\])\s*;/);
        if (!match) {
            console.log('ERROR: can not find routerConfig source, check the following rules:');
            console.log('1. use "routerConfig" as the router config var name.');
            console.log('2. terminate the var definition with ";".');
            process.exit(1);
        }
        var childRouterSource = match[1].replace(/component\s*:\s*\w+,?/g, '');
        var childRouters;
        try {
            childRouters = eval('(' + childRouterSource + ')');
        } catch (e) {
            console.log('ERROR: unable to compile the router config source: ' + e.message);
            console.log(match[1]);
            process.exit(1);
        }
        childRouters.filter(cr => !!cr.path).forEach(cr => {
            var code = fs.readFileSync(`${appPath}/demo/${r.path}/${cr.path}/demo.component.ts`).toString();
            var tagMatch = code.match(/tags\s*:?.*?=\s*(\[[\s\S]*?\])\s*;/);
            if (!tagMatch) {
                console.log(`ERROR: can not find tags info for demo: ${appPath}/demo/${r.path}/${cr.path}`);
                process.exit(1);
            }
            var summaryMatch = code.match(/\bsummary\s*(:.*?)?\s*=\s*['"](.*)['"]/);
            if (!summaryMatch) {
                console.log(`ERROR: can not summary info for demo: ${appPath}/demo/${r.path}/${cr.path}`);
                console.log('hint: the value of summary should write in a single line!');
                process.exit(1);
            }

            eval(tagMatch[1]).forEach(t => {
                // verifyTag(t);
                if (!tags.hasOwnProperty(t)) {
                    tags[t] = [];
                }
                tags[t].push({
                    summary: summaryMatch[2], label: cr.path,
                    url: `/components/${r.path}/demo#${cr.path}`
                });
            });
        });
    });
    return tags;
}

function verifyTag(tag) {
    var match = tag.match(/^(.*?)\.(.*?)$/);
    if (match) {
        var type = match[1];
        var property = match[2];
    } else {
        var type = tag;
    }
    var info = findTypeMetaInfo(type);
    if (!info) {
        console.log(`ERROR: invalid tag, type not found: ${tag}`);
        process.exit(1);
    }
    if (property && !findPropertyMetaInfo(info, property)) {
        console.log(`ERROR: invalid tag, property not found: ${tag}`);
        process.exit(1);
    }
}

function getDemoList(type, property) {
    var key = property ? `${type}.${property}` : type;
    var demos = tags[key];
    if (!demos) {
        return '';
    }
    var list = [];
    demos.forEach(d => {
        list.push(`<li title="${d.summary}"><a href="${d.url}">${d.label}</a></li>`);
    });
    return list.length > 0 ? `<ul>${list.join('')}</li></ul>` : '';
}

function getDemoListWithHeader(metaInfo) {
    var type = metaInfo.subtype || metaInfo.type;
    var title = type == 'typealias' || type == 'enum' ? '相关示例' : '其他示例';
    var demos = getDemoList(metaInfo.name);
    return demos ? '<a name="demos"></a><h3>' + title + '</h3>' + demos : '';
}

function isAngularLifeCircle(type) {
    return [
        'OnChaes', 'OnInit', 'DoCheck', 'AfterContentInit', 'AfterContentChecked',
        'AfterViewInit', 'AfterViewChecked', 'OnDestroy'
    ].find(i => i === type || 'ng' + i == type);
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
        <tr><th>名称</th><th>类型</th><th>默认值</th><th>说明</th><th>示例</th></tr>
    </thead>
    <tbody>$inputs</tbody>
</table>

<a name="outputs"></a>
<h3>输出属性 / Outputs</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>数据类型</th><th>说明</th><th>示例</th></tr>
    </thead>
    <tbody>$outputs</tbody>
</table>

<a name="properties"></a>
<h3>普通属性 / Properties</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>类型</th><th>说明</th><th>默认值</th><th>示例</th></tr>
    </thead>
    <tbody>$properties</tbody>
</table>

<a name="methods"></a>
<h3>方法 / Methods</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>说明</th><th>返回值</th><th>参数说明</th><th>示例</th></tr>
    </thead>
    <tbody>$methods</tbody>
</table>

$demos

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
        <tr><th>名称</th><th>类型</th><th>说明</th><th>默认值</th><th>示例</th></tr>
    </thead>
    <tbody>$properties</tbody>
</table>

$constractor

<a name="methods"></a>
<h3>方法 / Methods</h3>
<table style="width:100%">
    <thead>
        <tr><th>名称</th><th>说明</th><th>返回值</th><th>参数说明</th><th>示例</th></tr>
    </thead>
    <tbody>$methods</tbody>
</table>

$demos

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

$demos
`
}

function getTypeEnumTemplate() {
    return `
<h2>$name</h2>
<p>$since</p>

$description

<a name="items"></a>
<h3>枚举项</h3>
<ul>
    $enumItems
</ul>

$demos
`
}

function getNoDataRowTemplate() {
    return '<tr><td style="text-align: center;" colspan="1000">无</td></tr>';
}

function anchor(name) {
    // 给这些样式是为了让这个anchor往上顶一点
    return `<a style="position:relative;top:-10px;left:-16px;text-decoration:none;cursor:default;" name="${name}">&nbsp;</a>`;
}
