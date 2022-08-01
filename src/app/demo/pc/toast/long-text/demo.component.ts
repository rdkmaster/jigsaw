import {AfterViewInit, Component} from '@angular/core';
import {ToastTextService} from "../doc.service";
import {JigsawToast, ToastMessage} from 'jigsaw/public_api';


@Component({
    selector: 'toast-long-text',
    templateUrl: './demo.component.html',
    styles:  [`
        .toast-basic-demo-cntr {
            width: 300px;
        }
    `]
})
export class ToastLongTextDemoComponent implements AfterViewInit{
    message: string;
    icon = 'iconfont iconfont-e076';
    timeout = 4;
    width = 400;

    show() {
        const options: ToastMessage = { timeout: this.timeout * 1000, width: this.width };
            options.icon = this.icon;
            JigsawToast.show(this.message, options);
    }

    makeLongMessage() {
        this.message = "这是一个有长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长文本的Toast提示框！"
    }

    constructor(public text: ToastTextService) {
    }
    ngAfterViewInit(): void {
        this.makeLongMessage()
    }
}
