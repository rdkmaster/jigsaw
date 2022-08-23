import { Component, ViewEncapsulation } from "@angular/core";
import {
    PopupEffect, PopupInfo, PopupOptions,
    PopupPositionType, PopupService
} from "jigsaw/public_api";
import { DialogTextService } from "../doc.service";

@Component({
    selector: 'dialog-template',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogTemplateDemoComponent {
    public dialogInfo1: PopupInfo;
    public dialogInfo2: PopupInfo;
    public dialogInfo3: PopupInfo;

    public title: string = 'Title of the dialog';

    /*
    * popup template
    * */
    public popupTemplateDialog(tp) {
        this.dialogInfo1 = this._popupService.popup(tp, this.getModalOptions());
    }

    /*
    * popup template at point
    * */
    public popupDialogTemplate(tp, event) {
        if (this.dialogInfo2) {
            this.dialogInfo2.dispose();
        }
        this.dialogInfo2 = this._popupService.popup(tp, this.getUnModalOptions(event));
    }
    public onAnswer(message: string) {
        if (message) {
            alert(`The message is "${message}".`);
        } else {
            alert('The dialog leave no message!');
        }
        if (this.dialogInfo1) {
            this.dialogInfo1.dispose();
        }
        if (this.dialogInfo2) {
            this.dialogInfo2.dispose();
        }
        if (this.dialogInfo3) {
            this.dialogInfo3.dispose();
        }
    }

    public getModalOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
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

    constructor(private _popupService: PopupService, public doc: DialogTextService) {
    }
}
