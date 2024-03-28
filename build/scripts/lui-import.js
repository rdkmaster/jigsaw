const fs = require('fs');
const path = require('path');
const glob = require('glob').sync;

// 1.将代码中的相关依赖替换掉
// 2.换node_modules

const jigsawHome = path.resolve(`${__dirname}/../../`);
const action = process.argv[2];
console.log("replace import and prepare node_modules for lui .... action: ", action);

// 替换import包名
const packages = [
    {oldPkgName: "@ngx-translate/core", newPkgName: "@rdkmaster/ngx-translate-core", version: ""}
];
replaceImport(action);

prepareNodeModules(action);

console.log("replace import and prepare node_modules for lui done!");
process.exit(0);

function replaceImport() {
    if (action === "restore") {
        // todo 执行 git checkout . 还原代码？
        return;
    }

    replaceFiles(path.join(jigsawHome, "src/jigsaw"));
    replaceFiles(path.join(jigsawHome, "src/ngx-formly"));
}

function replaceFiles(folder) {
    glob('**/*.ts', {cwd: folder}).forEach(fileName => {
        console.log("replace file >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", path.join(folder, fileName));
    });
}

// todo node_modules 处理
function prepareNodeModules(action) {
    if (action === "restore") {
        if (!fs.existsSync(path.join(jigsawHome, "node_modules_default"))) {
            console.error("There is no default node_modules named node_modules_default, please confirm action!");
            process.exit(1);
        }

        fs.renameSync(path.resolve(jigsawHome, "node_modules"), path.resolve(jigsawHome, "node_modules_lui"));
        fs.renameSync(path.resolve(jigsawHome, "node_modules_default"), path.resolve(jigsawHome, "node_modules"));
        return;
    }

    if (!fs.existsSync(path.join(jigsawHome, "node_modules_lui"))) {
        console.error("There is no node_modules for building lui package, please prepare it and named 'node_modules_lui'!");
        process.exit(1);
    }

    fs.renameSync(path.resolve(jigsawHome, "node_modules"), path.resolve(jigsawHome, "node_modules_default"));
    fs.renameSync(path.resolve(jigsawHome, "node_modules_lui"), path.resolve(jigsawHome, "node_modules"));
}
