const fs = require('fs');
const path = require('path');

let hasError = false;
checkAll();
if (hasError) {
    process.exit(1);
} else {
    console.error(`Everything's fine!`);
}

// checkPublicVariables('D:\\Codes\\jigsaw\\src\\jigsaw\\mobile-components\\alert\\alert.ts');

function checkAll(folder) {
    const cmpHome = path.resolve(`${__dirname}/../../src/jigsaw`);
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
            checkPublicVariables(pathname);
        }
    });
}

function checkPublicVariables(srcPath) {
    if (!srcPath.match(/.+\.ts$/i)) {
        return;
    }

    const source = fs.readFileSync(srcPath).toString();

    const vars = source.match(/\spublic\s+(static\s+)?_\$?\w+/g);
    if (!vars) {
        return;
    }

    vars.forEach(variable => {
        const fixed = variable.replace(/\$/g, '\\$');
        const reg = new RegExp(`[\\s\\S]*\\/\\*\\*([\\s\\S]*?)\\*\\/\\s*(@\\w+.*\\s*)?${fixed}\\b`);
        const match = source.match(reg);
        if (!match || match[1].indexOf('@internal') === -1) {
            const name = variable.replace(/public\s*(static\s+)?/, '').trim();
            error(`Error: variable "${name}" has no @internal flag!`);
        }
    });
}

function error(msg) {
    console.error(msg);
    hasError = true;
}


