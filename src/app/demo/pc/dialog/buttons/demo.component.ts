import {Component, TemplateRef, ViewEncapsulation} from '@angular/core';
import {PopupInfo, PopupService} from "jigsaw/public_api";
import {DialogTextService} from "../text.service";

@Component({
    selector: 'buttons-dialog',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogButtonsDemo {
    constructor(private popupService: PopupService, public text: DialogTextService) {
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
}
