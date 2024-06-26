const fs = require('fs-extra');
const {execSync} = require("child_process");

const app = process.argv[2];
if (app !== 'jigsaw-app-external' && app !== 'jigsaw-app-internal') {
    printUsage(`无效的app "${app}"，必须是 jigsaw-app-external/jigsaw-app-internal 之一`);
    process.exit(1);
}
const buildMode = process.argv[3];
if (buildMode !== 'prod' && buildMode !== 'dev') {
    printUsage(`无效的输出类型"${buildMode}"，必须是 prod/dev 之一`);
    process.exit(1);
}

console.log(`building app ${app} in ${buildMode} mode ...`);
process.chdir(__dirname);

exec(`node scripts/extract-theme-variables.js`);
exec(`node scripts/create-component-wings-theme.js`);
if (app === 'jigsaw-app-external') {
    exec(`node scripts/generate-external-demo-info.js`);
    exec(`node scripts/generate-external-navigation-info.js`);
}
const docOutput = `${__dirname}/../src/app/for-external/assets/docs`;
if (buildMode === 'prod') {
    fs.removeSync(docOutput);
}
if (app === 'jigsaw-app-external' && !fs.existsSync(docOutput)) {
    exec(`sh scripts/doc-generator/generate.sh ${docOutput}`);
}

if (buildMode === 'dev') {
    const port = process.argv[4] || 4200;
    const bh = process.argv[5] ? '--base-href=' + process.argv[5]: '';
    exec(`node --max_old_space_size=4096 ../node_modules/@angular/cli/bin/ng serve ${app} --poll 500 ` +
        `--disable-host-check --host 0.0.0.0 --port ${port} --proxy-config proxy-config.json ${bh}`);
} else {
    const appOutput = process.argv[4] || 'dist';
    const bh = process.argv[5] || '/latest/';
    const code = exec(`node --max_old_space_size=4096 ../node_modules/@angular/cli/bin/ng build ${app} ` +
        `--aot --prod --base-href="${bh}" --output-path=${appOutput}`);
    process.exit(code);
}

function exec(cmd) {
    try {
        execSync(cmd, {stdio: 'inherit'});
        return 0;
    } catch (e) {
        return e.status;
    }
}

function printUsage(extra) {
    console.error('Error:', extra);
    console.error('用法');
    console.error(' - 生成环境编译：node build.js jigsaw-app-external prod  [output=dist] [baseHref=/latest/]');
    console.error(' - 开发环境编译：node build.js jigsaw-app-external watch [port=4200]   [baseHref]');
}
