import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {JigsawNotification} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .wrapper {
            width: 450px;
        }

        .wrapper .action {
            font-size: 14px;
        }

        .wrapper p {
            margin-bottom: 8px;
        }
    `]
})
export class NotificationDisposeOnRouterDemoComponent {
    constructor(private router:Router){
    }

    showNotification() {
        JigsawNotification.showWarn('在路由变化后，这个消息框将<span style="color:red">会</span>自动关掉',
            {disposeOnRouterChanged: true, timeout: 0});
        JigsawNotification.showInfo('在路由变化后，这个消息框将<span style="color:red">不会</span>自动关掉',
            {disposeOnRouterChanged: false, timeout: 0});
        JigsawNotification.showWarn('在路由变化后，这个消息框将<span style="color:red">会</span>自动关掉',
            {disposeOnRouterChanged: true, timeout: 0});
        JigsawNotification.showInfo('在路由变化后，这个消息框将<span style="color:red">不会</span>自动关掉',
            {disposeOnRouterChanged: false, timeout: 0});
    }

    changeRoute() {
        this.router.navigate([`pc/notification/basic`]);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo介绍了控制是否在路由变化时自动关掉弹出的提示框';
    description: string = '';
}
