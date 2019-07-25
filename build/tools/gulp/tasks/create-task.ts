import {dest, src, task} from 'gulp';
import {join} from 'path';
import {Bundler} from 'scss-bundle';
import {writeFileSync} from 'fs-extra';
import {sequenceTask} from "../util/task_helpers";
import {checkReleasePackage} from "./validate-release";
import {green, red} from 'chalk';
import {publishPackage} from './publish';

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
    const prebuiltThemeSettingsGlob = join(jigsawCommonPath, 'core/theming/prebuilt/settings/*.scss');
    const themingApiGlob = join(jigsawCommonPath, 'core/theming/theming-api.scss');

    task(`:build:${packageName}-package`, function () {
        return gulpRun('ng build ' + projectName + ' --prod', {}).exec();
    });

    task(`:build:${packageName}-styles`, [
        `:build:${packageName}-all-theme-file`,
        `:build:${packageName}-bundle-theming-scss`,
        `:build:${packageName}-copy-prebuilt-theme-settings`,
        `:build:${packageName}-copy-theming-api`
    ]);

    task(`:build:${packageName}-all-theme-file`,function () {
        return src([allThemingStyleGlob])
            .pipe(gulpSass().on('error', gulpSass.logError))
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
        src('./LICENSE')
            .pipe(dest(join(releasePath)));
        src('./README.md')
            .pipe(dest(join(releasePath)));
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

    task(`build:${packageName}`, sequenceTask(
        `:build:${packageName}-package`,
        `:build:${packageName}-styles`,
        `:build:${packageName}-copy-files`,
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
        `:publish:${packageName}`,
        ':publish:logout'
    ));

}


