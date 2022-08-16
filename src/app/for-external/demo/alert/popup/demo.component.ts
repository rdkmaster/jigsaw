import { Component } from "@angular/core";
import { JigsawConfirmAlert, JigsawErrorAlert, JigsawInfoAlert, JigsawWarningAlert } from "jigsaw/public_api";
import { AlertTextService } from "../doc.service";

@Component({
    selector: 'alert-popup',
    templateUrl: './demo.component.html',
})
export class AlertPopupDemoComponent {
    header = '这是一个标题';
    message = '弹出的信息也可以直接给一个字符串，Alert会将此字符串作为主消息显示出来。';

    commonInfoAlert() {
        const info = { header: this.header, message: this.message };
        JigsawInfoAlert.show(info);
    }

    commonWarningAlert() {
        const info = { header: this.header, message: this.message };
        JigsawWarningAlert.show(info);
    }

    commonErrorAlert() {
        const info = { header: this.header, message: this.message };
        JigsawErrorAlert.show(info);
    }

    commonConfirmAlert() {
        const info = { header: this.header, message: this.message };
        JigsawConfirmAlert.show(info);
    }

    constructor(public text: AlertTextService) {
    }

    // ====================================================================
    // Ignore the following lines, they are not important to this demo.
    // ====================================================================
    codes = [
        { label: "HTML", language: 'html', value: require('!!raw-loader!./demo.component.html').default, },
        { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./demo.component.ts').default }
    ];
}
