/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef} from "@angular/core";
import {PopupInfo, PopupService} from "jigsaw/service/popup.service";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class DialogTopDemo {
    message: string;
    dialogInfo: PopupInfo;

    top = "20%";

    constructor(private popupService: PopupService) {
    }

    close() {
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
