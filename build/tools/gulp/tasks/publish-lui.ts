import {task} from 'gulp';
import * as fs from 'fs';
import * as path from 'path';
import {sync as glob} from "glob";
import {exec} from 'child_process';
import {sequenceTask} from '../util/task_helpers';
import {buildConfig} from './build-config';

task(`publish:lui:jigsaw`, sequenceTask(
    ':publish:whoami',
    `:lui:replace-import`,
    `build:jigsaw:clean`,
    `validate:check-jigsaw-bundles`,
    `:publish:jigsaw`,
    `:lui:replace-import:restore`,
));

task(`publish:lui:formly`, sequenceTask(
    ':publish:whoami',
    `:lui:replace-import`,
    `build:formly:clean`,
    `:build:formly-copy-files`,
    `:publish:formly`,
    `:lui:replace-import:restore`,
));

// 处理代码中的import，改为从@rdkmaster下面引入，用于LUI的专版
task(`:lui:replace-import`, async () => _replaceImport());

task(`:lui:replace-import:restore`, async () => _replaceImport("restore"));

// 需要替换的import包名
// 这里只需要修改import包名，ztree和peity是在app的angular.json中引用的，无需处理
const packages = [
    {oldPkgName: "@ngx-translate/core", newPkgName: "@rdkmaster/ngx-translate-core"},
    {oldPkgName: "core-js", newPkgName: "@rdkmaster/core-js"},
    {oldPkgName: "marked", newPkgName: "@rdkmaster/marked"},
    {oldPkgName: "ngx-color-picker", newPkgName: "@rdkmaster/ngx-color-picker"},
    {oldPkgName: "ngx-perfect-scrollbar", newPkgName: "@rdkmaster/ngx-perfect-scrollbar"},
    {oldPkgName: "web-animations-js", newPkgName: "@rdkmaster/web-animations-js"},
    {oldPkgName: "zone.js", newPkgName: "@rdkmaster/zone.js"}
];
const jigsawHome = buildConfig.projectDir;

async function _replaceImport(action?: "restore") {
    _prepareNodeModules(action);

    if (action == "restore") {
        // todo 恢复代码？可能不是 git 仓库？
        exec(`git checkout .`, error => console.error("restore code error: ", error));
    } else {
        _replaceFiles(path.join(jigsawHome, "src/jigsaw"));
        _replaceFiles(path.join(jigsawHome, "src/ngx-formly"));
        _replacePackageJson();
    }
    console.log("replace import all done");
}

function _replaceFiles(folder: string) {
    glob('**/*.ts', {cwd: folder}).forEach(fileName => {
        const filePath = path.join(folder, fileName);
        let code = fs.readFileSync(filePath).toString();
        packages.forEach(pkg => {
            const oldPkgRegex = new RegExp(`(\\bimport\\s*\\{[^{}]*}\\s*from\\s*['"]${pkg.oldPkgName}['"];?)`, 'g');
            if (!oldPkgRegex.test(code)) {
                return;
            }
            code = code.replace(oldPkgRegex, (temp, importExpr) => importExpr.replace(pkg.oldPkgName, pkg.newPkgName));
        })
        fs.writeFileSync(filePath, code);
    });
}

function _replacePackageJson() {
    const pkgPath = path.join(jigsawHome, "src/jigsaw/pc-components/package.json");
    const packageInfo = JSON.parse(fs.readFileSync(pkgPath).toString());
    packageInfo.peerDependencies = packageInfo.peerDependenciesLui;
    delete packageInfo.peerDependenciesLui;
    fs.writeFileSync(pkgPath, JSON.stringify(packageInfo, null, '    '));
}

// todo node_modules 处理
function _prepareNodeModules(action: "restore") {
    if (action == "restore") {
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
