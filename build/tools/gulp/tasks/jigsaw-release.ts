import {dest, src, task} from 'gulp';
import {join} from 'path';
import {mkdirpSync, writeFileSync} from 'fs-extra';
import {Bundler} from 'scss-bundle';
import {sequenceTask} from '../util/task_helpers';
import {composeRelease} from '../packaging/build-release';
import {buildConfig} from '../packaging/build-config';

export function createReleaseTasks(packageName: string, requiredPackages: string[] = []) {
    // There are no type definitions available for these imports.
    const gulpRename = require('gulp-rename');

    const gulpSass = require('gulp-sass');

    const {packagesDir, outputDir} = buildConfig;

    /** Path to the directory where all releases are created. */
    const releasesDir = join(outputDir, 'releases');

    /** Path to the output of the Jigsaw package. */
    const jigsawOutputPath = join(outputDir, 'packages', packageName);

// Path to the sources of the Jigsaw package.
    const jigsawPath = join(packagesDir, 'jigsaw');
// Path to the release output of jigsaw.
    const releasePath = join(releasesDir, packageName);
// The entry-point for the scss theming bundle.
    const themingEntryPointPath = join(jigsawPath,
        packageName === 'jigsaw' ? 'pc-components/theming/all-theme.scss' : 'mobile-components/theming/all-theme.scss');
// Output path for the scss theming bundle.
    const themingBundlePath = join(releasePath, 'theming.scss');
// Matches all pre-built theme css files
    const prebuiltThemeGlob = join(jigsawOutputPath, '**/theming/prebuilt/*.css?(.map)');
    const prebuiltThemeSettingsGlob = join(jigsawOutputPath, '**/theming/prebuilt/settings/*.scss');
    const themingApiGlob = join(jigsawOutputPath, '**/theming/theming-api.scss');
// Matches all SCSS files in the library.
    const allScssGlob = join(jigsawPath, '**/*.scss');

    /**
     * Overwrite the release task for the jigsaw package. The jigsaw release will include special
     * files, like a bundled theming SCSS file or all prebuilt themes.
     */
    task(`${packageName}:build-release`, [`${packageName}:prepare-release`], () => composeRelease(packageName));

    /**
     * Task that will build the jigsaw package. It will also copy all prebuilt themes and build
     * a bundled SCSS file for theming
     */
    task(`${packageName}:prepare-release`, sequenceTask(
        `${packageName}:build`, [`${packageName}:copy-prebuilt-themes`,
            `${packageName}:copy-prebuilt-theme-settings`, `${packageName}:copy-theming-api`, `${packageName}:bundle-theming-scss`],
    ));

    /** Copies all prebuilt themes into the release package under `prebuilt-themes/` */
    task(`${packageName}:copy-prebuilt-themes`, () => {
        src(prebuiltThemeGlob)
            .pipe(gulpRename({dirname: ''}))
            .pipe(dest(join(releasePath, 'prebuilt-themes')));
    });

    /**
     * theme-settings 提供给用户使用的皮肤参数
     * */
    task(`${packageName}:copy-prebuilt-theme-settings`, () => {
        src(prebuiltThemeSettingsGlob)
            .pipe(gulpRename({dirname: ''}))
            .pipe(dest(join(releasePath, 'prebuilt-themes', 'settings')));
    });

    /**
     * theming-api.scss专门用来提供给用户定制组件样式的 mixin api
     */
    task(`${packageName}:copy-theming-api`, () => {
        src(themingApiGlob)
            .pipe(gulpRename({dirname: ''}))
            .pipe(dest(join(releasePath)));
    });

    /** Bundles all scss requires for theming into a single scss file in the root of the package. */
    task(`${packageName}:bundle-theming-scss`, () => {
        // Instantiates the SCSS bundler and bundles all imports of the specified entry point SCSS file.
        // A glob of all SCSS files in the library will be passed to the bundler. The bundler takes an
        // array of globs, which will match SCSS files that will be only included once in the bundle.
        return new Bundler().Bundle(themingEntryPointPath, [allScssGlob]).then(result => {
            // The release directory is not created yet because the composing of the release happens when
            // this task finishes.
            mkdirpSync(releasePath);
            writeFileSync(themingBundlePath, result.bundledContent);
        });
    });

    /** compile theming.scss to css */
    task(`${packageName}:compile-theming-scss`, () => {
        src(join(releasePath, 'theming.scss'))
            .pipe(gulpSass())
            .pipe(dest(releasePath));
    });
}

