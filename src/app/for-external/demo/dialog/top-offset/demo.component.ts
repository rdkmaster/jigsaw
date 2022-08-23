import { Component, TemplateRef } from "@angular/core";
import { PopupInfo, PopupService } from "jigsaw/public_api";
import { DialogTextService } from "../doc.service";

@Component({
    selector: 'dialog-top-offset',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DialogTopOffSetDemoComponent {
    public message: string;
    public dialogInfo: PopupInfo;
    public top = "10%";

    public close() {
        this.dialogInfo.dispose();
    }

    public popupDialog1(ele: TemplateRef<any>) {
        this.dialogInfo = this.popupService.popup(ele);
    }

    constructor(private popupService: PopupService, public doc: DialogTextService) {
    }
}
