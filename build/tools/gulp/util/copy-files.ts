import {sync as glob} from 'glob';
import {mkdirpSync, copySync, existsSync, readdirSync, lstatSync, unlinkSync, rmdirSync} from 'fs-extra';
import {join, dirname} from 'path';

/** Function to copy files that match a glob to another directory. */
export function copyFiles(fromPath: string, fileGlob: string, outDir: string) {
    glob(fileGlob, {cwd: fromPath}).forEach(filePath => {
        let fileDestPath = join(outDir, filePath);
        mkdirpSync(dirname(fileDestPath));
        copySync(join(fromPath, filePath), fileDestPath);
    });
}

/**
 * 删除非空文件夹
 * @param path
 */
export function deleteFolderRecursive(path: string) {
    if (existsSync(path)) {
        readdirSync(path).forEach(file => {
            const curPath = path + '/' + file;
            if (lstatSync(curPath).isDirectory()) {
                // 递归删除子目录
                deleteFolderRecursive(curPath);
            } else {
                // 删除文件
                unlinkSync(curPath);
            }
        });
        // 删除目录
        rmdirSync(path);
    }
}
