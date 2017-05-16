import {Component} from "@angular/core";

import {UseDialogComponent} from './use-dialog/use-dialog';
import {UseDialog2Component} from './use-dialog2/use-dialog';

import {
    PopupService, PopupOptions, PopupPositionType, PopupPoint, PopupDisposer, ButtonInfo, PopupRef, PopupEffect,
    PopupInfo
} from '../../../../../service/popup.service';

@Component({
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss']
})
export class DialogDemoComponent {

    private _templateRef: PopupInfo;
    private _dialogInfo: PopupInfo;

    public title: string = 'Title of the dialog';
    public buttons: Array<ButtonInfo> = [
        {
            label: 'confirm',
            callback: () => {
                console.log('confirm callback success!')
            },
            clazz: ""
        },
        {
            label: 'cancel',
            callback: () => {
                this._dialogInfo.disposer()
            },
            clazz: ""
        }
    ];

    constructor(private _popupService: PopupService) {
    }

    popup() {
        this._popupService.popup(UseDialogComponent, this._getModalOptions()); //没有配options，默认使用模态
    }

    popupAtPoint(event) {
        this._popupService.popup(UseDialog2Component, this._getUnModalOptions(event));
    }

    popupModalDialogTemplate(tp){
        this._dialogInfo = this._popupService.popup(tp, this._getModalOptions());
    }

    popupDialogTemplate(tp){
        this._dialogInfo = this._popupService.popup(tp, this._getUnModalOptions(event));
    }

    closeDialogTemplate(){
        this._dialogInfo.disposer();
    }

    popupTemplate(tp){
        this._templateRef = this._popupService.popup(tp);
    }

    closeTemplate(){
        this._templateRef.disposer();
    }

    private _getModalOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
    }

    private _getUnModalOptions(event): PopupOptions {
        return {
            modal: false, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut,
            pos: {x: event.clientX, y: event.clientY}, //插入点
            posOffset: { //偏移位置
                top: -10,
                left: 10,
            },
            posType: PopupPositionType.absolute, //定位类型
        };
    }
}

