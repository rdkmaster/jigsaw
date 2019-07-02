import {dest, src, task} from 'gulp';
import {join} from 'path';
import {Bundler} from 'scss-bundle';
import {writeFileSync} from 'fs-extra';

const sass = require('gulp-sass');
const run = require('gulp-run');

const projectName = 'jigsaw';
const distDir = './dist';
const releasePath = join(distDir, '@rdkmaster/jigsaw');

const jigsawPath = './src/jigsaw/pc-components';
const jigsawCommonPath = './src/jigsaw/common';
const themingEntryPointPath = join(jigsawPath, 'theming/all-theme.scss');
const themingBundlePath = join(releasePath, 'theming.scss');

const allScssGlob = join(jigsawPath, '**/*.scss');
const allThemingStyleGlob = join(jigsawPath, 'theming/prebuilt/*.scss');
const prebuiltThemeSettingsGlob = join(jigsawCommonPath, 'core/theming/prebuilt/settings/*.scss');
const themingApiGlob = join(jigsawCommonPath, 'core/theming/theming-api.scss');

task('build:package',['clean'], function () {
    return run('ng build ' + projectName + ' --prod', {}).exec();
});

task('build:styles', [
    'build:all-theme-file',
    'build:bundle-theming-scss',
    'build:copy-prebuilt-theme-settings',
    'build:copy-theming-api'
]);

task('build:all-theme-file', ['build:package'], function () {
    return src([allThemingStyleGlob])
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(join(releasePath, 'prebuilt-themes')));
});

task(`build:bundle-theming-scss`,['build:package'], () => {
    return new Bundler().Bundle(themingEntryPointPath, [allScssGlob]).then(result => {
        writeFileSync(themingBundlePath, result.bundledContent);
    });
});

task(`build:copy-prebuilt-theme-settings`,['build:package'], () => {
    src(prebuiltThemeSettingsGlob)
        .pipe(dest(join(releasePath, 'prebuilt-themes', 'settings')));
});

task(`build:copy-theming-api`,['build:package'], () => {
    src(themingApiGlob)
        .pipe(dest(join(releasePath)));
});

task('build-jigsaw-lib', [
    'build:package',
    'build:styles'
]);
