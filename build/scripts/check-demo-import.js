const fs = require('fs');
const path = require('path');

const reg = /^\s*import\s*{([\s\S]*?)}\s*from\s*['"](.+)['"]\s*;?\s*/gm;
let jigsawApi = 'jigsaw/public_api';
processAllComponents('pc');
jigsawApi = 'jigsaw/mobile_public_api';
processAllComponents('mobile');
console.error(`All demo's imports are fine!`);

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
            // fixDemoSource(pathname);
            checkDemoSource(pathname);
        }
    });
}

function checkDemoSource(srcPath) {
    if (!srcPath.match(/.+\.ts$/i)) {
        return;
    }
    console.log(`Checking ${srcPath} ...`);
    fs.readFileSync(srcPath).toString().replace(reg, (found, imports, from) => {
        if (from.match(/jigsaw\/.+/) && from !== jigsawApi) {
            console.error(`Error: invalid import from path, import jigsaw's api from '${jigsawApi}' instead!`);
            console.error(" path:", srcPath);
            process.exit(1);
        }
    });
}

function fixDemoSource(srcPath) {
    if (!srcPath.match(/.+\.ts$/i)) {
        return;
    }
    console.log(`Fixing ${srcPath} ...`);
    const jigsawImports = [], thirdPartyImports = [], demoImports = [];
    const source = fs.readFileSync(srcPath).toString()
        .replace(reg, (found, rawImports, from) => {
            if (from.match(/jigsaw\/.+/)) {
                jigsawImports.push(...rawImports.split(/,/).map(i => i.trim()).filter(i => !!i));
            } else if (from.match(/\.\/|app\//)) {
                demoImports.push(found.trim());
            } else {
                thirdPartyImports.push(found.trim());
            }
            return '';
        })
        .trim();

    let importStr = '';
    if (thirdPartyImports.length > 0) {
        importStr = thirdPartyImports.join('\n');
    }
    if (jigsawImports.length > 0) {
        let str = '';
        jigsawImports.forEach((imp, idx) => {
            str += imp + ', ';
            if (idx > 0 && idx % 3 === 0) {
                str = str.trim() + '\n    ';
            }
        });
        str = str.replace(/,\s*$/, '');
        if (jigsawImports.length > 4) {
            str = `\n    ${str}\n`;
        }
        importStr += `\nimport {${str}} from "${jigsawApi}";`;
    }
    if (demoImports.length > 0) {
        importStr += '\n' + demoImports.join('\n');
    }

    if (importStr) {
        importStr += '\n\n';
    }

    fs.writeFileSync(srcPath, importStr + source + '\n');
    // process.exit(0)
}

