/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef} from "@angular/core";
import {PopupInfo, PopupService} from "jigsaw/service/popup.service";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class DialogTopDemo extends DemoBase {
    message: string;
    dialogInfo: PopupInfo;

    top = "20%";

    constructor(private popupService: PopupService) {
        super();
    }

    close() {
        this.dialogInfo.dispose();
    }

    popupDialog1(ele: TemplateRef<any>) {
        this.dialogInfo = this.popupService.popup(ele);
    }
}
