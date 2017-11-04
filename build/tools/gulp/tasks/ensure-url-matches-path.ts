import {task} from 'gulp';
import {join} from 'path';
import {existsSync} from "fs"
import {DemoListManager} from "../../../../src/app/demo-list.component";

/**
 * 确保demo的url和它的源码路径一致，这样在demo运行时，就可以直接跳转到它对应的plunker上了。
 */
task('ensure-url-matches-path', () => {
    const routes = DemoListManager.fullRouterConfig;
    const demoHome = join(__dirname, '../../../../src/app/demo');
    let unmatchedUrls:string[] = [];

    // routes.forEach((route:any) => {
    //     route.childPaths.forEach((path:string) => {
    //         const modulePath = join(demoHome, route.path, path);
    //         if (!existsSync(join(modulePath, 'app.module.ts'))) {
    //             unmatchedUrls.push(modulePath);
    //         }
    //     });
    // });
    // if (unmatchedUrls.length > 0) {
    //     console.log('these urls do NOT match there file path:');
    //     console.log(unmatchedUrls);
    //     process.exit(1);
    // } else {
    //     console.log('great! all urls match their path!');
    // }
});
