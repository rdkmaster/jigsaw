import {Component} from "@angular/core";

import {UseDialogComponent} from './use-dialog/use-dialog';
import {UseDialog2Component} from './use-dialog2/use-dialog';

import {
    PopupService, PopupOptions, PopupPositionType, PopupPoint, PopupDisposer, ButtonInfo, PopupRef
} from '../../../../../service/popup.service';

@Component({
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss']
})
export class DialogDemoComponent {

    private _templateRef: PopupRef;
    private _dialogRef: PopupRef;
    private _dialogDisposer: PopupDisposer;

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
                this._dialogRef.destroy()
            },
            clazz: ""
        }
    ];

    constructor(private _popupService: PopupService) {
    }

    popup() {
        this._popupService.popup(UseDialogComponent); //没有配options，默认使用模态
    }

    popupAtPoint(event) {
        this._popupService.popup(UseDialog2Component, this._getUnModalOptions(event));
    }

    popupDialogTemplate(tp){
        this._dialogRef = this._popupService.popup(tp);
        this._dialogDisposer = () => {this._dialogRef.destroy()};
    }

    popupTemplate(tp){
        this._templateRef = this._popupService.popup(tp);
    }

    closeTemplate(){
        this._templateRef.destroy();
    }

    private _getModalOptions(): PopupOptions {
        return {
            modal: true //是否模态
        };
    }

    private _getUnModalOptions(event): PopupOptions {
        return {
            modal: false, //是否模态
            pos: {x: event.clientX, y: event.clientY}, //插入点
            posOffset: { //偏移位置
                top: -10,
                left: 10,
            },
            posType: PopupPositionType.absolute, //定位类型
        };
    }
}

