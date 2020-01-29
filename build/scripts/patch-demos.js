const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const seedPath = process.argv.length > 2 ? process.argv[2] : __dirname + '/../../../jigsaw-seed';
checkBranch(seedPath);

const angularJson = fs.readFileSync(seedPath + '/.angular-cli.json').toString().trim();
writeCode('src/app/demo-description/.angular-cli.json', angularJson);
const packageJson = fs.readFileSync(seedPath + '/package.json').toString().trim();
writeCode('src/app/demo-description/package.json', packageJson);

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
    checkDemoModuleCode(demoPath);

    const cmpPath = path.join(demoPath, 'demo.component.ts');
    let cmpCode = fs.readFileSync(cmpPath).toString();
    if (cmpCode.match(/\b__codes:\s*any\s*=\s*{/)) {
        console.error('It seems that the demo has been patched! path:', demoPath);
        process.exit(1);
    }

    const match1 = cmpCode.match(/\b(summary:\s*string\s*=\s*)([\s\S]*)/);
    const match2 = cmpCode.match(/\b(description:\s*string\s*=\s*)([\s\S]*)/);
    const match = match1.index > match2.index ? match1 : match2;
    let end = match ? findQuoteEnd(match[2]) : -1;
    if (end === -1) {
        // 有可能是下面的方式引入的文本
        // description: string = require('!!raw-loader!./readme.md');
        const rMatch = match[2].match(/^require\(['"`]!!raw-loader!.+?['"`]\);?/);
        if (rMatch) {
            end = rMatch[0].length;
        } else {
            console.error('unable to find a valid position to patch! path:', demoPath);
            process.exit(1);
        }
    } else {
        // 此时end指向最后一个引号，需要往后偏移一个位置
        end++;
    }
    end = end + match.index + match[1].length;

    const allFiles = [];
    readAllFiles(demoPath);
    const entries = allFiles.map(file => `        "${file}": require('!!raw-loader!./${file}'),`).join('\n');

    const part1 = cmpCode.substring(0, end);
    const part2 = cmpCode.substring(end).replace(/^\s*;?/, '');
    cmpCode = `${part1}\n    __codes: any = {\n${entries}\n    };\n` +
        `    // ====================================================================\n${part2}`;
    fs.writeFileSync(cmpPath, cmpCode);

    function readAllFiles(folder) {
        const folders = fs.readdirSync(folder);
        folders.forEach(file => {
            let pathname = path.join(folder, file);
            let stat = fs.lstatSync(pathname);
            if (stat.isDirectory()) {
                readAllFiles(pathname);
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
    htmlCode = htmlCode.replace(/(<j(igsaw)?-demo-description\s+)/, '$1[codes]="__codes" ');
    fs.writeFileSync(htmlPath, htmlCode);
}

function readCode(path) {
    return fs.readFileSync(__dirname + '/../../' + path).toString();
}

function writeCode(path, content) {
    fs.writeFileSync(__dirname + '/../../' + path, content);
}

function findQuoteEnd(source, startIndex = 0) {
    const target = source.charAt(startIndex);
    if ("'\"`".indexOf(target) === -1) {
        return -1;
    }
    const re = new RegExp(target);
    let index = startIndex;
    let str = source;
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
            const match = source.substring(index + 1).match(/^\s*\+\s*['"`]/);
            if (match) {
                // 这是一个类似 "aa" + "bb" 形式的字符串，继续找下去
                return findQuoteEnd(source, index + match[0].length);
            } else {
                return index;
            }
        }
    }
    return -1;
}

// 每个demo.module.ts的NgModule装饰器中，必须包含一个exports属性，并且其值必须包含一个组件类名
// 凡是不符合这个规则的，都报错
function checkDemoModuleCode(modulePath) {
    // 如果demo代码中，把exports这行给注释掉了，则会有bug，仅靠静态分析如何解决这个问题？
    const moduleCode = fs.readFileSync(path.join(modulePath, 'demo.module.ts')).toString();
    const match = moduleCode.match(/@NgModule\s*\(\s*{[\s\S]*\bexports\s*:\s*\[\s*(\w+)\s*]/);
    if (!match) {
        console.error('The NgModule decorator of each demo.module.ts must include an exports attribute, ' +
            'and its value must include a component class name, modulePath:', modulePath);
        process.exit(1);
    }
}

function checkBranch(seedPath) {
    const seedBranch = readBranch(seedPath);
    const jigsawBranch = readBranch(__dirname);
    const isMaster = (jigsawBranch === 'v9.0' || jigsawBranch === 'master') && seedBranch === 'master';
    const isV5orV1 = seedBranch === jigsawBranch;
    if (!isMaster && !isV5orV1) {
        console.error(`Branch mismatch! Jigsaw is on branch ${jigsawBranch}, but seed is on branch ${seedBranch}`);
        process.exit(1);
    }
}

function readBranch(cwd) {
    console.log(`os.hostname()=${os.hostname()}, os.platform()=${os.platform()}, os.type()=${os.type()}, os.arch()=${os.arch()}`)
    let cmdRes = childProcess.execSync('git status', {cwd}).toString();
    console.log('1111111111111111111', cmdRes);
    let match = cmdRes.match(/^On branch (.*)/);
    let stashed = false;
    if (!match) {
        childProcess.execSync('git stash', {cwd});
        stashed = true;
        cmdRes = childProcess.execSync('git status', {cwd}).toString();
        console.log('222222222222222222222', cmdRes);
        match = cmdRes.match(/^On branch (.*)/);
    }
    const branch = match[1];
    if (stashed) {
        childProcess.execSync('git stash pop', {cwd});
    }
    return branch;
}
