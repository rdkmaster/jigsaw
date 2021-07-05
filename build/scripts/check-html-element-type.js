const fs = require('fs');
const path = require('path');

let hasError = false;

processAll('pc-components');
processAll('common/components');
processAll('common/directive');

if (hasError) {
    console.error('Node env has no HTMLElement declaration, and the compiler will complain that if someone like awade ' +
        'uses Jigsaw in a Node env.');
    process.exit(1);
} else {
    console.error(`Everything's fine!`);
}

function processAll(folder) {
    const cmpHome = path.resolve(`${__dirname}/../../src/jigsaw/${folder}`);
    const cmpFolders = fs.readdirSync(cmpHome);
    cmpFolders.forEach(cmpFolder => {
        const pathname = path.join(cmpHome, cmpFolder);
        const stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            processSourceFiles(pathname);
        }
    });
}

function processSourceFiles(sourceFolder) {
    const files = fs.readdirSync(sourceFolder);
    files.forEach(file => {
        const pathname = path.join(sourceFolder, file);
        const stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            processSourceFiles(pathname)
        } else {
            checkInputProperty(pathname);
        }
    });
}

function checkInputProperty(srcPath) {
    if (!srcPath.match(/.+\.ts$/i)) {
        return;
    }

    const source = fs.readFileSync(srcPath).toString();
    source.replace(/@Input\s*\(\s*\)\s*(public)?\s*(\w+)\s*:\s*HTMLElement/g, (found, _, prop) => {
        error(`Input property ${prop}'s type can NOT be "HTMLElement"! Use type "any" instead!`);
    });
}

function error(msg) {
    console.error(msg);
    hasError = true;
}
