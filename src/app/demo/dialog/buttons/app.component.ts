/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ButtonInfo, PopupInfo, PopupService} from "jigsaw/service/popup.service";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogButtonsDemo extends DemoBase {
    constructor(private popupService: PopupService) {
        super();
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


}
