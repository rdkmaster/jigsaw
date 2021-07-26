import {task} from 'gulp';
import {join} from 'path';
import {existsSync} from "fs"
import {routerConfig} from "../../../../src/app/router-config";
import {getRouterConfig} from "../util/get-router-config";

/**
 * 确保demo的url和它的源码路径一致，这样在demo运行时，就可以直接跳转到它对应的plunker上了。
 */
task('ensure-url-matches-path', () => {
    const demoHome = join(__dirname, '../../../../src/app/demo');
    const mismatchUrls: string[] = [], invalidPaths: string[] = [];

    routerConfig.forEach((router: any) => {
        const childRouters = getRouterConfig(join(demoHome, router.path, 'demo-set.module.ts'));
        childRouters.filter(child => !!child.path)
            .forEach((child: any) => {
                const modulePath = join(demoHome, router.path, child.path);
                if (!existsSync(join(modulePath, 'demo.module.ts'))) {
                    mismatchUrls.push(modulePath);
                }
                if (/[^a-z-0-9]/.test(child.path)) {
                    invalidPaths.push(`${router.path}/${child.path}`);
                }
            });
    });
    if (mismatchUrls.length > 0) {
        console.log('these urls do NOT match there file path:');
        console.log(mismatchUrls);
        process.exit(1);
    }
    if (invalidPaths.length > 0) {
        console.log('these demo folder name are invalid, only lower case letters, numbers and dash(-) are allowed:');
        console.log(invalidPaths);
        process.exit(1);
    }
    if (invalidPaths.length == 0 && mismatchUrls.length == 0) {
        console.log('great! all urls match their paths!');
    }
});


