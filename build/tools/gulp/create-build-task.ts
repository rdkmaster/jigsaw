import {dest, src, task} from 'gulp';
import {join} from 'path';
import {Bundler} from 'scss-bundle';
import {writeFileSync} from 'fs-extra';

const sass = require('gulp-sass');
const run = require('gulp-run');

export function createBuildTask(packageName: string) {
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

    task(`build:${packageName}-package`,['clean'], function () {
        return run('ng build ' + projectName + ' --prod', {}).exec();
    });

    task(`build:${packageName}-styles`, [
        `build:${packageName}-all-theme-file`,
        `build:${packageName}-bundle-theming-scss`,
        `build:${packageName}-copy-prebuilt-theme-settings`,
        `build:${packageName}-copy-theming-api`
    ]);

    task(`build:${packageName}-all-theme-file`, [`build:${packageName}-package`], function () {
        return src([allThemingStyleGlob])
            .pipe(sass().on('error', sass.logError))
            .pipe(dest(join(releasePath, 'prebuilt-themes')));
    });

    task(`build:${packageName}-bundle-theming-scss`,[`build:${packageName}-package`], () => {
        return new Bundler().Bundle(themingEntryPointPath, [allScssGlob]).then(result => {
            writeFileSync(themingBundlePath, result.bundledContent);
        });
    });

    task(`build:${packageName}-copy-prebuilt-theme-settings`,[`build:${packageName}-package`], () => {
        src(prebuiltThemeSettingsGlob)
            .pipe(dest(join(releasePath, 'prebuilt-themes', 'settings')));
    });

    task(`build:${packageName}-copy-theming-api`,[`build:${packageName}-package`], () => {
        src(themingApiGlob)
            .pipe(dest(join(releasePath)));
    });

    task(`build:${packageName}-library`, [
        `build:${packageName}-package`,
        `build:${packageName}-styles`
    ]);
}


