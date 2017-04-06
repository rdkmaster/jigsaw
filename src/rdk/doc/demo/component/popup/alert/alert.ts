import {Component} from "@angular/core";

import {InfoAlert} from './use-alert-default/info-alert';
import {WarningAlert} from './use-alert-default/warning-alert';
import {ErrorAlert} from './use-alert-default/error-alert';
import {UserAlertComponentConfig} from './use-alert-config/alert-config';

import {
    PopupService, PopupOptions, PopupPositionType, PopupPoint
} from '../../../../../service/popup.service';

@Component({
    templateUrl: 'alert.html',
    styleUrls: ['alert.scss']
})
export class AlertDemoComponent {

    private _templateId: number;

    constructor(private _popupService: PopupService) {
    }

    alertDefaultInfo(event) {
        this._popupService.popup(InfoAlert, this._getDialogOptionsTwo(event));
    }

    alertDefaultWarning(event) {
        this._popupService.popup(WarningAlert, this._getDialogOptionsTwo(event));
    }

    alertDefaultError(event) {
        this._popupService.popup(ErrorAlert, this._getDialogOptionsTwo(event));
    }

    alertConfig(event) {
        this._popupService.popup(UserAlertComponentConfig, this._getDialogOptionsTwo(event));
    }


    closeTemplate(){
        this._popupService.removePopup(this._templateId);
    }

    private _getDialogOptions(): PopupOptions {
        return {
            modal: true //是否模态
        };
    }

    private _getDialogOptionsTwo(event): PopupOptions {
        return {
            modal: false, //是否模态
            pos: new PopupPoint(event.clientX, event.clientY), //插入点
            posOffset: { //偏移位置
                top: -10,
                left: 10,
            },
            posType: PopupPositionType.absolute, //定位类型
        };
    }
}

