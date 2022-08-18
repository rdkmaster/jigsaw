const fs = require('fs');
const path = require('path');

let hasError = false;
checkAll();
if (hasError) {
    console.error(`There are errors, check the log for the detail!`);
    process.exit(1);
} else {
    console.log(`Everything's fine!`);
}

function checkAll() {
    const cmpHome = path.resolve(`${__dirname}/../../src/app/for-internal/demo/pc`);
    const cmpFolders = fs.readdirSync(cmpHome);
    cmpFolders.forEach(cmpFolder => {
        const pathname = path.join(cmpHome, cmpFolder);
        const stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            checkSourceFiles(pathname);
        }
    });
}

function checkSourceFiles(sourceFolder) {
    const files = fs.readdirSync(sourceFolder);
    files.forEach(file => {
        const pathname = path.join(sourceFolder, file);
        const stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            checkSourceFiles(pathname)
        } else {
            doCheck(pathname);
        }
    });
}

function doCheck(srcPath) {
    const match = srcPath.match(/.+\.ts$/i);
    if (!match) {
        return;
    }

    const source = fs.readFileSync(srcPath).toString();
    source.replace(/\bstyleUrls:\s*(\[[\s\S]*?])/, (_, urls) => {
        if (eval(urls).find(url => url.match(/.+\.scss/i))) {
            error('Error: using scss file in demo is NOT allowed');
            error('File:', srcPath);
        }
    });
}

function error(...msg) {
    console.error.call(null, 'Error:', ...msg);
    hasError = true;
}


