/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ButtonInfo, PopupInfo, PopupService} from "jigsaw/service/popup.service";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogButtonsDemo {
    constructor(private popupService: PopupService) {
    }

    dialogInfo: PopupInfo;

    buttons: Array<ButtonInfo> = [
        {
            label: 'confirm',
            clazz: "red"
        }, {
            label: 'ok',
            clazz: ""
        },
        {
            label: 'cancel',
            clazz: ""
        }
    ];

    message: String;

    showInfo(buttonInfo: ButtonInfo) {
        if (buttonInfo) {
            this.message = `${buttonInfo.label} button clicked!`;
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
    summary: string = '';
    description: string = '';

}
