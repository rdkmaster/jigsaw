
var fs = require('fs');
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
    if (demoSetFolder == __dirname.replace(/\\/g, '/') + '/') {
        // this is the lib dir
        return;
    }
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

    var html = '';
    content.forEach(item => {
        var folder = item.path.substring(demoFolder.length);
        html += `<input type="hidden" name="entries[_src/${folder}][encoding]" value="utf8" />`;
    });
        console.log(html)
}

function readDemoContent(content, demoFolder) {
    var demoFiles = fs.readdirSync(demoFolder);
    demoFiles.forEach(demoFile => {
        var pathname = demoFolder + demoFile;
        var stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            readDemoContent(content, pathname + '/');
        } else {
            content.push({path: pathname, code: readAndFixCode(pathname)});
        }
    });
}

function readAndFixCode(path) {
    var content = fs.readFileSync(path).toString();
    return content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

function getDemoHome() {
    var pathPartials = __dirname.split(/[/\\]/g);
    pathPartials.pop();
    var demoHome = pathPartials.join('/') + '/';
    return demoHome;
}

function getTemplate() {
    return fs.readFileSync('plunker.embed.template.html').toString();
}