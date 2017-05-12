import {Component} from "@angular/core";

import {CustomizedAlert} from './customized-alert/customized-alert';

import {
    PopupService, PopupOptions, PopupPositionType, PopupPoint, ButtonInfo, PopupDisposer
} from '../../../../../service/popup.service';
import {RdkErrorAlert, RdkInfoAlert, RdkWarningAlert} from "../../../../../component/alert/alert";

@Component({
    templateUrl: 'alert.html',
    styleUrls: ['alert.scss']
})
export class AlertDemoComponent {

    answer = '';

    constructor(private _popupService: PopupService) {
    }

    private alertCallback(answer:ButtonInfo) {
        this.answer = answer ? 'great! your answer is: ' + answer.label : 'you closed the alert with the close button';
    }

    commonInfoAlert(event) {
        this.answer = 'waiting for an answer';
        this._popupService.popup(RdkInfoAlert, {modal: true}, {
            message: 'this is a great info alert!', title: 'the title is optional',
            callback: this.alertCallback, callbackContext: this
        });
    }

    commonWarningAlert(event) {
        this.answer = 'waiting for an answer';
        this._popupService.popup(RdkWarningAlert, {modal: true}, {
            message: 'this is a great warning alert!',
            callback: this.alertCallback, callbackContext: this
        });
    }

    commonErrorAlert(event) {
        this.answer = 'waiting for an answer';
        this._popupService.popup(RdkErrorAlert, this._getDialogOptions(event), {
            message: 'this is a great error alert!',
            callback: this.alertCallback, callbackContext: this
        });
    }

    customizedAlert(event) {
        this.answer = 'waiting for an answer';
        this._popupService.popup(CustomizedAlert, this._getDialogOptions(event));
    }

    private _getDialogOptions(event): PopupOptions {
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

