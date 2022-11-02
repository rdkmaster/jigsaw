import {Component, ElementRef, TemplateRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { PopupInfo, PopupService } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'dialog-top-offset',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DialogTopOffSetDemoComponent extends AsyncDescription {
    public demoPath = "demo/dialog/top-offset";

    public message: string;
    public dialogInfo: PopupInfo;
    public top = "10%";

    public close() {
        this.dialogInfo.dispose();
    }

    public popupDialog1(ele: TemplateRef<any>) {
        this.dialogInfo = this.popupService.popup(ele);
    }

    constructor(private popupService: PopupService, http: HttpClient, el: ElementRef) {
        super(http, el);
    }
}
