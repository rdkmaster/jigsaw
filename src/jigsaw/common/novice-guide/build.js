const {readFileSync, existsSync, mkdirpSync, writeFileSync} = require("fs-extra");
const {execSync} = require("child_process");
const {readdirSync, unlinkSync, rmdirSync} = require("fs");

module.exports = {build};

function build() {
    console.log('building novice guide...');

    const home = `${__dirname}/../../../..`;
    readFileSync(`${home}/src/jigsaw/common/novice-guide/novice-guide.ts`).toString()
        .replace(/import\s*(\*|[\s\S]*?)\s*from\s*['"](.*?)['"]/g, (_1, _2, path) => {
            console.log('checking import from path:', path);
            if (!path.startsWith('./')) {
                throw 'Error: it is NOT allowed to import anything outside of novice-guide!!';
            }
            return '';
        });
    const dist = `${home}/dist/@rdkmaster/jigsaw/novice-guide`;
    if (!existsSync(dist)) {
        mkdirpSync(dist);
    }

    console.log('compiling novice guide with tsc...');
    try {
        execSync(`${home}/node_modules/.bin/tsc --module commonjs --target es6 --declaration ` +
            `--outDir ${dist}/tmp ${home}/src/jigsaw/common/novice-guide/novice-guide.ts`);
    } catch (e) {
        console.error(e.message);
        console.error(e.stderr.toString());
        console.error(e.stdout.toString());
        throw 'Error: failed to build novice guide';
    }

    const webpack = require('webpack');
    webpack({
        entry: { 'novice-guide': `${dist}/tmp/novice-guide.js` },
        optimization: { minimize: true },
        resolve: { extensions: ['.js'] },
        output: { path: `${dist}`, filename: '[name].js' },
    }, (err, stats) => {
        if (err || stats.hasErrors()) {
            throw 'failed to rollup with webpack' + err.toString();
        }
        readdirSync(`${dist}/tmp`).forEach(file => {
            if (/.+\.d\.ts$/.test(file)) {
                writeFileSync(`${dist}/${file}`, readFileSync(`${dist}/tmp/${file}`));
            }
            unlinkSync(`${dist}/tmp/${file}`);
        });
        rmdirSync(`${dist}/tmp`);
    });
}

if (require.main === module) {
    build();
}
