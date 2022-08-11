import {Component, TemplateRef, ViewEncapsulation} from '@angular/core';
import {PopupInfo, PopupService} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
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
    description: string = '[这里详细介绍了`PopupService`，请仔细阅读](#/pc/popup/introduce)。';
}
