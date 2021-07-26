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
            checkImportPath(pathname);
        }
    });
}

function checkImportPath(srcPath) {
    if (!srcPath.match(/.+\.ts$/i)) {
        return;
    }

    const source = fs.readFileSync(srcPath).toString();

    source.replace(/import\s+[\s\S]*?\s+from\s+['"](.*?)['"]/g, (found, importPath) => {
        if (importPath.startsWith('rxjs')) {
            return '';
        }
        if (fs.existsSync(`${__dirname}/../../node_modules/${importPath}`)) {
            return '';
        }
        if (importPath[0] !== '.') {
            // jigsaw目录下所有import都不能从jigsaw目录开头，否则ngx-formly表单控件会编译不过。
            error('invalid import path, should be a relative path, absolute path is forbidden, path:', importPath, ', file:', srcPath);
        }

        const path = `${getFilePath(srcPath)}/${importPath}.ts`;
        let stat;
        try {
            stat = fs.statSync(path);
        } catch(e) {
            console.warn('can not stat file, detail:', e.message);
        }
        if (!stat || stat.isDirectory()) {
            // 检查所有的import路径省略index的代码，避免编译报127错误
            error('invalid import path, should NOT be a dir, path:', importPath, ', file:', srcPath);
        }

        return '';
    });
}

function getFilePath(file) {
    return file.replace(/(.*)[\/\\][^\/\\]*?\.\w+$/, '$1');
}

function error(...msg) {
    console.error.call(null, 'Error:', ...msg);
    hasError = true;
}


