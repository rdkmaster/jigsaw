import {Component} from '@angular/core';
import {JigsawNotification} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
})
export class NotificationWithPromiseDemoComponent {
    async showWithOptions() {
        const buttons = [{label: 'Opt1'}, {label: 'Opt2'}];
        const msg = '带按钮的notification也可以async/await';
        const callback = (value) => console.log('回调函数的输出', value);
        const opt = {buttons, callback, disposeOnRouterChanged: true, timeout: 3000};
        const selected = await JigsawNotification.showInfo(msg, opt).toPromise();
        const text = 'async/await的输出：你选择了 ' + selected?.label;
        console.log(text);
        alert(text);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo介绍了如何使用async/await来处理notification上的按钮';
    description: string = '';
}
