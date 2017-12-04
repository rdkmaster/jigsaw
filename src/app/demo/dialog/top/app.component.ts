/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef} from "@angular/core";
import {PopupInfo, PopupService} from "jigsaw/service/popup.service";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
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
    summary: string = '这个demo演示了如何使用`top`属性来控制弹出的对话框的位置';
    description: string = `
        多数弹出式的对话框不需要精确控制弹出的位置，只要居中即可，某些场景需要水平居中，垂直控制，这个属性就是为了满足这个场景。
        - 不提供这个属性则对话框完全居中，这是多数情况下就够用了；
        - 有时候我们需要控制对话框垂直上的位置，则可以通过这个属性来控制，支持百分比或者像素值；
    `;
}
