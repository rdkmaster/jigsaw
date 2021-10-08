import {Component} from '@angular/core';
import {JigsawNotification} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .wrapper {
            width: 380px;
            margin: auto;
            overflow: hidden;
        }

        .wrapper h4 {
            margin: 6px 0 18px 6px;
        }

        .wrapper jigsaw-button {
            margin: 0 6px 6px 6px;
        }
    `]
})
export class NotificationBasicDemoComponent {
    showWithOptions() {
        JigsawNotification.show('这是消息框的默认样子！');
    }

    showSuccess() {
        JigsawNotification.showSuccess('这是一条成功的提示消息', {timeout: 8000});
    }

    showError() {
        JigsawNotification.showError('这是一条错误的提示消息', {timeout: 8000});
    }

    showWarn() {
        JigsawNotification.showWarn('这是一条警告的提示消息', {timeout: 8000});
    }

    showInfo() {
        JigsawNotification.showInfo('这是一条消息的提示消息', {timeout: 8000});
    }

    showInfo2() {
        JigsawNotification.showInfo('这是一条消息的提示消息', '带有标题的提示消息');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo介绍了通知提醒框的4种基础类型：';
    description: string = '';
}
