/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef} from '@angular/core';
import {PopupInfo, PopupService} from "jigsaw/common/service/popup.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DialogTitleDemo {

    dialogInfo1: PopupInfo;
    dialogInfo2: PopupInfo;

    constructor(private popupService: PopupService) {
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawDialog.caption',
        'JigsawDialog.close',
    ];
}
