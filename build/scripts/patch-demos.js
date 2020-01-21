
const fs = require('fs');
const seedPath = process.argv.length > 2 ? process.argv[2] : __dirname + '/../../../jigsaw-seed';
const angularJson = fs.readFileSync(seedPath + '/angular.json').toString().trim();
const packageJson = fs.readFileSync(seedPath + '/package.json').toString().trim();
const descCode = readCode('src/app/demo-description/demo-description.ts')
    .replace("'/* angular.json goes here */'", angularJson)
    .replace("'/* package.json goes here */'", packageJson);
writeCode('src/app/demo-description/demo-description.ts', descCode);



function readCode(path) {
    return fs.readFileSync(__dirname + '/../../' + path).toString();
}

function writeCode(path, content) {
    fs.writeFileSync(__dirname + '/../../' + path, content);
}

function findQuoteEnd(str, startIndex = 0) {
    const target = str.charAt(startIndex);
    if ("'\"`".indexOf(target) == -1) {
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
        if (backSlashMatch[1].length % 2 == 0) {
            // 有偶数个反斜杠，他们相互抵消了，就不会转义当前这个边界字符了，所以，这个就是我们需要的
            return index;
        }
    }
    return -1;
}
