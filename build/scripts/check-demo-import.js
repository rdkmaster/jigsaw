const fs = require('fs');
const path = require('path');

const reg = /^\s*import\s*{([\s\S]*?)}\s*from\s*['"](.+)['"]\s*;?\s*/gm;
processAllComponents('pc');
processAllComponents('mobile');

function processAllComponents(platform) {
    const demoHome = path.resolve(`${__dirname}/../../src/app/demo/${platform}`);
    const demoSetFolders = fs.readdirSync(demoHome);
    demoSetFolders.forEach(demoFolder => {
        let pathname = path.join(demoHome, demoFolder);
        let stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            processDemoSet(pathname + '/');
        }
    });
}

function processDemoSet(demoSetFolder) {
    let demoFolders = fs.readdirSync(demoSetFolder);
    demoFolders.forEach(demoFolder => {
        let pathname = path.join(demoSetFolder, demoFolder);
        let stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            checkDemo(pathname)
        }
    });
}

function checkDemo(demoPath) {
    let files = fs.readdirSync(demoPath);
    files.forEach(file => {
        let pathname = path.join(demoPath, file);
        let stat = fs.lstatSync(pathname);
        if (stat.isDirectory()) {
            checkDemo(pathname)
        } else {
            fixDemoSource(pathname);
            // checkDemoSource(pathname);
        }
    });
}

function checkDemoSource(srcPath) {
    if (!srcPath.match(/.+\.ts$/i)) {
        return;
    }
    console.log(`Checking ${srcPath} ...`);
    const source = fs.readFileSync(srcPath).toString().replace(reg, (found, imports, from) => {
        if (!from.match(/jigsaw\/.+/)) {
            return found;
        }
        console.error("Error: invalid import from path, import jigsaw's api from 'jigsaw/public_api' instead!");
        console.error(" path:", srcPath);
        process.exit(1);
    });
}

function fixDemoSource(srcPath) {
    if (!srcPath.match(/.+\.ts$/i)) {
        return;
    }
    console.log(`Checking ${srcPath} ...`);
    const jigsawImports = [], thirdPartyImports = [], demoImports = [];
    let source = fs.readFileSync(srcPath).toString().replace(reg, (found, rawImports, from) => {
        if (from.match(/jigsaw\/.+/)) {
            jigsawImports.push(...rawImports.split(/,/).map(i => i.trim()));
        } else if (from.match(/\.\/|app\//)) {
            demoImports.push(found.trim());
        } else {
            thirdPartyImports.push(found.trim());
        }
        return '';
    });
    if (demoImports.length === 0) {
        demoImports.push('\n\n');
    }

    let importStr = '';
    jigsawImports.forEach((imp, idx) => {
        importStr += imp + ', ';
        if (idx > 0 && idx % 5 === 0) {
            importStr = importStr.trim() + '\n    ';
        }
    });
    importStr = importStr.substr(0, importStr.length - 2);
    if (jigsawImports.length > 5) {
        importStr = `\n    ${importStr}\n`;
    }
    source = thirdPartyImports.join('\n') + '\n' +
        `import {${importStr}} from "jigsaw/public_api";\n` +
        demoImports.join('\n') + '\n'+ source;
    fs.writeFileSync(srcPath, source);
    process.exit(0)
}

