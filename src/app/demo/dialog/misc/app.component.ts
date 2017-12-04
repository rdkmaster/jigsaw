import {Component, ViewEncapsulation} from "@angular/core";
import {UserDialogComponent} from "./user-dialog/user-dialog";
import {UserDialog2Component} from "./user-dialog2/user-dialog";
import {
    ButtonInfo,
    PopupEffect,
    PopupInfo,
    PopupOptions,
    PopupPositionType,
    PopupService
} from "jigsaw/service/popup.service";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogMiscDemoComponent {
    dialogInfo1: PopupInfo;
    dialogInfo2: PopupInfo;
    dialogInfo3: PopupInfo;

    public title: string = 'Title of the dialog';

    constructor(private _popupService: PopupService) {
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
        this.dialogInfo3 = this._popupService.popup(tp);
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo介绍了弹出对话框的3种主要方式：组件、模板、自定义';
    description: string = '[这里详细介绍了`PopupService`，请仔细阅读](/popup/introduce)。';
}

