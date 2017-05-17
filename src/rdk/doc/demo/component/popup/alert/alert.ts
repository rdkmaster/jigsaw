import {Component, ComponentRef} from "@angular/core";

import {CustomizedAlert} from './customized-alert/customized-alert';

import {
    PopupService, PopupOptions, PopupPositionType, PopupPoint, ButtonInfo, PopupDisposer, PopupEffect, PopupInfo
} from '../../../../../service/popup.service';
import {RdkErrorAlert, RdkInfoAlert, RdkWarningAlert} from "../../../../../component/alert/alert";

@Component({
    templateUrl: 'alert.html',
    styleUrls: ['alert.scss']
})
export class AlertDemoComponent {

    answer = '';

    infoInitData = {
        message: 'this is a great info alert!', title: 'the title is optional'
    };

    constructor(private _popupService: PopupService) {
    }

    alertCallback(answer:ButtonInfo) {
        this.answer = answer ? 'great! your answer is: ' + answer.label : 'you closed the alert with the close button';
    }

    disposeAnswer(answer: ButtonInfo, popupInfo: PopupInfo){
        if(answer){
            this.alertCallback(answer);
            popupInfo.disposer()
        }else{
            popupInfo.disposer()
        }
    }

    commonInfoAlert() {
        this.answer = 'waiting for an answer';
        const popupInfo = this._popupService.popup(RdkInfoAlert, this._getModalOptions(), {
            message: 'this is a great info alert!', title: 'the title is optional'
        });
        if(popupInfo.popupRef instanceof ComponentRef){
            popupInfo.popupRef.instance.answer.subscribe(answer => {
                this.disposeAnswer(answer, popupInfo)
            })
        }
    }

    commonWarningAlert() {
        this.answer = 'waiting for an answer';
        const popupInfo = this._popupService.popup(RdkWarningAlert, this._getModalOptions(), {
            message: 'this is a great warning alert!'
        });
        if(popupInfo.popupRef instanceof ComponentRef){
            popupInfo.popupRef.instance.answer.subscribe(answer => {
                this.disposeAnswer(answer, popupInfo)
            })
        }
    }

    commonErrorAlert(event) {
        this.answer = 'waiting for an answer';
        const popupInfo = this._popupService.popup(RdkErrorAlert, this._getUnModalOptions(event), {
            message: 'this is a great error alert!'
        });
        if(popupInfo.popupRef instanceof ComponentRef){
            popupInfo.popupRef.instance.answer.subscribe(answer => {
                this.disposeAnswer(answer, popupInfo)
            })
        }
    }

    customizedAlert(event) {
        this.answer = 'waiting for an answer';
        const popupInfo = this._popupService.popup(CustomizedAlert, this._getUnModalOptions(event));
        if(popupInfo.popupRef instanceof ComponentRef){
            popupInfo.popupRef.instance.answer.subscribe(answer => {
                this.disposeAnswer(answer, popupInfo)
            })
        }
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

