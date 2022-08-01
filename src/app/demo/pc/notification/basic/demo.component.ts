import {Component} from '@angular/core';
import {JigsawNotification} from "jigsaw/public_api";
import {NotificationTextService} from "../doc.service";

@Component({
    selector: 'notification-basic',
    templateUrl: './demo.component.html',
    styles: [`
        .wrapper {
            width: 380px;
        }
    `]
})
export class NotificationBasicDemoComponent {
    public ButtonSize: string = 'medium';
    showWithOptions() {
        JigsawNotification.show('这是消息框的默认样子！', {icon: undefined});
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

    constructor(public text: NotificationTextService) {
    }
}
