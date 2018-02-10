var fs = require('fs');

var demoHome = __dirname + '/../../src/app/demo/';
var outputFile = __dirname + '/../../e2e/live-demo/j-lunker.e2e-spec.ts';

var template = getTemplate();
var demoIndex = 1;
var code = genAllTestcases(demoHome);

if (fs.existsSync(outputFile)) {
    console.warn('WARN: this file is overwritten:\n' + outputFile);
}
fs.writeFileSync(outputFile, code);

function genAllTestcases(demoHome) {
    var code = template.prefix;
    var demoSetFolders = fs.readdirSync(demoHome);
    demoSetFolders.forEach(componentName => {
        var pathname = demoHome + componentName;
        var stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            code += genComponentTestcases(demoHome, componentName);
        }
    });
    code += template.suffix;
    return code;
}

function genComponentTestcases(demoHome, componentName) {
    var code = '';
    var demoFolders = fs.readdirSync(demoHome + componentName);
    demoFolders.forEach(demoName => {
        var url = componentName + '/' + demoName;
        var pathname = demoHome + url;
        var stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            code += '\n        // demo index: ' + (demoIndex++) +
                    template.repeat.replace(/\$url/g, url) + '\n';
        }
    });
    return code;
}

function getTemplate() {
    var template = fs.readFileSync(__dirname + '/../../e2e/live-demo/plunker.e2e-spec.template').toString();
    var repeatStartTag = '[repeat start]';
    var repeatEndTag = '[repeat end]';
    var idx1 = template.indexOf(repeatStartTag);
    var idx2 = template.indexOf(repeatEndTag);
    if (idx1 == -1 || idx2 == -1 || idx1 >= idx2) {
        console.error('ERROR: invalid spec template found! tag "[repeat start]" or "[repeat end]" not fuond');
        process.exit(1);
    }
    var prefix = template.substring(0, idx1).trim();
    idx1 += repeatStartTag.length;
    var repeat = '\n        ' + template.substr(idx1, idx2 - idx1).trim();
    var suffix = '    ' + template.substring(idx2 + repeatEndTag.length).trim();

    return {prefix, repeat, suffix};
}
