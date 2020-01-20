import {Component, ViewEncapsulation} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CustomizeAlertDemoComponent {
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '使用`JigsawAlert`组件自定义一个对话框';
    description: string = '';
    codes: any = {
        "demo.module.ts": require('!!raw-loader!./demo.module.ts'),
        "demo.component.ts": require('!!raw-loader!./demo.component.ts'),
        "demo.component.html": require('!!raw-loader!./demo.component.html'),
        "customized-alert.ts": require('!!raw-loader!./customized-alert.ts'),
        "customized-alert.html": require('!!raw-loader!./customized-alert.html'),
        "customized-alert.css": require('!!raw-loader!./customized-alert.css'),
    }
}

