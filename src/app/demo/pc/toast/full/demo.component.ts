import { Component } from '@angular/core';
import { JigsawToast } from 'jigsaw/public_api';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class ToastFullDemoComponent {

    message = '这是一个Toast提示框！';
    icon = undefined;
    timeout = 80;
    width = 256;
    multiline = 1;

    show() {
        JigsawToast.show(this.message, { icon: this.icon, timeout: this.timeout * 1000, width: this.width })
    }

    makeLongMessage() {
        this.message = "这是一个有长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长文本的Toast提示框！"
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo介绍了Toast组件的基本用法';
    description: string = '';
}
