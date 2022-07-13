import {Component, ViewEncapsulation} from "@angular/core";
import {
    ButtonInfo, PopupEffect, PopupInfo, PopupOptions,
    PopupPositionType, PopupService
} from "jigsaw/public_api";
import {UserDialogComponent} from "./user-dialog/user-dialog";
import {UserDialog2Component} from "./user-dialog2/user-dialog";
import {DialogTextService} from "../text.service";

@Component({
    selector: 'misc-dialog',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogMiscDemoComponent {
    dialogInfo1: PopupInfo;
    dialogInfo2: PopupInfo;
    dialogInfo3: PopupInfo;

    public title: string = 'Title of the dialog';

    constructor(private _popupService: PopupService, public text: DialogTextService) {
    }

    /*
    * popup component
    * */
    popupComponentDialog() {
        const initData = {inputData: 'some data...'};
        this._popupService.popup(UserDialogComponent, this.getModalOptions(), initData);
    }

    /*
     * popup component at point
     * */
    popupComponentDialogAtPoint(event) {
        const initData = {inputData: 'some data...'};
        const popupInfo = this._popupService.popup(UserDialog2Component, this.getUnModalOptions(event), initData);
        popupInfo.answer.subscribe(answer => {
            alert(answer.message ? answer.message : 'the dialog leave no message')
        });
    }

    /*
    * popup template
    * */
    popupTemplateDialog(tp) {
        this.dialogInfo1 = this._popupService.popup(tp, this.getModalOptions());
    }

    /*
    * popup template at point
    * */
    popupDialogTemplate(tp, event) {
        if (this.dialogInfo2) {
            this.dialogInfo2.dispose();
        }
        this.dialogInfo2 = this._popupService.popup(tp, this.getUnModalOptions(event));
    }

    /*
    * popup user defined template
    * */
    popupTemplate(tp) {
        // 默认皮肤不会给弹框设置背景，其他皮肤会给弹框加默认背景
        this.dialogInfo3 = this._popupService.popup(tp, {useCustomizedBackground: true});
    }

    onAnswer(message: string) {
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

    getModalOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
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
