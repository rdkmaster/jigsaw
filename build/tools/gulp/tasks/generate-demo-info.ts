import {task} from 'gulp';
import {join} from 'path';
import {writeFileSync} from "fs"
import {routerConfig} from "../../../../src/app/router-config";
import {getRouterConfig} from "../util/get-router-config";

/**
 * 生成demo列表的json数据给网站使用。
 */
task('generate-demo-info', () => {
    let saveTo = './demo-info.json';
    process.argv.forEach((arg, index) => {
        if (arg !== '--save-to') {
            return;
        }
        const val = process.argv[index + 1];
        if (!!val) {
            saveTo = val;
        }
    });

    const demoHome = join(__dirname, '../../../../src/app/demo');
    let demos: any[] = [];

    routerConfig.forEach((router: any) => {
        const childDemos: any[] = [];
        demos.push({name: router.path, demos: childDemos});
        const childRouters = getRouterConfig(join(demoHome, router.path, 'demo.module.ts'));
        childRouters.forEach((child: any) => {
            const demoInfo = {
                url: `http://rdk.zte.com.cn:8800/${router.path}/${child.path}`,
                desc: child.desc ? child.desc : child.path,
                recommended: !!child.recommended
            };
            childDemos.push(demoInfo);
        });
    });

    console.log('the demo info file is saved to: ' + saveTo);
    writeFileSync(saveTo, JSON.stringify(demos));
});

