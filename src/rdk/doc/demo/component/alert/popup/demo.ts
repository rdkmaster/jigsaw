import {Component, ComponentRef} from "@angular/core";
import {
    ButtonInfo, PopupEffect, PopupInfo, PopupOptions, PopupPositionType,
    PopupService
} from "../../../../../service/popup.service";
import {RdkErrorAlert, RdkInfoAlert, RdkWarningAlert} from "../../../../../component/alert/alert";

@Component({
    template: `
        <rdk-button width="170" (click)="commonInfoAlert()">
            common info alert
        </rdk-button>
    
        <rdk-button width="170" (click)="commonWarningAlert()">
            common warning alert
        </rdk-button>
    
        <rdk-button width="170" (click)="commonErrorAlert($event)">
            common error alert
        </rdk-button>
    
        <p style="margin-top: 20px; font-size: 16px">{{answer}}</p>
    `
})
export class AlertPopupDemoComponent {

    answer = '';

    constructor(private _popupService: PopupService) {
    }

    alertCallback(answer:ButtonInfo) {
        this.answer = answer ? 'great! your answer is: ' + answer.label : 'you closed the alert with the close button';
    }

    disposeAnswer(answer: ButtonInfo, popupInfo: PopupInfo){
        this.alertCallback(answer);
        popupInfo.dispose()
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

