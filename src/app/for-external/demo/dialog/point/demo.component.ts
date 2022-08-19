import {Component, ViewEncapsulation} from "@angular/core";
import {
    PopupEffect, PopupInfo, PopupOptions,
    PopupPositionType, PopupService
} from "jigsaw/public_api";
import {UserDialog2Component} from "./user-dialog2/user-dialog";
import {DialogTextService} from "../doc.service";

@Component({
    selector: 'dialog-point',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogPointDemoComponent {
    dialogInfo1: PopupInfo;
    dialogInfo2: PopupInfo;

    public title: string = 'Title of the dialog';

    constructor(private _popupService: PopupService, public doc: DialogTextService) {
    }
    popupComponentDialogAtPoint(event) {
        const initData = {inputData: 'some data...'};
        const popupInfo = this._popupService.popup(UserDialog2Component, this.getUnModalOptions(event), initData);
        popupInfo.answer.subscribe(answer => {
            alert(answer.message ? answer.message : 'the dialog leave no message')
        });
    }
    popupDialogTemplate(tp, event) {
        if (this.dialogInfo2) {
            this.dialogInfo2.dispose();
        }
        this.dialogInfo2 = this._popupService.popup(tp, this.getUnModalOptions(event));
    }
    getUnModalOptions(event): PopupOptions {
        return {
            modal: false, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut,
            pos: {x: event.pageX, y: event.pageY}, //插入点
            posOffset: { //偏移位置
                top: -10,
                left: 10,
            },
            posType: PopupPositionType.absolute, //定位类型
        };
    }
}
