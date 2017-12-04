/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ButtonInfo, PopupInfo, PopupService} from "jigsaw/service/popup.service";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogButtonsDemo {
    constructor(private popupService: PopupService) {
    }

    dialogInfo: PopupInfo;

    message: String;

    showInfo(label: string) {
        if (label) {
            this.message = `${label} button clicked!`;
        } else {
            this.message = `dialog close bar clicked!`;
        }
        this.dialogInfo.dispose();
    }

    popupDialog1(ele: TemplateRef<any>) {
        this.dialogInfo = this.popupService.popup(ele);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这demo演示了如何利用PopupService弹出一个对话框';
    description: string = '[这里详细介绍了`PopupService`，请仔细阅读](/popup/introduce)。';
}
