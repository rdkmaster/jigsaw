const fs = require('fs');
const path = require('path');
const seedPath = process.argv.length > 2 ? process.argv[2] : __dirname + '/../../../jigsaw-seed';
const angularJson = fs.readFileSync(seedPath + '/angular.json').toString().trim();
const packageJson = fs.readFileSync(seedPath + '/package.json').toString().trim();
const descCode = readCode('src/app/demo-description/demo-description.ts')
    .replace("'/* angular.json goes here */'", angularJson)
    .replace("'/* package.json goes here */'", packageJson);
writeCode('src/app/demo-description/demo-description.ts', descCode);


processAllComponents();

function processAllComponents() {
    const demoHome = path.resolve(__dirname + '/../../src/app/demo/pc');
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
            patchDemo(pathname)
        }
    });
}

function patchDemo(demoPath) {
    console.log(`Patching ${demoPath} ...`);
    patchDemoTs(demoPath);
    patchDemoHtml(demoPath);
}

function patchDemoTs(demoPath) {
    const cmpPath = path.join(demoPath, 'demo.component.ts');
    let cmpCode = fs.readFileSync(cmpPath).toString();
    if (cmpCode.match(/\b__codes:\s*any\s*=\s*{/)) {
        console.error('It seems that the demo has been patched! path:', demoPath);
        process.exit(1);
    }

    const match1 = cmpCode.match(/\b(description:\s*string\s*=\s*)([\s\S]*)/);
    let end1 = match1 ? findQuoteEnd(match1[2]) : -1;
    const match2 = cmpCode.match(/\b(summary:\s*string\s*=\s*)([\s\S]*)/);
    let end2 = match2 ? findQuoteEnd(match2[2]) : -1;
    if (end1 === -1 && end2 === -1) {
        console.error('unable to find a valid position to patch! path:', demoPath);
        process.exit(1);
    }
    end1 = end1 + match1.index + match1[1].length;
    end2 = end2 + match2.index + match2[1].length;
    let end = Math.max(end1, end2);
    // 寻找下一行
    for (; end < cmpCode.length; end++) {
        if (cmpCode[end] === '\n') {
            end++;
            break;
        }
    }
    if (end >= cmpCode.length) {
        console.error('unable to find a valid new line to patch! path:', demoPath);
        process.exit(1);
    }

    const allFiles = [];
    readAllFiles(demoPath);
    const entries = allFiles.map(file => `        "${file}": require('!!raw-loader!./${file}'),`).join('\n');

    cmpCode = cmpCode.substring(0, end) + `    __codes: any = {\n${entries}\n    };\n` +
        cmpCode.substring(end);
    fs.writeFileSync(cmpPath, cmpCode);

    function readAllFiles(folder) {
        const folders = fs.readdirSync(folder);
        folders.forEach(file => {
            let pathname = path.join(folder, file);
            let stat = fs.lstatSync(pathname);
            if (stat.isDirectory()) {
                readAllFiles(pathname, allFiles);
            } else {
                allFiles.push(pathname.substring(demoPath.length + 1).replace(/\\/g, '/'));
            }
        });
    }
}

function patchDemoHtml(demoPath) {
    const htmlPath = path.join(demoPath, 'demo.component.html');
    let htmlCode = fs.readFileSync(htmlPath).toString();
    if (htmlCode.match(/\[codes]\s*=\s*['"]__codes['"]/)) {
        console.error('It seems that the demo has been patched! path:', demoPath);
        process.exit(1);
    }
    htmlCode = htmlCode.replace(/(<jigsaw-demo-description\s+)/, '$1[codes]="__codes" ');
    fs.writeFileSync(htmlPath, htmlCode);
}

function readCode(path) {
    return fs.readFileSync(__dirname + '/../../' + path).toString();
}

function writeCode(path, content) {
    fs.writeFileSync(__dirname + '/../../' + path, content);
}

function findQuoteEnd(str, startIndex = 0) {
    const target = str.charAt(startIndex);
    if ("'\"`".indexOf(target) === -1) {
        return -1;
    }
    const re = new RegExp(target);
    let index = startIndex;
    while (true) {
        str = str.substring(startIndex + 1);
        const match = str.match(re);
        if (!match) {
            break;
        }
        startIndex = match.index;
        index += match.index + 1;
        const backSlashMatch = str.match(new RegExp(`(\\\\*?)${target}`));
        if (backSlashMatch[1].length % 2 === 0) {
            // 有偶数个反斜杠，他们相互抵消了，就不会转义当前这个边界字符了，所以，这个就是我们需要的
            return index;
        }
    }
    return -1;
}
