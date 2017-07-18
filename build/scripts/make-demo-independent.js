
var fs = require('fs');
var outputHome = './live-demo/'
var demoHome = getDemoHome();
var template = getTemplate();

var demoSetFolders = fs.readdirSync(demoHome);
demoSetFolders.forEach(demoFolder => {
    var pathname = demoHome + demoFolder;
    var stat = fs.lstatSync(pathname);
    if (stat.isDirectory()) {
        processDemoSet(pathname + '/');
    }
});

function processDemoSet(demoSetFolder) {
    console.log('processing ' + demoSetFolder);

    var demoFolders = fs.readdirSync(demoSetFolder);
    demoFolders.forEach(demoFolder => {
        var pathname = demoSetFolder + demoFolder;
        var stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            makePlunker(pathname + '/');
        }
    });

}

function makePlunker(demoFolder) {
    console.log('make plunker for ' + demoFolder);
    var content = [];
    readDemoContent(content, demoFolder);
    content.forEach(item => {
        item.path = 'app/' + item.path.substring(demoFolder.length);
        if (item.path == 'app/app.component.ts') {
            item.code = fixAppComponentTs(item.code);
        }
        if (item.path == 'app/app.module.ts') {
            item.code = fixAppModuleTs(item.code);
        }
    });

    content.push(getIndexHtml());
    content.push(getMainTs());
    content.push(getSystemJsConfig());
    content.push(getSystemJsAngularLoader());

    var html = '';
    content.forEach(item => {
        var path = item.path;
        html += `<input type="hidden" name="entries[${path}][encoding]" value="utf8" />\n`;
        html += `<input type="hidden" name="entries[${path}][content]" value="${item.code}" />\n`;
    });
    var plunker = template.replace('<!-- replaced-by-content -->', html);

    var saveTo = outputHome + demoFolder.substring(demoHome.length);
    makeDirs(saveTo);
    saveTo += 'plunker.embed.html';
    fs.writeFileSync(saveTo, plunker);
}

function readDemoContent(content, demoFolder) {
    if (!fs.existsSync(demoFolder + 'app.module.ts')) {
        console.error('need this file: ' + demoFolder + 'app.module.ts');
        process.exit(100);
    }
    if (!fs.existsSync(demoFolder + 'app.component.ts')) {
        console.error('need this file: ' + demoFolder + 'app.component.ts');
        process.exit(100);
    }

    var demoFiles = fs.readdirSync(demoFolder);
    demoFiles.forEach(demoFile => {
        var pathname = demoFolder + demoFile;
        var stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            readDemoContent(content, pathname + '/');
        } else {
            content.push({path: pathname, code: readAndEscapeCode(pathname)});
        }
    });
}

function fixAppComponentTs(appCompCode) {
    return appCompCode.replace(/\btemplateUrl\s*:\s*\&.+?;\s*(.*)\s*\&.+?;/, (found, templateUrl) => {
        if (templateUrl.substring(0, 2) !== './') {
            templateUrl = './' + templateUrl;
        }
        return 'templateUrl: &#x27;' + templateUrl + '&#x27;';
    }).replace(/@Component\({/, '@Component({\n    selector: &#x27;jigsaw-app&#x27;,');
}

function fixAppModuleTs(appModuleCode) {
    appModuleCode = "import {BrowserModule} from '@angular/platform-browser';\n" + appModuleCode;
    return appModuleCode
        .replace(/\bimports\s*:\s*\[\s*(.*)\s*\]\s*,/,
            (found, imports) => 'imports: [BrowserModule, ' + imports + '],')
        .replace(/export\s+class\s+(.+)\s+{/, 'export class AppModule {')
        .replace(/\}\s+from\s+&.+?;(\.\.\/)*jigsaw\/.+/g, '} from &#x27;@rdkmaster/jigsaw&#x27;');
}

function makeDirs(path) {
    var pathPartials = path.split(/[/\\]/g);
    for(var i = 1; i < pathPartials.length; i++) {
        var arr = pathPartials.slice(0, i);
        var p = arr.join('/');
        if (fs.existsSync(p)) {
            continue;
        }
        fs.mkdirSync(p, 755);
    }
}

function readAndEscapeCode(path) {
    var content = fs.readFileSync(path).toString();
    return content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

function getDemoHome() {
    var pathPartials = __dirname.split(/[/\\]/g);
    pathPartials.pop();
    pathPartials.pop();
    var demoHome = pathPartials.join('/') + '/src/app/demo/';
    return demoHome;
}

function getTemplate() {
    return fs.readFileSync('./demo-independent-templates/plunker.embed.template.html').toString();
}

function getIndexHtml() {
    return {
        path: 'index.html',
        code: readAndEscapeCode('./demo-independent-templates/index.html')
    }
}

function getMainTs() {
    return {
        path: 'main.ts',
        code: readAndEscapeCode('./demo-independent-templates/main.ts')
    }
}

function getSystemJsAngularLoader() {
    return {
        path: 'systemjs-angular-loader.js',
        code: readAndEscapeCode('./demo-independent-templates/systemjs-angular-loader.js')
    }
}

function getSystemJsConfig() {
    return {
        path: 'systemjs.config.js',
        code: readAndEscapeCode('./demo-independent-templates/systemjs.config.js')
    }
}