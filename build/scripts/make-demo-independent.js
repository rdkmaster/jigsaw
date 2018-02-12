var fs = require('fs');
var template = getTemplate();
var demoHome = null;
var outputHome = process.argv.length > 2 ? process.argv[2] : './live-demo/';

if (fs.existsSync(outputHome)) {
    console.error("ERROR: remove output dir and try again: " + outputHome);
    process.exit(1);
}
outputHome = outputHome ? outputHome.trim() : './live-demo/';
outputHome = outputHome.match(/[\/\\]$/) ? outputHome : outputHome + '/';

makeAllJlunkers('demo');

function makeAllJlunkers(dirName) {
    demoHome = getDemoHome(dirName);

    var demoSetFolders = fs.readdirSync(demoHome);
    demoSetFolders.forEach(demoFolder => {
        var pathname = demoHome + demoFolder;
        var stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            processDemoSet(pathname + '/');
        }
    });
}

function processDemoSet(demoSetFolder) {
    var demoFolders = fs.readdirSync(demoSetFolder);
    demoFolders.forEach(demoFolder => {
        var pathname = demoSetFolder + demoFolder;
        var stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            makeJlunker(pathname + '/');
        }
    });
}

function makeJlunker(demoFolder, dirName) {
    var content = [];
    readFolderFiles(content, demoFolder);

    var compContentIndex = -1;
    var moduleContentIndex = -1;
    content.forEach((item, idx) => {
        item.path = 'app/demo/' + item.path.substring(demoFolder.length);
        if (item.path.match(/.+\.ts$/i)) {
            item.code = fixImport(item.code);
            item.code = fixTemplateUrl(item.code);
            item.code = fixStyleUrls(item.code);
            item.code = fixCodeForDemoOnly(item.code);
        }
        if (item.path.match(/.+\.html$/i)) {
            fixDemoComponentHtml(item, demoFolder);
        }
        if (item.path.match(/.+\.scss$/i)) {
            console.error('ERROR: do not use scss file in demo! we can not pass them in jlunker.');
            console.error(`       path=${demoFolder}`);
            process.exit(1);
        }
        if (item.path == 'app/demo/demo.component.ts') {
            compContentIndex = idx;
        } else if (item.path == 'app/demo/demo.module.ts') {
            moduleContentIndex = idx;
        }
    });
    if (compContentIndex == -1) {
        console.error('ERROR: need this file: ' + demoFolder + 'demo.module.ts, but i can not find it.');
        process.exit(1);
    }
    if (moduleContentIndex == -1) {
        console.error('ERROR: need this file: ' + demoFolder + 'demo.component.ts, but i can not find it.');
        process.exit(1);
    }

    var moduleItem = content[moduleContentIndex];
    fixDemoModuleTs(moduleItem, demoFolder);
    var compItem = content[compContentIndex];
    fixDemoComponentTs(compItem, moduleItem.code);

    content.push(getIndexHtml());
    content.push(getMainTs());
    content.push(getSystemJsConfig());
    content.push(getSystemJsAngularLoader());
    content.push(getAjaxInterceptor(content));
    content.push(getLiveDemoWrapperCSS());
    content.push(getAppComponentTs());
    content.push(getAppComponentHtml());
    content.push(getAppModuleTs(findModuleClassName(moduleItem.code)));

    var html = '';
    content.forEach(item => {
        var path = item.path;
        item.code = escapeCode(item.code);
        html += `<input type="hidden" name="entries[${path}][encoding]" value="utf8" />\n`;
        html += `<input type="hidden" name="entries[${path}][content]" value="${item.code}" />\n`;
    });

    var jlunker = template
        .replace('<!-- replace-by-content -->', html)
        .replace('<!-- replace-by-title -->', demoFolder.substring(demoHome.length, demoFolder.length-1));

    var saveTo = outputHome + demoFolder.substring(demoHome.length) + (dirName ? dirName + '/' : '');
    makeDirs(saveTo);
    saveTo += 'index.html';
    if (fs.existsSync(saveTo)) {
        console.error('file name conflict: ' + saveTo);
    } else {
        fs.writeFileSync(saveTo, jlunker);
        console.log('made jlunker to ' + saveTo);
    }
}

function readFolderFiles(content, fileFolder) {
    var demoFiles = fs.readdirSync(fileFolder);
    demoFiles.forEach(file => {
        var pathname = fileFolder + file;
        var stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            readFolderFiles(content, pathname + '/');
        } else {
            content.push({path: pathname, code: readCode(pathname)});
        }
    });
}

function fixTemplateUrl(code) {
    return code.replace(/\btemplateUrl\s*:\s*['"]\s*(.*?)\s*['"]/g, (found, templateUrl) => {
        if (templateUrl.substring(0, 2) !== './') {
            templateUrl = './' + templateUrl;
        }
        return 'templateUrl: "' + templateUrl + '"';
    });
}

function fixStyleUrls(code) {
    return code.replace(/\bstyleUrls\s*:\s*(\[[\s\S]*?\])/g, (found, urlString) => {
        var urls = eval(urlString);
        urls = urls.map(url => {
            if (url.substring(0, 2) !== './') {
                url = './' + url;
            }
            return url;
        });
        return 'styleUrls: ["' + urls.join('", "') + '"]';
    });
}

function fixImport(code) {
    var jigsawImports = [];
    var rawImports = [];
    while (true) {
        var match = code.match(/\bimport\s+\{([\s\S]+?)\}\s+from\s+['"](.+?)['"]/);
        if (!match) {
            break;
        }
        if (match[2].match(/jigsaw\/.+?/)) {
            var importString = match[1];
            var imports = importString.split(/,/g).map(item => item.trim());
            imports.forEach(item => {
                if (!!item) jigsawImports.push(item)
            });
        } else {
            rawImports.push(match[0]);
        }
        code = code.substring(match.index + match[0].length);
    }
    jigsawImports = jigsawImports.sort((a, b) => a.localeCompare(b));

    var jigsawImportString = '';
    if (jigsawImports.length > 0) {
        jigsawImportString = 'import {\n';
        for(var i = 0, len = jigsawImports.length; i < len; i += 3) {
           jigsawImportString += '    ' + jigsawImports.slice(i, i+3).join(', ') + ',\n';
        }
        jigsawImportString += '} from "@rdkmaster/jigsaw";';
    }

    return jigsawImportString + '\n' + rawImports.join(';\n') + code;
}

function fixCodeForDemoOnly(code) {
    return code.replace(/\/\* #for-live-demo-only#([\s\S]*?)\*\//g, (found, codeForDemo) => codeForDemo.trim());
}

// 删除 jigsaw-demo-description 相关内容
function fixDemoComponentHtml(component, folder) {
    var re = /<!-- ignore the following lines[\s\S]*<!-- start to learn the demo from here -->\r?\n/;
    component.code = component.code.replace(re, '');

    if (component.code.indexOf('jigsaw-demo-description') != -1) {
        console.error('ERROR: can not strip "jigsaw-demo-description" from html!');
        console.error(`       path=${folder}`);
        process.exit(1);
    }
}

function fixDemoComponentTs(component, moduleCode) {
    var mainComp = findExportsComponent(moduleCode);
    if (!mainComp) {
        console.error('ERROR: need a "exports" property in the module code, ' +
                    'and the value of which should contains only one component!');
        process.exit(1);
    }

    // 给组件加上jigsaw-live-demo的selector，这个在index.html里会用到
    component.code = component.code.replace(/@Component\s*\(\s*\{([\s\S]*?)\}\s*\)[\s\S]*?export\s+class\s+(\w+?)\b/g,
        (found, props, className) => {
            if (className != mainComp) {
                // 在demo.component.ts文件中可能被定义了多个组件
                return found;
            }
            if (found.match(/selector\s*:/)) {
                console.error('ERROR: do NOT set "selector" property for the main component, ' +
                    'remove it and try again, path=' + component.path);
                process.exit(1);
            }
            return found.replace(/@Component\s*\(\s*\{/, '@Component({\n    selector: "jigsaw-live-demo",');
        });

    // 处理description变量
    component.code = component.code.replace(/require\s*\(\s*["']!!raw-loader!\s*.*\/readme.md["']\s*\)/,
                                            '"## 本DEMO的详细描述在readme.md中 ##"');
}

// 转变demo.module.ts文件
function fixDemoModuleTs(module, demoFolder) {
    // @NgModule()里必须包含一个exports，用于将组件暴露给上级组件
    var comp = findExportsComponent(module.code);
    if (!comp) {
        console.error('ERROR: need a "exports" property in the module code, ' +
                    'and the value of which should contains only one component!');
        console.error(`       module path=${demoFolder}`);
        process.exit(1);
    }

    // 删除 JigsawDemoDescriptionModule 相关的东西
    module.code = module.code.replace(/import\s*{\s*JigsawDemoDescriptionModule\s*}\s*from.*\r?\n/, '');
    module.code = module.code.replace(/\bJigsawDemoDescriptionModule\b\s*,?/g, '');
}

function findExportsComponent(moduleCode) {
    // 如果demo代码中，把exports这行给注释掉了，则会有bug，仅靠静态分析如何解决这个问题？
    var match = moduleCode.match(/@NgModule\s*\(\s*{[\s\S]*\bexports\s*:\s*\[\s*(\w+)\s*\]/);
    return match && match[1] ? match[1] : '';
}

function findModuleClassName(moduleCode) {
    var match = moduleCode.match(/@NgModule\s*\(\s*\{[\s\S]*?\}\s*\)[\s\S]*?export\s+class\s+(\w+?)\b/);
    return match[1];
}

function escapeCode(code) {
    return code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

function makeDirs(path) {
    var pathPartials = path.split(/[\/\\]/g);
    for(var i = 1; i < pathPartials.length; i++) {
        var arr = pathPartials.slice(0, i);
        var p = arr.join('/');
        // p == '' if path is absolute
        if (fs.existsSync(p) || !p) {
            continue;
        }
        fs.mkdirSync(p, 755);
    }
}

function readCode(path) {
    return fs.readFileSync(path).toString();
}

function getDemoHome(dirName) {
    var pathPartials = __dirname.split(/[\/\\]/g);
    pathPartials.pop();
    pathPartials.pop();
    var demoHome = pathPartials.join('/') + '/src/app/'+ dirName + '/';
    return demoHome;
}

function getTemplate() {
    return fs.readFileSync(__dirname + '/demo-independent-templates/j-lunker.embed.template.html').toString();
}

function getIndexHtml() {
    return {
        path: 'index.html',
        code: readCode(__dirname + '/demo-independent-templates/index.html')
    }
}

function getMainTs() {
    return {
        path: 'main.ts',
        code: readCode(__dirname + '/demo-independent-templates/main.ts')
    }
}

function getSystemJsAngularLoader() {
    return {
        path: 'systemjs-angular-loader.js',
        code: readCode(__dirname + '/demo-independent-templates/systemjs-angular-loader.js')
    }
}

function getSystemJsConfig() {
    return {
        path: 'systemjs.config.js',
        code: readCode(__dirname + '/demo-independent-templates/systemjs.config.js')
    }
}

function getAjaxInterceptor(content) {
    var code = readCode(__dirname + '/../../src/app/app.interceptor.ts');
    code = fixImport(code);

    // 不能位于在replace之后
    var urls = findMockDataUrls(code, content);

    // merge all mock data json file into this class
    var mockData;
    code = code.replace(/\brequire\s*\(['"]\.\.\/mock-data\/(.+)\.json['"]\s*\)/g, function(found, file) {
        if (!mockData) {
            mockData = {};
        }
        if (!mockData[file]) {
            mockData[file] = readCode(__dirname + '/../../src/mock-data/' + file + '.json');
        }
        return `mockData["${file}"]`;
    });
    if (!mockData) {
        console.error('ERROR: can not find any required mock data in app.interceptor.ts!');
        process.exit(1);
    }


    code += '\nconst mockData = {\n';
    for (var p in mockData) {
        var value = {};
        // 只有demo用到的数据才需要加进来
        if (urls.indexOf('mock-data/' + p) != -1) {
            value = JSON.parse(mockData[p]);
        }
        // compress mock data to shrink the size of the demo file
        code += `    "${p}": ${JSON.stringify(value)},\n`;
    }
    code += '};';

    return {
        path: 'app/app.interceptor.ts',
        code: code
    }
}

function findMockDataUrls(interceptorCode, content) {
    var match = interceptorCode.match(/this\.dataSet\s*\[\s*['"].*?['"]\s*\]\s*=\s*require\b/g);
    if (!match) {
        console.error('ERROR: parse app.interceptor.ts failed, no mock-data url found!');
        process.exit(1);
    }
    var allUrls = [];
    match.forEach(item => allUrls.push('mock-data/' + item.match(/['"]\s*(.*?)\s*['"]/)[1]));
    if (allUrls.length == 0) {
        console.error('ERROR: parse app.interceptor.ts failed, no mock-data url found! allUrls.length == 0');
        process.exit(1);
    }
    var urls = allUrls.filter(url => {
        var found = false;
        content.forEach(item => {
            if (!item.path.match(/^app\//)) {
                return;
            }
            // 如果demo的代码的注释部分有这个url，则会有bug，仅靠静态分析如何解决？
            var re = new RegExp('[\'"`/]' + url + '[\'"`]');
            if (item.code.match(re)) {
                found = true;
            }
        });
        return found;
    });
    return urls;
}

function getLiveDemoWrapperCSS() {
    return {
        path: 'live-demo-wrapper.css',
        code: readCode(__dirname + '/../../src/app/live-demo-wrapper.css')
    }
}

function getAppComponentTs() {
    return {
        path: 'app/app.component.ts',
        code: readCode(__dirname + '/demo-independent-templates/app.component.ts')
    }
}

function getAppComponentHtml() {
    return {
        path: 'app/app.component.html',
        code: readCode(__dirname + '/demo-independent-templates/app.component.html')
    }
}

function getAppModuleTs(moduleClassName) {
    return {
        path: 'app/app.module.ts',
        code: readCode(__dirname + '/demo-independent-templates/app.module.ts')
                .replace(/\$DemoModuleClassName/g, moduleClassName)
    }
}
