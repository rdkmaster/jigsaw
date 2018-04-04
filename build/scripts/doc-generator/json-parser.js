var PROTECTED = 113;
var PUBLIC = 114;
var STATIC = 115;
var READ_ONLY = 131;

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
    fixDescription(ci);
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
    fixDescription(ci);
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
    fixDescription(ci);
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
    fixDescription(ci);
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
fs.writeFileSync(`${workDir}/wechat-group.html`, fs.readFileSync(`${__dirname}/wechat-group.html`));
fs.writeFileSync(`${workDir}/wechat-public-subscription.html`, fs.readFileSync(`${__dirname}/wechat-public-subscription.html`));
if (!checkUnknownTypes()) {
    process.exit(1);
}

function findExtends(ci) {
    var extensions = [], originType = ci.name;
    while (ci.extends) {
        extensions.push(ci.extends);
        ci = findTypeMetaInfo(ci.extends);
    }
    extensions = extensions.map(e => addTypeLink(e));
    if (extensions.length > 0) {
        extensions.unshift(originType);
        return extensions.join(' -&gt; ');
    } else {
        return '--';
    }
}

function findImplements(ci) {
    var implements = (ci.implements || []).filter(i => !isAngularLifeCircle(i));
    while (ci.extends) {
        ci = findTypeMetaInfo(ci.extends);
        (ci.implements || []).filter(i => !isAngularLifeCircle(i)).forEach(i => implements.push(i));
    }
    implements = implements.sort((i1, i2) => i1.localeCompare(i2)).map(i => addTypeLink(i));
    return implements.length > 0 ? implements.join(' / ') : '--';
}

function findChildren(ci) {
    var allTypes = docInfo.interfaces
                    .concat(docInfo.injectables)
                    .concat(docInfo.classes)
                    .concat(docInfo.directives)
                    .concat(docInfo.components)
                    .concat(docInfo.modules);
    var children = [];
    allTypes.forEach(t => {
        var info = findTypeMetaInfo(t.extends);
        while (info) {
            if (info.name == ci.name && children.indexOf(t) == -1) children.push(t.name);
            info = findTypeMetaInfo(info.extends);
        }
    });
    children = children.sort((c1, c2) => c1.localeCompare(c2)).map(c => addTypeLink(c));
    return children.length > 0 ? children.join(' / ') : '--';
}

function processCommon(ci, html) {
    html = html.replace('$since', (ci.since ? ci.since : 'v1.0.0'));
    html = html.replace('$name', ci.name);
    html = html.replace('$description', ci.description);
    html = html.replace('$extends', findExtends(ci));
    html = html.replace('$implements', findImplements(ci));
    html = html.replace('$children', findChildren(ci));
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
    if (ci.inputsClass.length) {
        html = html.replace(`$inputsTable`,
            `<table style="width:100%">
                <thead><tr><th>名称</th><th>类型</th><th>默认值</th><th>说明</th><th>示例</th></tr></thead>
                <tbody>$inputs</tbody>
            </table>`);
    } else {
        html = html.replace(`$inputsTable`, `<p>无</p>`)
    }
    ci.inputsClass.forEach(input => {
        fixDescription(input);
        input.defaultValue = input.defaultValue ? input.defaultValue : '';
        var dualBinding = ci.outputsClass.find(i => i.name == input.name + 'Change') ?
            '<span class="fa fa-retweet" style="margin-right:4px" title="本属性支持双向绑定"></span>' : '';
        var description = input.description + (input.since ? `<p>起始版本：${input.since}</p>` : '');
        var inputName = `${anchor(input.name)}${dualBinding}${getRichName(input)}`
        inputs.push(`<tr><td>${inputName}</td><td>${addTypeLink(input.type)}</td><td>${input.defaultValue}</td>
            <td>${description}</td><td>${getDemoList(input)}</td></tr>`);
    });
    return html.replace('$inputs', inputs.join(''));
}

function processOutputs(ci, html) {
    var outputs = [];
    if (ci.outputsClass.length) {
        html = html.replace(`$outputsTable`,
            `<table style="width:100%">
                 <thead><tr><th>名称</th><th>数据类型</th><th>说明</th><th>示例</th></tr></thead>
                 <tbody>$outputs</tbody>
             </table>`);
    } else {
        html = html.replace(`$outputsTable`, `<p>无</p>`)
    }
    ci.outputsClass.forEach(output => {
        fixDescription(output);
        output.defaultValue = output.defaultValue ? output.defaultValue : '';
        var match = output.defaultValue.match(/<(.*)>/);
        var type = 'any';
        if (match) {
            type = match[1];
        }
        var description = output.description + (output.since ? `<p>起始版本：${output.since}</p>` : '');
        var outputName = `${anchor(output.name)}${getRichName(output)}`;
        outputs.push(`<tr><td>${outputName}</td><td>${addTypeLink(type)}</td>
            <td>${description}</td><td>${getDemoList(output)}</td></tr>`);
    });
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
                readOnly: !info.hasOwnProperty('setSignature')
            });
        }
    }
    propertiesClass.forEach(p => {
        if (p.readOnly || !p.modifierKind) return;
        p.readOnly = p.modifierKind.includes(READ_ONLY);
    });
    return propertiesClass;
}

// not including the current class's properties
function findInheritedProperties(ci, properties) {
    while (ci && ci.extends) {
        ci = findTypeMetaInfo(ci.extends);
        if (!ci) {
            console.warn('no meta info for: ' + ci.extends);
            continue;
        }
        mergeProperties(ci).forEach(p => {
            if (properties.find(pp => pp.name === p.name)) {
                return;
            }
            if (p.inheritance) {
                return;
            }
            // deep copy
            p = JSON.parse(JSON.stringify(p));
            delete p.inheritance;
            p.inheritInfo = {from: ci.name, type: ci.type || ci.subtype};
            properties.push(p);
        });
    }
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
    var allProperties = mergeProperties(ci).filter(p => !p.hasOwnProperty('inheritance'));
    findInheritedProperties(ci, allProperties);

    var properties = [];
    var shownAttributeCount = 0;
    allProperties.sort((p1, p2) => p1.name.localeCompare(p2.name)).forEach(property => {
        // 尝试从当前属性描述及其父类、接口中读取描述信息
        var description = findPropertyWithValidDescription(ci, property.name);
        property.description = description;
        fixDescription(property);

        var isHidden = property.inheritInfo || (property.modifierKind && property.modifierKind.indexOf(PROTECTED) !== -1);
        if (!isHidden) {
            shownAttributeCount++;
        }

        property.defaultValue = property.defaultValue ? property.defaultValue : '';
        var readOnly = property.readOnly ?
            '<span style="margin-right:4px;color:#9a14a9;" title="Read Only" class="fa fa-adjust"></span>' : '';
        var modifier = getModifierInfo(property.modifierKind);
        var description = property.description + (property.since ? `<p>起始版本：${property.since}</p>` : '');
        var inheritance = getInheritanceInfo(property);
        var propertyName = `${anchor(property.name)}${inheritance}${modifier}${readOnly}${getRichName(property)}`;
        var trChildElements = `<td style="white-space: nowrap;">${propertyName}</td><td>${addTypeLink(property.type)}</td>
            <td>${description}</td><td>${property.defaultValue}</td><td>${getDemoList(property)}</td>`;
        var display = isHidden ? 'none' : 'table-row';
        var bgColor = shownAttributeCount % 2 == 1 ? '#fff' : '#f8f8f8';
        properties.push(`<tr style="display:${display}; background-color:${bgColor}">${trChildElements}</tr>`);
    });

    var hiddenAttributeCount = allProperties.length - shownAttributeCount;
    var propertiesTable;
    if (allProperties.length > 0) {
        propertiesTable =
            `<table id="dynamicProperties" style="width:100%; display:${shownAttributeCount == 0 ? 'none' : 'table'}">
                 <thead><tr><th>名称</th><th>类型</th><th>说明</th><th>默认值</th><th>示例</th></tr></thead>
                <tbody>$properties</tbody>
            </table>`;
        propertiesTable += hiddenAttributeCount > 0 ?
            `<a style="margin-left: 10px" title="单击列出如下属性：\n1. 所有从父类继承过来的属性;\n2. 当前类中受保护的属性;"
            onclick="document.getElementById('dynamicProperties').lastChild.previousSibling.childNodes.forEach((tr,index)=> {
                tr.style.display = 'table-row';tr.style['background-color'] = index % 2 == 0 ? '#fff' : '#f8f8f8';
            });this.style.display='none';document.getElementById('dynamicProperties').style.display='table'">
            列出所有可用属性</a>` : '';
    } else {
        //如果没有属性，则显示一行“无”
        propertiesTable = `<p>无</p>`;
    }
    return html.replace(`$propertiesTable`, propertiesTable).replace('$properties', properties.join(''));
}

function processConstractor(ci, html) {
    if (ci.constructorObj && ci.type == 'class') {
        html = html.replace('$constractor', `<h3>构造函数 / Constractor</h3>
            <p>${ci.constructorObj.description}</p><p>输入参数</p><ul>$parameters</ul>`);
        var parameters = [];
        (ci.constructorObj.jsdoctags || []).forEach(param => {
            if (param.tagName.text != 'param') {
                return;
            }
            var description = param.comment ? addDescLink(param.comment) : '';
            parameters.push(`<li><span style="white-space: nowrap;">${param.name.text || param.name}:
                            <a>${addTypeLink(param.type)}</a></span>${description}</li>`)
        });
        html = html.replace('$parameters', parameters.join(''));
    } else {
        html = html.replace('$constractor', '');
    }
    return html;
}

// not including the current class's methods
function findInheritedMethods(ci, methods) {
    while (ci && ci.extends) {
        ci = findTypeMetaInfo(ci.extends);
        if (!ci) {
            console.warn('no meta info for: ' + ci.extends);
            continue;
        }
        (ci.methodsClass || ci.methods).forEach(m => {
            if (methods.find(mm => mm.name === m.name)) {
                return;
            }
            if (m.inheritance) {
                return;
            }
            // deep copy
            m = JSON.parse(JSON.stringify(m));
            delete m.inheritance;
            m.inheritInfo = {from: ci.name, type: ci.type || ci.subtype};
            methods.push(m);
        });
    }
}

function processConstractor(ci, html) {
    if (ci.constructorObj && ci.type == 'class') {
        html = html.replace('$constractor', `<h3>构造函数 / Constractor</h3>
        <p>${ci.constructorObj.description}</p>
        <p>输入参数</p>
        <ul>
         $parameters
        </ul>`);
        var parameters = [];
        (ci.constructorObj.jsdoctags || []).forEach(param => {
            if (param.tagName.text != 'param') {
                return;
            }
            var description = param.comment ? addDescLink(param.comment) : '';
            parameters.push(`<li><span style="white-space: nowrap;">${param.name.text || param.name}:
                <a>${addTypeLink(param.type)}</a></span>${description}</li>`)
        });
        html = html.replace('$parameters', parameters.join(''));
    } else {
        html = html.replace('$constractor','');
    }
    return html;
}

function processMethods(ci, html) {
    var allMethods = (ci.methodsClass || ci.methods).filter(m => !m.hasOwnProperty('inheritance'));
    findInheritedMethods(ci, allMethods);

    var methods = [];
    var shownAttributeCount = 0;
    allMethods.sort((m1, m2) => m1.name.localeCompare(m2.name)).forEach(method => {
        if (isAngularLifeCircle(method.name)) {
            return;
        }
        //如果当前方法没有描述，则往上找他的父类里要描述
        //先用严格模式找一遍
        var parentMethod = findMethodWithValidDescription(ci, method.name,
            m => !!m.description && getArgumentsString(m) == getArgumentsString(method));
        if (!parentMethod) {
            //使用非严格模式再找一遍
            parentMethod = findMethodWithValidDescription(ci, method.name, m => !!m.description);
        }
        method.description = parentMethod ? parentMethod.description : '';
        fixDescription(method);

        var isHidden = method.inheritInfo || (method.modifierKind && method.modifierKind.indexOf(PROTECTED) !== -1);
        if (!isHidden) {
            shownAttributeCount++;
        }

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
        var description = method.description + (method.since ? `<p>起始版本：${method.since}</p>` : '');
        var inheritance = getInheritanceInfo(method);
        var methodName = `${anchor(method.name)}${inheritance}${modifier}${getRichName(method)}`;
        var trChildElements = `<td style="white-space: nowrap;">${methodName}</td><td>${description}</td>
            <td>${returns}</td><td>${args}</td><td>${getDemoList(method)}</td>`;
        var display = isHidden ? 'none' : 'table-row';
        var bgColor = shownAttributeCount % 2 == 1 ? '#fff' : '#f8f8f8';

        methods.push(`<tr style="display:${display}; background-color:${bgColor}">${trChildElements}</tr>`);
    });

    var methodsTable;
    var hiddenAttributeCount = allMethods.length - shownAttributeCount;
    if (allMethods.length > 0) {
        methodsTable =
            `<table id="dynamicMethods" style="width:100%; display:${shownAttributeCount == 0 ? 'none' : 'table'}">
                <thead><tr><th>名称</th><th>说明</th><th>返回值</th><th>参数说明</th><th>示例</th></tr></thead>
                <tbody>$methods</tbody>
            </table>`;
        methodsTable += hiddenAttributeCount > 0 ?
            `<a style="margin-left: 10px" title="单击列出如下方法：\n1. 所有从父类继承过来的方法;\n2. 当前类中受保护的方法;"
            onclick="document.getElementById('dynamicMethods').lastChild.previousSibling.childNodes.forEach((tr,index)=> {
                tr.style.display = 'table-row';tr.style['background-color'] = index % 2 == 0 ? '#fff' : '#f8f8f8';
            });this.style.display='none';document.getElementById('dynamicMethods').style.display='table'">
            列出所有可用方法</a>` : '';
    } else {
        methodsTable = `<p>无</p>`;
    }
    return html.replace(`$methodsTable`, methodsTable).replace('$methods', methods.join(''));
}

function getArgumentsString(method) {
    return (method.args || []).map(a => a.name).join();
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

function fixDescription(metaInfo) {
    if (!metaInfo.hasOwnProperty('description')) {
        metaInfo.description = '';
    }
    metaInfo.description = metaInfo.description
        .replace(/<a\s+href\s*=\s*['"]\$demo\s*=\s*(.+?)\/(.+?)(#|\?.*?)?['"]/g, (found, comp, demoName, extra) => {
            extra = extra || '';
            var script = getOpenPopupScript(`/${comp}/${demoName}${extra}`);
            return `<a onclick="${script}"`;
        })
        .replace(/\$(\w+)\s*=\s*(.*?)\s*('|"|\n|<\/p>)/g, function (found, prop, value, suffix) {
            var values = metaInfo[prop];
            if (!metaInfo[prop]) {
                values = [];
                metaInfo[prop] = values;
            }
            if (values.indexOf(value) == -1) {
                values.push(value);
            }
            // remove these messages
            return suffix;
        });
    metaInfo.description = addDescLink(metaInfo.description);
}

function getInheritanceInfo(metaInfo) {
    var inherited = metaInfo.inheritInfo;
    return !inherited ? '' :
        `<a href="/components/jigsaw/api?apiItem=${inherited.from}&parentName=${inherited.type}#${metaInfo.name}">
        <span class="fa fa-long-arrow-up" style="color: #a94442; margin-right: 4px" title="Inherited"></span></a>`;
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
        .replace(/([^\ba-zA-z0-9])Jigsaw([^\ba-zA-z0-9])/g, '$1<a href="https://github.com/rdkmaster/jigsaw" ' +
            'title="请帮忙到GitHub上点个星星，更多的星星可以吸引越多的人加入我们。">Jigsaw</a>$2');
}

function getOpenPopupScript(url) {
    url = url[0] == '/' ? url : '/' + url;
    url = '/jigsaw' + url;
    return `document.getElementById('panel').style.display = 'block';
            var evalator = document.getElementById('evalator');
            if (evalator.src != location.host + '${url}') evalator.src = '${url}';`;
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
    if (type == 'Subscription' || type == 'Subscriber') {
        return `http://cn.rx.js.org/class/es6/${type}.js~${type}.html`;
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

function saveFile(type, fileName, html) {
    var path = `${output}/${type}`;
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, 755);
    }
    html += getPanelTemplate();
    html += getFooter(fileName);
    fs.writeFileSync(`${path}/${fileName}.html`, html);

    apiList.push({name: fileName, parentName: type});
}

function getFooter(name) {
    var info = findTypeMetaInfo(name);
    var type = '';
    switch (info.subtype || info.type) {
        case 'component':
        case 'directive':
        case 'injectable':
        case 'class':
            type = 'class';
            break;
        case 'interface':
            type = 'interface';
            break;
        case 'typealias':
            type = 'type';
            break;
        case 'enum':
            type = 'enum';
            break;
    }
    var reg = new RegExp('^\\s*export\\s+(abstract\\s+)?' + type + '\\s+' + name + '\\b');
    var source = info.sourceCode || fs.readFileSync(`${__dirname}/../../../${info.file}`).toString();
    var idx = source.split(/\r?\n/g).findIndex(line => line.match(reg));
    var hash = idx != -1 ? '#L' + (idx + 1) : '';
    var url = `https://github.com/rdkmaster/jigsaw/blob/master/${info.file}${hash}`;
    return getFooterTemplate()
        .replace('$editThisDoc', url)
        .replace('$wechatSubscription', getOpenPopupScript('doc/wechat-public-subscription.html'))
        .replace('$wechatGroup', getOpenPopupScript('doc/wechat-group.html'));
}

function checkUnknownTypes() {
    if (unknownTypes.length == 0) {
        return true;
    }
    unknownTypes.forEach(t => console.log('Unknown type found: ' + t));
    return false;
}

function getDemoList(metaInfo) {
    var demos = metaInfo.demo || [];
    var list = [];
    demos.forEach(url => {
        var match = url.match(/^\/?(.+?)\/(.+?)(#|\?.*?)?$/);
        if (!match) {
            console.error('ERROR: invalid demo url! url=' + url);
            process.exit(1);
        }
        var comp = match[1], demoName = match[2], extra = match[3] || '';
        list.push(`<li title="${getDemoSummary(comp, demoName)}"><a onclick="${getOpenPopupScript(url)}">${demoName}</a></li>`);
    });
    return list.length > 0 ? `<ul>${list.join('')}</li></ul>` : '';
}

function getDemoSummary(comp, demoName) {
    var demoPath = `${__dirname}/../../../src/app/demo/${comp}/${demoName}/demo.component.ts`;
    var code = fs.readFileSync(demoPath).toString();
    var summaryMatch = code.match(/\bsummary\s*(:.*?)?\s*=\s*['"](.*)['"]/);
    if (!summaryMatch) {
        console.log(`ERROR: can not summary info for demo: ${comp}/${demoName}`);
        console.log('hint: the value of summary should write in a single line!');
        process.exit(1);
    }
    return (summaryMatch[2] || '') + '\n单击立即运行示例';
}

function getDemoListWithHeader(metaInfo) {
    var demos = getDemoList(metaInfo);
    return demos ? '<a name="demos"></a><h3>相关示例</h3>' + demos : '';
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
$inputsTable

<a name="outputs"></a>
<h3>输出属性 / Outputs</h3>
$outputsTable

<a name="properties"></a>
<h3>普通属性 / Properties</h3>

$propertiesTable

<a name="methods"></a>
<h3>方法 / Methods</h3>

$methodsTable

$demos

<a name="object-oriented"></a>
<h3>面向对象 / Object Oriented</h3>
<ul><li>继承关系 $extends</li><li>实现接口 $implements</li><li>已知子类 $children</li></ul>
`
}

function getClassesTemplate() {
    return `
<h2>$name</h2>

<p>起始版本：$since</p>
$description

<a name="properties"></a>
<h3>普通属性 / Properties</h3>

$propertiesTable

<a name="methods"></a>
<h3>方法 / Methods</h3>

$methodsTable

$constractor

$demos

<a name="object-oriented"></a>
<h3>面向对象 / Object Oriented</h3>
<ul><li>继承关系 $extends</li><li>实现接口 $implements</li><li>已知子类 $children</li></ul>
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

// 有必要的话给文字弃用的样式和相应的提示
function getRichName(metaInfo) {
    if (metaInfo.deprecatedFrom) {
        return getDeprecatedTemplate()
            .replace(/\$version/g, metaInfo.deprecatedFrom)
            .replace(/\$replacement/g, metaInfo.replacement)
            .replace(/\$name/g, metaInfo.name);
    } else {
        return metaInfo.name;
    }
}

function getDeprecatedTemplate() {
    return `<span title="此api从版本 $version 开始被废弃，替代的办法为：\n$replacement"
                style="color: #888;text-decoration: line-through">$name</span>
            <span class="fa fa-exclamation-triangle" style="color:#ffa500"
                title="此api从版本 $version 开始被废弃，替代的办法为：\n$replacement"></span>`;
}

function getPanelTemplate() {
    return `
<div id="panel" class="api-panel">
    <div class="box">
        <span class="close" title="返回"
              onclick="document.getElementById('panel').style.display = 'none';">&times;</span>
        <iframe id="evalator"></iframe>
    </div>
</div>
`
}

function getFooterTemplate() {
    return `
<a name="footer"></a>
<div class="api-footer-wrapper">
    <div class="col">
        <h3>资源</h3>
        <ul>
            <li><a href="https://zhuanlan.zhihu.com/jigsaw" target="_blank">知乎专栏</a></li>
            <li><a href="https://github.com/rdkmaster/j-lunker"
                    target="_blank" title="属于你自己的在线代码运行服务器">J-lunker</a></li>
            <li><a href="https://github.com/rdkmaster/jigsaw-seed" target="_blank"
                    title="Jigsaw应用的种子工程，请让它到处生根发芽吧！">Jigsaw Seed</a></li>
            <li><a href="https://github.com/rdkmaster/jigsaw-tourist" target="_blank"
                    title="一个简单示例工程，新手宝典">Jigsaw Tourist</a></li>

            <li class="splitter"><a href="http://ngfans.net" target="_blank">Angular开发者</a></li>
            <li><a onclick="$wechatSubscription" title="及时了解Jigsaw的动态、新特性、技术分享">Jigsaw微信公众号</a></li>

            <li class="splitter"><a href="https://angular.cn" target="_blank">Angular中文</a></li>
            <li><a href="https://angular.io" target="_blank">Angular官网</a></li>
            <li><a href="https://blog.angular.io" target="_blank">Angular官博</a></li>
        </ul>
    </div>
    <div class="col">
        <h3>社区</h3>
        <ul>
            <li><a href="https://github.com/rdkmaster/jigsaw" target="_blank"
                title="请跳过去随手帮忙点个星星，越多的星星可以吸引越多的人加入我们">代码托管 / Github</a></li>
            <li><a href="https://github.com/rdkmaster/jigsaw/issues/new" target="_blank">报告BUG / 提需求</a></li>
            <li><a href="$editThisDoc" target="_blank"
                title="在GitHub上直接编辑这篇文档以帮助我们改进它">改进这篇文档</a></li>
            <li class="splitter"><a href="https://github.com/rdkmaster/rdk" target="_blank">RDK服务端</a></li>
            <li><a href="http://10.9.233.68:9953/webgis/default/index.html" target="_blank"
                title="仅限中兴内部访问">Web GIS</a></li>
        </ul>
    </div>
    <div class="col">
        <h3>帮助</h3>
        <ul>
            <li><a href="http://ngfans.net" target="_blank">在线提问 / 寻求帮助</a></li>
            <li><a onclick="$wechatGroup" title="和我们的开发者/使用者面对面交流">Jigsaw微信群提问</a></li>
            <li><a href="mailto:chen.xu8@zte.com.cn" target="_blank">直接联系我们</a></li>
            <li class="splitter"><a href="/components/quickstart/norm" target="_self">零基础起航</a></li>
        </ul>
    </div>
</div>
`
}
