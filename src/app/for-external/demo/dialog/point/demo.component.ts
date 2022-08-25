import {Component, ElementRef, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    PopupEffect, PopupInfo, PopupOptions,
    PopupPositionType, PopupService
} from "jigsaw/public_api";
import { UserDialog2Component } from "./user-dialog/user-dialog";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'dialog-point',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogPointDemoComponent extends AsyncDescription {
    public demoPath = "demo/dialog/point";

    public dialogInfo1: PopupInfo;
    public dialogInfo2: PopupInfo;
    public title: string = 'Title of the dialog';

    public popupComponentDialogAtPoint(event) {
        const initData = { inputData: 'some data...' };
        const popupInfo = this._popupService.popup(UserDialog2Component, this.getUnModalOptions(event), initData);
        popupInfo.answer.subscribe(answer => {
            alert(answer.message ? answer.message : 'the dialog leave no message')
        });
    }
    public popupDialogTemplate(tp, event) {
        if (this.dialogInfo2) {
            this.dialogInfo2.dispose();
        }
        this.dialogInfo2 = this._popupService.popup(tp, this.getUnModalOptions(event));
    }
    public getUnModalOptions(event): PopupOptions {
        return {
            modal: false, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut,
            pos: { x: event.pageX, y: event.pageY }, //插入点
            posOffset: { //偏移位置
                top: -10,
                left: 10,
            },
            posType: PopupPositionType.absolute, //定位类型
        };
    }

    constructor(private _popupService: PopupService, http: HttpClient, el: ElementRef) {
        super(http, el);
    }
}
