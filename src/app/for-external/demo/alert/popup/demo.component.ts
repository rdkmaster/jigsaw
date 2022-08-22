import { Component } from "@angular/core";
import { JigsawConfirmAlert, JigsawErrorAlert, JigsawInfoAlert, JigsawWarningAlert } from "jigsaw/public_api";
import { AlertTextService } from "../doc.service";

@Component({
    selector: 'alert-popup',
    templateUrl: './demo.component.html',
})
export class AlertPopupDemoComponent {
    public header = '这是一个标题';
    public message = '弹出的信息也可以直接给一个字符串，Alert会将此字符串作为主消息显示出来。';

    public commonInfoAlert() {
        const info = { header: this.header, message: this.message };
        JigsawInfoAlert.show(info);
    }

    public commonWarningAlert() {
        const info = { header: this.header, message: this.message };
        JigsawWarningAlert.show(info);
    }

    public commonErrorAlert() {
        const info = { header: this.header, message: this.message };
        JigsawErrorAlert.show(info);
    }

    public commonConfirmAlert() {
        const info = { header: this.header, message: this.message };
        JigsawConfirmAlert.show(info);
    }

    constructor(public doc: AlertTextService) {
    }
}
