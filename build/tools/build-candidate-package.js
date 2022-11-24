const {readFileSync, existsSync, mkdirpSync, writeFileSync, statSync} = require("fs-extra");
const {execSync} = require("child_process");
const {readdirSync, unlinkSync, rmdirSync} = require("fs");
const glob = require('glob').sync;

module.exports = {buildCandidatePackage};

function buildCandidatePackage() {
    const packageName = this["packageName"];
    const entryPath = this["entryPath"];
    const rollupTo = this["rollupTo"] ? this["rollupTo"] + '=' : '';
    const strParam = `\n   packageName = ${packageName}\n     entryPath = ${entryPath}\n      rollupTo = ${this["rollupTo"]}`;
    if (!packageName || !entryPath) {
        throw `invalid parameters:${strParam}`;
    }
    console.log(`building ${packageName} with parameter:${strParam}`);

    const home = `${__dirname}/../..`;
    glob(`${home}/${entryPath.replace(/\/exports\.ts$/, '')}/**/*.ts`)
        .map(file => readFileSync(file).toString())
        .forEach(src => src.replace(/import\s*(\*.+?|[\s\S]*?)\s*from\s*['"](.*?)['"]/g, (_1, _2, from) => {
            console.log('checking import from path:', from);
            if (!from.startsWith('./')) {
                throw `Error: it is NOT allowed to import from path "${from}"!! ONLY path starts with "./" is allowed!`;
            }
            return '';
        }));
    const dist = `${home}/dist/@rdkmaster/jigsaw/${packageName}`;
    if (existsSync(dist)) {
        removeDir(dist);
    }
    mkdirpSync(dist);

    console.log(`compiling ${packageName} with tsc...`);
    const outDir = rollupTo ? `${dist}/tmp` : dist;
    try {
        execSync(`${home}/node_modules/.bin/tsc --module commonjs --target es6 --declaration --outDir ${outDir} ${home}/${entryPath}`);
    } catch (e) {
        console.error('tsc failed, detail:', e.message);
        console.error(e.stderr.toString());
        console.error(e.stdout.toString());
        throw `Error: tsc failed to build ${packageName}`;
    }

    if (!rollupTo) {
        return;
    }

    const webpack = require('webpack');
    return new Promise(resolve => {
        webpack({
            entry: {[packageName]: `${dist}/tmp/exports.js`},
            optimization: {minimize: true},
            resolve: {extensions: ['.js']},
            output: {path: dist, filename: 'index.js'},
        }, (err, stats) => {
            if (err || stats.hasErrors()) {
                const msg = err ? err.toString() : stats.compilation.errors.join('\n');
                throw 'failed to rollup with webpack' + msg;
            }
            readdirSync(`${dist}/tmp`).filter(f => /.+\.d\.ts$/.test(f)).forEach(file => {
                console.log('copying declaration:', file);
                writeFileSync(`${dist}/${file}`, readFileSync(`${dist}/tmp/${file}`));
            });
            removeDir(`${dist}/tmp`);
            const indexJs = `${dist}/index.js`;
            const src = readFileSync(indexJs).toString()
                .replace(/^!/, '(')
                .replace(/,([^,]+?})(\(\[function\()/, ';return $1)$2');
            writeFileSync(indexJs, rollupTo + src);
            resolve();
        });
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
