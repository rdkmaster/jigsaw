import {exec, execSync, spawn} from 'child_process';
import {existsSync, statSync, writeFileSync, readFileSync} from 'fs-extra';
import * as path from 'path';
import {join} from 'path';
import {task} from 'gulp';
import {green, grey, yellow} from 'chalk';
import * as minimist from 'minimist';
import {sync as glob} from "glob";
import {runTasks, sequenceTask} from '../util/task_helpers';
import {buildConfig} from './build-config';

/** Parse command-line arguments for release task. */
const argv = minimist(process.argv.slice(3));

const npm = process.platform === "win32" ? "npm.cmd" : "npm";

task('publish:all', publishAll);

task(':publish:whoami', () => {
    try {
        /** Make sure we're logged in. */
        execSync('npm whoami', { stdio: 'inherit' });
    } catch (error) {
        console.error("An error occurred:", error);
        throw '当前环境未登录到npm，无法发布，请先登录后再试';
    }
});

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

export async function publishPackage(packageName: string) {
    const label = argv['tag'];
    const currentDir = process.cwd();

    console.log('');
    if (!label) {
        console.log(yellow('You can use a label with --tag=labelName.'));
        console.log(yellow('Publishing using the latest tag.'));
    } else {
        console.log(yellow(`Publishing using the ${label} tag.`));
    }
    console.log('');

    await _execNpmPublish(label, `@rdkmaster/${packageName}`);

    process.chdir(currentDir);
}

async function publishAll() {
    _checkEnv();
    let error = await runTasks([':publish:whoami']);
    if (error) {
        process.exit(1);
    }
    _npmInstall('normal');
    error = await runTasks(['publish:jigsaw', 'publish:formly']);
    if (error) {
        process.exit(1);
    }
    argv.nextVersion = argv.nextVersion + '-g1';
    _npmInstall('governance');
    error = await runTasks(['publish:governance:jigsaw', 'publish:governance:formly']);
    if (error) {
        process.exit(1);
    }
}

function _execNpmPublish(label: string, packageName: string): Promise<{}> {
    _checkEnv();
    const packageDir = join(buildConfig.outputDir, packageName);
    if (!statSync(packageDir).isDirectory()) {
        return;
    }

    const packageJsonPath = join(packageDir, 'package.json');
    if (!existsSync(packageJsonPath)) {
        throw new Error(`"${packageDir}" does not have a package.json.`);
    }
    const packageJson = JSON.parse(readFileSync(packageJsonPath).toString());
    packageJson.version = argv.nextVersion;
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    if (!existsSync(join(packageDir, 'LICENSE'))) {
        throw new Error(`"${packageDir}" does not have a LICENSE file`);
    }

    process.chdir(packageDir);
    console.log(green(`Publishing ${packageName}...`));

    const command = npm;

    const args = ['publish', '--access', 'public', '--loglevel=warn'];
    if (label) {
        args.push('--tag', label);
    }

    return new Promise((resolve, reject) => {
        console.log(grey(`Executing: ${command} ${args.join(' ')}`));
        if (argv['dry']) {
            resolve();
            return;
        }

        const childProcess = spawn(command, args);
        childProcess.stdout.on('data', (data: Buffer) => {
            console.log(`  stdout: ${data.toString().split(/[\n\r]/g).join('\n          ')}`);
        });
        childProcess.stderr.on('data', (data: Buffer) => {
            console.error(`  stderr: ${data.toString().split(/[\n\r]/g).join('\n          ')}`);
        });

        childProcess.on('close', (code: number) => {
            if (code == 0) {
                resolve();
            } else {
                reject(new Error(`Could not publish ${packageName}, status: ${code}.`));
            }
        });
    });
}

function _npmInstall(target: 'normal' | 'governance') {
    const currentDir = process.cwd();
    process.chdir(`${__dirname}/../../../../`);

    execSync('git checkout package.json package-lock.json', { stdio: 'inherit' });
    if (target == 'governance') {
        // 使用governance版的依赖配置
        const packageJson = JSON.parse(readFileSync('package.json').toString());
        packageJson.dependencies = packageJson.dependenciesGovernance;
        writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    }
    try {
        execSync('npm install', { stdio: 'inherit' });
    } catch (error) {
        console.error("An error occurred:", error);
    }
    // 恢复npm install过程所修改的文件
    execSync('git checkout package.json package-lock.json', { stdio: 'inherit' });
    process.chdir(currentDir);
}

function _checkEnv() {
    if (!process.version.startsWith('v10.')) {
        throw new Error(`当前仅支持node10来构建和发布，请切换到node10。`);
    }
    const nextVersion = argv.nextVersion;
    console.log('Next Version from command line:', nextVersion);
    if (!/^(\d+)\.(\d+)\.(\d+)(-\w+\d+)?/.test(nextVersion)) {
        throw new Error(`参数nextVersion("${nextVersion}")无效，用法：gulp publish:jigsaw --nextVersion 1.0.0`);
    }
}

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
    exec(`git checkout src`, error => {
        if (error) {
            console.error("restoring source result error, detail:", error);
        }
    });
    console.log("restore import all done");
}

function _replaceFiles(folder: string) {
    glob('**/*.ts', {cwd: folder}).forEach(fileName => {
        const filePath = path.join(folder, fileName);
        let code = readFileSync(filePath).toString();
        packages.forEach(pkg => {
            const oldPkgRegex = new RegExp(`(\\bimport\\s*\\{[^{}]*}\\s*from\\s*['"]${pkg.oldPkgName}['"];?)`, 'g');
            if (!oldPkgRegex.test(code)) {
                return;
            }
            code = code.replace(oldPkgRegex, (temp, importExpr) => importExpr.replace(pkg.oldPkgName, pkg.newPkgName));
        })
        writeFileSync(filePath, code);
    });
}

function _replacePackageJson() {
    let pkgPath = path.join(jigsawHome, "src/jigsaw/pc-components/package.json");
    let packageInfo = JSON.parse(readFileSync(pkgPath).toString());
    packageInfo.peerDependencies = packageInfo.peerDependenciesGovernance;
    delete packageInfo.peerDependenciesGovernance;
    writeFileSync(pkgPath, JSON.stringify(packageInfo, null, '  '));

    pkgPath = path.join(jigsawHome, "src/ngx-formly/jigsaw/package.json");
    packageInfo = JSON.parse(readFileSync(pkgPath).toString());
    packageInfo.peerDependencies = packageInfo.peerDependenciesGovernance;
    delete packageInfo.peerDependenciesGovernance;
    writeFileSync(pkgPath, JSON.stringify(packageInfo, null, '  '));
}
