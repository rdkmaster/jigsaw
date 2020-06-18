const fs = require('fs');
const path = require('path');

// let hasError = false;
// processAll('pc-components');
// processAll('common/components');
// if (hasError) {
//     process.exit(1);
// } else {
//     console.error(`Everything's fine!`);
// }

checkInputProperty('D:\\Codes\\jigsaw\\src\\jigsaw\\pc-components\\input\\auto-complete-input.ts');

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

    console.log(`Checking ${srcPath} ...`);
    const source = fs.readFileSync(srcPath).toString();
    let index = -1;
    while (true) {
        index = source.indexOf('@Input', index + 1);
        if (index === -1) {
            break;
        }

        const block = getPropertyBlock(source, index);
        const name = findInputPropertyName(block);
        if (!name) {
            error(`Error: can not find the name of the property at index ${index}, unknown error.`);
            continue;
        }
        if (!checkAnnotationPosition(block)) {
            error(`Error: move the annotation of input property "${name}" to the front of the @Input decorator.`);
            continue;
        }

        const hasNoMarkRequired = block.indexOf('@NoMarkForCheckRequired') !== -1;
        const hasRequireMark = block.indexOf('@RequireMarkForCheck') !== -1;
        if (!hasNoMarkRequired && !hasRequireMark) {
            error(`Error: input property "${name}" must have one of the "@NoMarkForCheckRequired" (in annotation) or ` +
                        '"@RequireMarkForCheck" (in decorator), but none of these marks found!',
                'Tips: check this link for more detail https://github.com/rdkmaster/jigsaw/blob/master/docs/mark-for-check-rule.md');
            console.log('------------------------', block, '====', source);
        } else if (hasNoMarkRequired && hasRequireMark) {
            error(`Error: input property "${name}" must have one of the "@NoMarkForCheckRequired" (in annotation) or ` +
                        '"@RequireMarkForCheck" (in decorator), but both of these marks found!',
                'Tips: remove one of the marks to pass this check');
        }
    }
}

/**
 * 约束注释（如果有）必须放在最前面
 */
function checkAnnotationPosition(block) {
    return block.indexOf('/**') === -1 || block.match(/^\s*\/\*\*/);
}

function getPropertyBlock(source, index) {
    const nameMatch = source.substring(index).match(/\s(public\s*)?(get\s*)?(\w+)\s*[(:]/);
    if (!nameMatch) {
        return '';
    }
    let start = index;
    const heading = source.substring(0, index);
    let headingMatch = heading.match(/[\s\S]*(\/\*\*[\s\S]*?\*\/\s*(@RequireMarkForCheck\s*\(\s*\))?\s*)$/);
    if (headingMatch && headingMatch[1]) {
        start -= headingMatch[1].length;
    } else {
        headingMatch = heading.match(/[\s\S]*(@RequireMarkForCheck\s*\(\s*\)\s*)$/);
        if (headingMatch && headingMatch[1]) {
            start -= headingMatch[1].length;
        }
    }
    const end = index + nameMatch.index + nameMatch[0].length;
    return source.substring(start, end);
}

function findInputPropertyName(block) {
    const match = block.match(/\s+(public\s*)?(get\s*)?(\w+)\s*[(:]/);
    return match ? match[3] : null;
}

function error(msg, tips) {
    console.error(msg);
    if (tips) {
        console.error(tips);
    }
    hasError = true;
}
