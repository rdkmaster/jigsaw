import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {JigsawNotification} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .wrapper {
            width: 380px;
            margin: auto;
            overflow: hidden;
        }

        .wrapper jigsaw-button {
            margin: 6px;
        }
    `]
})
export class NotificationDisposeOnRouterDemoComponent {
    constructor(private router:Router){

    }
    disposeOnRouter(){
        JigsawNotification.show('这是一个会在路由变化后关掉的消息框',{disposeOnRouterChanged:true})
    }

    notDisposeOnRouter(){
        JigsawNotification.show('这是一个不会在路由变化后关掉的消息框',{disposeOnRouterChanged:false})
    }
    goToBasic(){
        this.router.navigate([`pc/notification/basic`]);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo介绍了控制是否在路由变化时自动关掉弹出的提示框：';
    description: string = '';
}
