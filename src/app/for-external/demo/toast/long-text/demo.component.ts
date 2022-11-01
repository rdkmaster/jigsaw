import { AfterViewInit, Component } from '@angular/core';
import { JigsawToast, ToastMessage } from 'jigsaw/public_api';
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'toast-long-text',
    templateUrl: './demo.component.html'
})
export class ToastLongTextDemoComponent extends AsyncDescription implements AfterViewInit {
    public demoPath = "demo/toast/long-text";

    public message: string;
    public icon = 'iconfont iconfont-e076';
    public timeout = 4;
    public width = 400;

    public show() {
        const options: ToastMessage = { timeout: this.timeout * 1000, width: this.width };
        options.icon = this.icon;
        JigsawToast.show(this.message, options);
    }

    public makeLongMessage() {
        this.message = "这是一个有长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长文本的Toast提示框！"
    }

    ngAfterViewInit(): void {
        this.makeLongMessage()
    }
}
