import {Component, TemplateRef} from "@angular/core";
import {PopupInfo, PopupService} from "jigsaw/common/service/popup.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DialogHeightDemo {
    dialogInfo: PopupInfo;

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
    summary: string = '这个demo演示了如何使用`height`属性来控制弹出的对话框的高度';
    description: string = '';
    tags: string[] = [
        'JigsawDialog.height',
    ];
}
