import {Component, TemplateRef} from '@angular/core';
import {PopupInfo, PopupService} from "jigsaw/public_api";
import {DialogTextService} from "../text.service";

@Component({
    selector: 'title-dialog',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DialogTitleDemo {

    dialogInfo1: PopupInfo;
    dialogInfo2: PopupInfo;

    constructor(private popupService: PopupService, public text: DialogTextService) {
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
