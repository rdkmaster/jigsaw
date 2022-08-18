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
    const match = srcPath.match(/.+\.(ts|css)$/i);
    if (!match) {
        return;
    }

    const source = fs.readFileSync(srcPath).toString();
    if (match[1].toLowerCase() === 'ts') {
        source.replace(/\bstyles\s*:\s*\[\s*`([\s\S]*?)`\s*]/g, (found, styleCode) => {
            checkTagNameSelector(srcPath, styleCode);
            return '';
        });
    } else {
        checkTagNameSelector(srcPath, source);
    }
}

function checkTagNameSelector(srcPath, source) {
    const result = [];
    source.replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/^\s*(.*)\s*{/gm, (_, selectors) => {
            selectors.split(/,/).map(selector => selector.trim()).filter(selector => /^[a-z]/i.test(selector))
                .forEach(selector => result.push(selector));
        });
    if (result.length > 0) {
        error('No tag name selector is allowed in demo!');
        error('File:', srcPath);
        error('Selector:', result.join(', '))
    }
}

function error(...msg) {
    console.error.call(null, 'Error:', ...msg);
    hasError = true;
}


