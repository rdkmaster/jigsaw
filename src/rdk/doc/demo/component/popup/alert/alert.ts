import {Component} from "@angular/core";

import {CustomizedAlert} from './customized-alert/customized-alert';

import {
    PopupService, PopupOptions, PopupPositionType, PopupPoint, ButtonInfo, PopupDisposer, PopupEffect
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

    infoInitData = {
        message: 'this is a great info alert!', title: 'the title is optional',
        callback: this.alertCallback, callbackContext: this
    };

    commonInfoAlert(event) {
        this.answer = 'waiting for an answer';
        this._popupService.popup(RdkInfoAlert, this._getModalOptions(), {
            message: 'this is a great info alert!', title: 'the title is optional',
            callback: this.alertCallback, callbackContext: this
        });
    }

    commonWarningAlert(event) {
        this.answer = 'waiting for an answer';
        this._popupService.popup(RdkWarningAlert, this._getModalOptions(), {
            message: 'this is a great warning alert!',
            callback: this.alertCallback, callbackContext: this
        });
    }

    commonErrorAlert(event) {
        this.answer = 'waiting for an answer';
        this._popupService.popup(RdkErrorAlert, this._getUnModalOptions(event), {
            message: 'this is a great error alert!',
            callback: this.alertCallback, callbackContext: this
        });
    }

    customizedAlert(event) {
        this.answer = 'waiting for an answer';
        this._popupService.popup(CustomizedAlert, this._getUnModalOptions(event));
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

