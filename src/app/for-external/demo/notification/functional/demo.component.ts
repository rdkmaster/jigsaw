import { Component } from '@angular/core';
import { JigsawNotification } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'notification-functional',
    templateUrl: './demo.component.html',
    styles: [`
        .wrapper {
            width: 250px;
        }
    `]
})
export class NotificationFunctionalDemoComponent extends AsyncDescription {
    public demoPath = "demo/notification/functional";


    public showSuccess() {
        JigsawNotification.showSuccess('这是一条成功的提示消息', { timeout: 8000 });
    }

    public showError() {
        JigsawNotification.showError('这是一条错误的提示消息', { timeout: 8000 });
    }

    public showWarn() {
        JigsawNotification.showWarn('这是一条警告的提示消息', { timeout: 8000 });
    }

    public showInfo() {
        JigsawNotification.showInfo('这是一条消息的提示消息', { timeout: 8000 });
    }

    public showInfo2() {
        JigsawNotification.showInfo('这是一条消息的提示消息', '带有标题的提示消息');
    }
}
