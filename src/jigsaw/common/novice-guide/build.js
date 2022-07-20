const {readFileSync, existsSync, mkdirpSync, writeFileSync, moveSync, statSync} = require("fs-extra");
const {execSync} = require("child_process");
const {readdirSync, unlinkSync, rmdirSync} = require("fs");
const glob = require('glob').sync;

const minimize = process.argv[require.main === module ? 2 : 3] !== 'debug';
module.exports = {build};

function build() {
    console.log(`building novice guide ..., minimize=${minimize}`);

    const home = `${__dirname}/../../../..`;
    glob(`${home}/src/jigsaw/common/novice-guide/**/*.ts`)
        .map(file => readFileSync(file).toString())
        .forEach(src => src.replace(/import\s*(\*.+?|[\s\S]*?)\s*from\s*['"](.*?)['"]/g, (_1, _2, path) => {
            console.log('checking import from path:', path);
            if (!path.startsWith('./')) {
                throw `Error: it is NOT allowed to import from path "${path}"!!`;
            }
            return '';
        }));
    const dist = `${home}/dist/@rdkmaster/novice-guide`;
    if (existsSync(dist)) {
        removeDir(dist);
    } else {
        mkdirpSync(dist);
    }

    console.log('compiling novice guide with tsc...');
    try {
        execSync(`${home}/node_modules/.bin/tsc --module commonjs --target es6 --declaration ` +
            `--outDir ${dist}/tmp ${home}/src/jigsaw/common/novice-guide/novice-guide.ts`);
    } catch (e) {
        console.error('tsc failed, detail:', e.message);
        console.error(e.stderr.toString());
        console.error(e.stdout.toString());
        throw 'Error: failed to build novice guide';
    }

    const webpack = require('webpack');
    webpack({
        entry: {'novice-guide': `${dist}/tmp/novice-guide.js`},
        optimization: {minimize},
        resolve: {extensions: ['.js']},
        output: {path: dist, filename: '[name].js'},
    }, (err, stats) => {
        if (err || stats.hasErrors()) {
            throw 'failed to rollup with webpack' + err.toString();
        }
        readdirSync(`${dist}/tmp`).filter(f => /.+\.d\.ts$/.test(f)).forEach(file => {
            console.log('copying declaration:', file);
            writeFileSync(`${dist}/${file}`, readFileSync(`${dist}/tmp/${file}`));
        });
        removeDir(`${dist}/tmp`);

        if (!existsSync(`${home}/dist/@rdkmaster/jigsaw`)) {
            mkdirpSync(`${home}/dist/@rdkmaster/jigsaw`);
        }
        if (existsSync(`${home}/dist/@rdkmaster/jigsaw/novice-guide`)) {
            removeDir(`${home}/dist/@rdkmaster/jigsaw/novice-guide`);
        }
        // 把noviceGuide对象暴露到window.jigsaw上
        let src = readFileSync(`${dist}/novice-guide.js`).toString();
        if (/^!/.test(src)) {
            src = src.replace(/^!/, '(')
                .replace(/,([^,]+?})(\(\[function\()/, ';return $1)$2');
        }
        writeFileSync(`${dist}/novice-guide.js`, 'window.jigsaw=window.jigsaw||{};window.jigsaw=' + src);
        moveSync(dist, `${home}/dist/@rdkmaster/jigsaw/novice-guide`);
    });
}

function removeDir(dir) {
    readdirSync(dir).forEach(file => {
        const stat = statSync(`${dir}/${file}`);
        if (stat.isDirectory()) {
            removeDir(`${dir}/${file}`);
        } else {
            unlinkSync(`${dir}/${file}`);
        }
    });
    rmdirSync(dir);
}

if (require.main === module) {
    build();
}
