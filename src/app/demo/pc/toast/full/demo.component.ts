import { Component } from '@angular/core';
import {JigsawToast, ToastMessage} from 'jigsaw/public_api';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class ToastFullDemoComponent {
    selectedIcon = ['成功'];
    message = '这是一个Toast提示框！';
    icon = 'iconfont iconfont-e076';
    timeout = 4;
    width = 256;

    show() {
        const options: ToastMessage = { timeout: this.timeout * 1000, width: this.width };
        if (this.selectedIcon[0] == '提示') {
            JigsawToast.showInfo(this.message, options)
        } else if (this.selectedIcon[0] == '成功') {
            JigsawToast.showSuccess(this.message, options)
        } else if (this.selectedIcon[0] == '失败') {
            JigsawToast.showError(this.message, options)
        } else if (this.selectedIcon[0] == '警告') {
            JigsawToast.showWarn(this.message, options)
        } else {
            options.icon = this.icon;
            JigsawToast.show(this.message, options);
        }
    }

    makeLongMessage() {
        this.message = "这是一个有长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长文本的Toast提示框！"
    }

    makeSuperLongMessage() {
        const long = '长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长';
        this.message = `这是有${long}，${long}，${long}，${long}，${long}，${long}，${long}文本的Toast提示框！`;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo介绍了Toast组件的基本用法';
    description: string = '';
}
