import {task, src, dest} from 'gulp';
import {join} from 'path';
import {composeLabsRelease} from "../packaging/build-release";
import {buildConfig} from "../packaging/build-config";

const {packagesDir, outputDir} = buildConfig;
const jigsawPath = join(packagesDir, 'jigsaw');
const jigsawOutputPath = join(outputDir, 'releases', 'jigsaw');

task('jigsaw:build-labs-release',
    ['jigsaw:prepare-release', 'jigsaw:copy-pc-components-lib'],
    () => composeLabsRelease('jigsaw'));

task('jigsaw:copy-pc-components-lib', () => {
    src(join(jigsawPath, '**/*[^.d].ts')).pipe(dest(jigsawOutputPath));
    src(join(jigsawPath, '**/*.html')).pipe(dest(jigsawOutputPath));
});
