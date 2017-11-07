/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef} from '@angular/core';
import {PopupInfo, PopupService} from "jigsaw/service/popup.service";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class DialogTitleDemo extends DemoBase {

    dialogInfo1: PopupInfo;
    dialogInfo2: PopupInfo;

    constructor(private popupService: PopupService) {
        super();
    }

    close(info: PopupInfo) {
        info.dispose();
    }

    popupDialog1(ele: TemplateRef<any>) {
        this.dialogInfo1 = this.popupService.popup(ele);
    }

    popupDialog2(ele: TemplateRef<any>) {
        this.dialogInfo2 = this.popupService.popup(ele);
    }

}
