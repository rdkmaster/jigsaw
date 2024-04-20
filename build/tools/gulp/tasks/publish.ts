import {execSync, spawn} from 'child_process';
import {existsSync, statSync, writeFileSync, readFileSync} from 'fs-extra';
import {join} from 'path';
import {task} from 'gulp';
import {green, grey, yellow} from 'chalk';
import * as minimist from 'minimist';
import {runTasks} from '../util/task_helpers';
import {buildConfig} from './build-config';

/** Parse command-line arguments for release task. */
const argv = minimist(process.argv.slice(3));

const npm = process.platform === "win32" ? "npm.cmd" : "npm";

/** Make sure we're logged in. */
task(':publish:whoami', () => {
    try {
        execSync('npm whoami', { stdio: 'inherit' });
    } catch (error) {
        console.error("An error occurred:", error);
        throw '当前环境未登录到npm，无法发布，请先登录后再试';
    }
});

task('publish:all', publishAll);

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
    _npmInstall('normal');
    let error = await runTasks(['publish:jigsaw', 'publish:formly']);
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
        // Step 2: 执行 npm install
        execSync('npm install', { stdio: 'inherit' });
    } catch (error) {
        console.error("An error occurred:", error);
    }
    // Step 3: 恢复文件
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
