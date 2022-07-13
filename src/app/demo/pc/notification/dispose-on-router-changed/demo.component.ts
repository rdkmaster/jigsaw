import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {JigsawNotification} from "jigsaw/public_api";
import {NotificationTextService} from "../text.service";

@Component({
    selector: 'dispose-on-router-changed-notification',
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
    constructor(private router:Router, public text: NotificationTextService){
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
}
