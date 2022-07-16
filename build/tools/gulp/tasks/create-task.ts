import {dest, src, task} from 'gulp';
import {join} from 'path';
import {Bundler} from 'scss-bundle';
import {writeFileSync, readFileSync, existsSync} from 'fs';
import {sequenceTask} from "../util/task_helpers";
import {checkReleasePackage} from "./validate-release";
import {green, red} from 'chalk';
import {publishPackage} from './publish';
import {copyFiles} from "../util/copy-files";
import {execSync} from "child_process";

const gulpSass = require('gulp-sass');
const gulpRun = require('gulp-run');
const gulpCleanCss = require('gulp-clean-css');

export function createTask(packageName: string) {
    const projectName = packageName;
    const distDir = './dist';
    const releasePath = join(distDir, `@rdkmaster/${packageName}`);

    const jigsawPath = `./src/jigsaw/${packageName== 'jigsaw' ? 'pc-components' : 'mobile-components'}`;
    const jigsawCommonPath = './src/jigsaw/common';
    const themingEntryPointPath = join(jigsawPath, 'theming/all-theme.scss');
    const themingBundlePath = join(releasePath, 'theming.scss');

    const allScssGlob = join(jigsawPath, '**/*.scss');
    const allThemingStyleGlob = join(jigsawPath, 'theming/prebuilt/*.scss');
    const allComponentThemingStyleGlob = join(jigsawCommonPath, 'core/theming/prebuilt/wings-theme/*.scss');
    const prebuiltThemeSettingsGlob = join(jigsawCommonPath, 'core/theming/prebuilt/settings/*.scss');
    const themingApiGlob = join(jigsawCommonPath, 'core/theming/theming-api.scss');

    task(`:build:${packageName}-package`, function () {
        return gulpRun('ng build ' + projectName + ' --prod', {}).exec();
    });

    task(`:build:${packageName}-styles`, [
        `:build:${packageName}-all-theme-file`,
        `:build:${packageName}-bundle-theming-scss`,
        `:build:${packageName}-copy-prebuilt-theme-settings`,
        `:build:${packageName}-copy-theming-api`,
        `:build:${packageName}-all-component-styles`
    ]);

    task(`:build:${packageName}-all-theme-file`,function () {
        return src([allThemingStyleGlob])
            .pipe(gulpSass().on('error', (err: any) => {
                console.error('Failed to build theme, detail:\n', err.stack);
                throw err;
            }))
            .pipe(gulpCleanCss())
            .pipe(dest(join(releasePath, 'prebuilt-themes')));
    });

    task(`:build:${packageName}-bundle-theming-scss`,() => {
        return new Bundler().Bundle(themingEntryPointPath, [allScssGlob]).then(result => {
            writeFileSync(themingBundlePath, result.bundledContent);
        });
    });

    task(`:build:${packageName}-copy-prebuilt-theme-settings`,() => {
        src(prebuiltThemeSettingsGlob)
            .pipe(dest(join(releasePath, 'prebuilt-themes', 'settings')));
    });

    task(`:build:${packageName}-copy-theming-api`,() => {
        src(themingApiGlob)
            .pipe(dest(join(releasePath)));
    });

    task(`:build:${packageName}-copy-files`,() => {
        copyFiles('./', 'LICENSE', releasePath);
        copyFiles('./', 'README.md', releasePath);
    });

    task(`:build:${packageName}-all-component-styles`,() => {
        return src([allComponentThemingStyleGlob])
        .pipe(gulpSass().on('error', (err: any) => {
            console.error('Failed to build theme, detail:\n', err.stack);
            throw err;
        }))
        .pipe(gulpCleanCss())
        .pipe(dest(join(releasePath, 'prebuilt-themes', 'wings-theme')));
    });

    task(`validate:check-${packageName}-bundles`, () => {
        const releaseFailures = checkReleasePackage(packageName);

        releaseFailures.forEach(failure => console.error(red(`Failure (${packageName}): ${failure}`)));

        if (releaseFailures.length > 0) {
            // Throw an error to notify Gulp about the failures that have been detected.
            throw 'Release output is not valid and not ready for being released.';
        } else {
            console.log(green('Release output has been checked and everything looks fine.'));
        }
    });

    task('build:novice-guide', function buildNoviceGuide() {
        console.log('building novice guide...');
        const home = `${__dirname}/../../../..`;
        const src = readFileSync(`${home}/src/jigsaw/common/novice-guide/novice-guide.ts`).toString();
        if (/import\s*{/.test(src)) {
            throw 'Error: it is NOT allowed to import anything inside of novice-guide.ts!!';
        }
        const dist = `${home}/dist/@rdkmaster/jigsaw`;
        if (!existsSync(dist)) {
            execSync(`mkdir -p ${dist}`);
        }

        console.log('compiling novice guide with tsc...');
        try {
            execSync(`sh ${home}/node_modules/.bin/tsc --module commonjs --target es6 ` +
                `--outDir ${dist} ${home}/src/jigsaw/common/novice-guide/novice-guide.ts`);
        } catch(e) {
            console.error(e.message);
            console.error(e.stderr);
            console.error(e.stdout);
            throw 'Error: failed to build novice guide';
        }
        let output = readFileSync(`${dist}/novice-guide.js`).toString()
            .replace(/("use strict";\n)/, '$1window.jigsaw = window.jigsaw || {};(exports => {');
        output += "})(window.jigsaw);";
        writeFileSync(`${dist}/novice-guide.js`, output);

        execSync(`sh ${home}/node_modules/.bin/terser ${dist}/novice-guide.js -c -m -o ${dist}/novice-guide.min.js`);
    });

    task(`build:${packageName}`, sequenceTask(
        ':extract-theme-variables',
        ':create-component-wings-theme',
        `:build:${packageName}-package`,
        `:build:${packageName}-styles`,
        `:build:${packageName}-copy-files`,
        'build:novice-guide',
    ));

    task(`build:${packageName}:clean`, sequenceTask(
        'clean',
        `build:${packageName}`
    ));

    task(`:publish:${packageName}`, async () => publishPackage(packageName));

    task(`publish:${packageName}`, sequenceTask(
        ':publish:whoami',
        `build:${packageName}:clean`,
        `validate:check-${packageName}-bundles`,
        `:publish:${packageName}`
    ));

    task(':extract-theme-variables', () => {
        return gulpRun(`node build/scripts/extract-theme-variables.js`, {}).exec();
    });

    task(':create-component-wings-theme', () => {
        return gulpRun(`node build/scripts/create-component-wings-theme.js`, {}).exec();
    });
}


