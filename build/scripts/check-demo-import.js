const fs = require('fs');
const path = require('path');

const reg = /^\s*import\s*{([\s\S]*?)}\s*from\s*['"](.+)['"]\s*;?\s*/gm;

let jigsawApi, errors;
const r1 = checkAll('pc');
const r2 = checkAll('mobile');
console.error(r1);
console.error(r2);
if (!r1 && !r2) {
    console.log(`All demo's imports are fine!`);
    process.exit(0);
} else {
    process.exit(1);
}

function checkAll(platform) {
    jigsawApi = platform === 'pc' ? 'jigsaw/public_api' : 'jigsaw/mobile_public_api';
    errors = [];
    errors.push(`Error: invalid import from path, import jigsaw's api from '${jigsawApi}' instead!`);
    processAllComponents(platform);
    return errors.length === 1 ? '' : errors.join('\n');
}

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
    fs.readFileSync(srcPath).toString().replace(reg, (found, imports, from) => {
        if (from.match(/jigsaw\/.+/) && from !== jigsawApi) {
            errors.push("  path: " + srcPath);
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

