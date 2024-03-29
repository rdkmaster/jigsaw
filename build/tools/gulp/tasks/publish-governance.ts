import {task} from 'gulp';
import * as fs from 'fs';
import * as path from 'path';
import {sync as glob} from "glob";
import {exec} from 'child_process';
import {sequenceTask} from '../util/task_helpers';
import {buildConfig} from './build-config';

task(`publish:governance:jigsaw`, sequenceTask(
    ':publish:whoami',
    `:governance:replace-import`,
    `build:jigsaw:clean`,
    `validate:check-jigsaw-bundles`,
    `:publish:jigsaw`,
    `:governance:replace-import:restore`,
));

task(`publish:governance:formly`, sequenceTask(
    ':publish:whoami',
    `:governance:replace-import`,
    `build:formly:clean`,
    `:build:formly-copy-files`,
    `:publish:formly`,
    `:governance:replace-import:restore`,
));

// 处理代码中的import，改为从@rdkmaster下面引入，用于开源治理
task(`:governance:replace-import`, async () => _replaceImport());

task(`:governance:replace-import:restore`, async () => _restoreImport());

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

async function _replaceImport() {
    console.log("replacing all imports ....");
    _replaceFiles(path.join(jigsawHome, "src/jigsaw"));
    _replaceFiles(path.join(jigsawHome, "src/ngx-formly"));
    _replacePackageJson();
    console.log("replace import all done");
}

async function _restoreImport() {
    console.log("restoring source ....");
    exec(`git checkout .`, error => console.error("restore code error: ", error));
    console.log("restore import all done");
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
    let pkgPath = path.join(jigsawHome, "src/jigsaw/pc-components/package.json");
    let packageInfo = JSON.parse(fs.readFileSync(pkgPath).toString());
    packageInfo.peerDependencies = packageInfo.peerDependenciesGovernance;
    delete packageInfo.peerDependenciesGovernance;
    fs.writeFileSync(pkgPath, JSON.stringify(packageInfo, null, '  '));

    pkgPath = path.join(jigsawHome, "src/ngx-formly/jigsaw/package.json");
    packageInfo = JSON.parse(fs.readFileSync(pkgPath).toString());
    packageInfo.peerDependencies = packageInfo.peerDependenciesGovernance;
    delete packageInfo.peerDependenciesGovernance;
    fs.writeFileSync(pkgPath, JSON.stringify(packageInfo, null, '  '));
}
