import {dest, src, task} from 'gulp';
import {join} from 'path';
import {Bundler} from 'scss-bundle';
import {green, red} from 'chalk';
import {writeFileSync} from 'fs-extra';
import {sync as glob} from 'glob';
import {sequenceTask} from "../util/task_helpers";
import {checkReleasePackage} from "./validate-release";
import {publishPackage} from './publish';
import {copyFiles, deleteFolderRecursive} from "../util/copy-files";
import {bundleScopedScss, createScopedTheme, getScopedThemesConfig} from "../util/create-scoped-theme";

const {buildCandidatePackage} = require("../../build-candidate-package.js");
const gulpSass = require('gulp-sass');
const gulpRun = require('gulp-run');
const gulpCleanCss = require('gulp-clean-css');

export function createTask(packageName: string) {
    const projectName = packageName;
    const distDir = './dist';
    const releasePath = join(distDir, `@rdkmaster/${packageName}`);

    const jigsawPath = `./src/jigsaw/${packageName == 'jigsaw' ? 'pc-components' : 'mobile-components'}`;
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
        `:build:${packageName}-all-scoped-theme`,
        `:build:${packageName}-bundle-theming-scss`,
        `:build:${packageName}-copy-prebuilt-theme-settings`,
        `:build:${packageName}-copy-theming-api`,
        `:build:${packageName}-all-component-styles`
    ]);

    task(`:build:${packageName}-all-theme-file`, function () {
        return src([allThemingStyleGlob])
            .pipe(gulpSass().on('error', (err: any) => {
                console.error('Failed to build theme, detail:\n', err.stack);
                throw err;
            }))
            .pipe(gulpCleanCss())
            .pipe(dest(join(releasePath, 'prebuilt-themes')));
    });

    task(`:build:${packageName}-all-scoped-theme`, sequenceTask(
        `:${packageName}-copy-and-bundle-scss`,
        `:${packageName}-create-scoped-theme`,
        `:${packageName}-remove-tmp-files`
    ));

    task(`:${packageName}-copy-and-bundle-scss`, async function () {
        const scopedThemeHome = join(releasePath, 'prebuilt-themes', 'scoped-theme');
        const scopedThemeScssHome = join(scopedThemeHome, 'scss');
        const scopedThemeCommonHome = join(scopedThemeScssHome, 'common');
        const scopedThemeComponentHome = join(scopedThemeScssHome, packageName == 'jigsaw' ? 'pc-components' : 'mobile-components');
        copyFiles(jigsawCommonPath, '**/*scss', scopedThemeCommonHome);
        copyFiles(jigsawPath, '**/*scss', scopedThemeComponentHome);
        const allScopedThemingPrebuiltHome = join(scopedThemeComponentHome, 'theming/prebuilt/');
        const scopedThemesConfig = getScopedThemesConfig();
        for (const themeInfo of scopedThemesConfig) {
            await bundleScopedScss(themeInfo, allScopedThemingPrebuiltHome, scopedThemeScssHome);
        }
    });

    task(`:${packageName}-create-scoped-theme`, async function () {
        const scopedThemeHome = join(releasePath, 'prebuilt-themes', 'scoped-theme');
        const scopedThemeScssHome = join(scopedThemeHome, 'scss');
        const files = glob('*.scss', {cwd: scopedThemeScssHome});
        for (const filePath of files) {
            await new Promise(resolve => {
                src(join(scopedThemeScssHome, filePath))
                    .pipe(gulpSass().on('error', (err: any) => {
                        console.error('Failed to build theme, detail:\n', err.stack);
                        throw err;
                    }))
                    //.pipe(gulpCleanCss())
                    .pipe(dest(scopedThemeHome))
                    .on('end', function () {
                        const rawCssFile = filePath.replace(/\.scss$/, '.css');
                        createScopedTheme(scopedThemeHome, rawCssFile);
                        resolve();
                    });
            })
        }
    })

    task(`:${packageName}-remove-tmp-files`, function () {
        const scopedThemeHome = join(releasePath, 'prebuilt-themes', 'scoped-theme');
        const scopedThemeScssHome = join(scopedThemeHome, 'scss');
        deleteFolderRecursive(scopedThemeScssHome);
    })

    task(`:build:${packageName}-bundle-theming-scss`, () => {
        return new Bundler().Bundle(themingEntryPointPath, [allScssGlob]).then(result => {
            writeFileSync(themingBundlePath, result.bundledContent);
        });
    });

    task(`:build:${packageName}-copy-prebuilt-theme-settings`, () => {
        src(prebuiltThemeSettingsGlob)
            .pipe(dest(join(releasePath, 'prebuilt-themes', 'settings')));
    });

    task(`:build:${packageName}-copy-theming-api`, () => {
        src(themingApiGlob)
            .pipe(dest(join(releasePath)));
    });

    task(`:build:${packageName}-copy-files`, () => {
        copyFiles('./', 'LICENSE', releasePath);
        copyFiles('./', 'README.md', releasePath);
    });

    task(`:build:${packageName}-all-component-styles`, () => {
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

    task('build:novice-guide', buildCandidatePackage.bind({
        packageName: "novice-guide",
        entryPath: "src/jigsaw/common/novice-guide/exports.ts",
        rollupTo: "window.jigsaw=window.jigsaw||{};window.jigsaw",
    }));
    task('build:unified-paging', buildCandidatePackage.bind({
        packageName: "unified-paging",
        entryPath: "src/jigsaw/common/core/data/unified-paging/exports.ts",
        rollupTo: "",
    }));

    task(`build:${packageName}`, sequenceTask(
        ':extract-theme-variables',
        ':create-component-wings-theme',
        `:build:${packageName}-package`,
        `:build:${packageName}-styles`,
        `:build:${packageName}-copy-files`,
        'build:novice-guide',
        'build:unified-paging',
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


