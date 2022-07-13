import {Component, TemplateRef} from "@angular/core";
import {PopupInfo, PopupService} from "jigsaw/public_api";
import {DialogTextService} from "../text.service";

@Component({
    selector: 'height-dialog',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DialogHeightDemo {
    dialogInfo: PopupInfo;

    constructor(private popupService: PopupService, public text: DialogTextService) {
    }

    close() {
        this.dialogInfo.dispose();
    }

    popupDialog1(ele: TemplateRef<any>) {
        this.dialogInfo = this.popupService.popup(ele);
    }
}
