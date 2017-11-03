import {task} from 'gulp';
import {join} from 'path';
import {existsSync} from "fs"
import {navInfo} from "../../../../src/app/demo/nav-info"

/**
 * 确保demo的url和它的源码路径一致，这样在demo运行时，就可以直接跳转到它对应的plunker上了。
 */
task('ensure-url-matches-path', () => {
    const testeeHome = join(__dirname, '../../../../src/app/demo');
    const demoHome = join(__dirname, '../../../../src/app/live-demo');
    let unmatchedUrls:string[] = [];
    navInfo.forEach(navItem => {
        navItem.navList.forEach(nav => {
            console.log(join(testeeHome, nav.url, 'app.module.ts'))
            if (!existsSync(join(testeeHome, nav.url, 'app.module.ts')) && !existsSync(join(demoHome, nav.url, 'app.module.ts'))) {
                unmatchedUrls.push(nav.url);
            }
        });
    });
    if (unmatchedUrls.length > 0) {
        console.log('these urls do NOT match there file path:');
        console.log(unmatchedUrls);
        process.exit(1);
    } else {
        console.log('great! all urls match their path!');
    }
});
