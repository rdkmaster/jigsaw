import {join} from 'path';
import {copyFiles} from '../util/copy-files';
import {addPureAnnotationsToFile} from './pure-annotations';
import {updatePackageVersion} from './package-versions';
import {inlinePackageMetadataFiles} from './metadata-inlining';
import {createTypingsReexportFile} from './typings-reexport';
import {createMetadataReexportFile} from './metadata-reexport';
import {buildConfig} from './build-config';
import {readFileSync, writeFileSync} from 'fs';
import {sync as glob} from "glob";

const {packagesDir, outputDir, projectDir} = buildConfig;

/** Directory where all bundles will be created in. */
const bundlesDir = join(outputDir, 'bundles');

/**
 * Copies different output files into a folder structure that follows the `angular/angular`
 * release folder structure. The output will also contain a README and the according package.json
 * file. Additionally the package will be Closure Compiler and AOT compatible.
 */
export function composeRelease(packageName: string) {
    const sourcePath = join(packagesDir, 'jigsaw');
    const packagePath = join(outputDir, 'packages', packageName);
    const releasePath = join(outputDir, 'releases', packageName);

    inlinePackageMetadataFiles(packagePath);

    // fix @ngx-translate/core/index in umd error
    glob(`${packageName}.umd?(.min).js`, {cwd: bundlesDir}).forEach(fileName => {
        let umdStr = readFileSync(join(bundlesDir, fileName)).toString();
        umdStr = umdStr.replace(/@ngx-translate\/core\/index/g, '@ngx-translate/core');
        writeFileSync(join(bundlesDir, fileName), umdStr);
    });

    copyFiles(packagePath, '**/*.+(d.ts|metadata.json)', join(releasePath, 'typings'));
    copyFiles(bundlesDir, `${packageName}.umd?(.min).js?(.map)`, join(releasePath, 'bundles'));
    copyFiles(bundlesDir, `${packageName}?(.es5).js?(.map)`, join(releasePath, '@rdkmaster'));
    copyFiles(projectDir, 'LICENSE', releasePath);
    copyFiles(packagesDir, 'README.md', releasePath);
    copyFiles(packageName === 'jigsaw' ? sourcePath + '/pc-components' : sourcePath + '/mobile-components', 'package.json', releasePath);

    updatePackageVersion(releasePath);
    createTypingsReexportFile(releasePath, packageName);
    createMetadataReexportFile(releasePath, packageName);
    addPureAnnotationsToFile(join(releasePath, '@rdkmaster', `${packageName}.es5.js`));
}

// export function composeLabsRelease(packageName: string) {
//     const sourcePath = join(packagesDir, 'jigsaw');
//     const packagePath = join(outputDir, 'packages', packageName);
//     const releasePath = join(outputDir, 'releases', packageName);
//
//     copyFiles(packagePath, '**/*.+(d.ts)', releasePath);
//     copyFiles(projectDir, 'LICENSE', releasePath);
//     copyFiles(packagesDir, 'README.md', releasePath);
//     copyFiles(packageName === 'jigsaw' ? sourcePath + '/pc-components' : sourcePath + '/mobile-components', 'package.json', releasePath);
//
//     updatePackageForLabs(releasePath, packageName);
//     //createTypingsReexportFile(releasePath, packageName);
// }
