import {Component, ComponentRef} from "@angular/core";

import {UserDialogComponent} from "./user-dialog/user-dialog";
import {UserDialog2Component} from "./user-dialog2/user-dialog";
import {
    ButtonInfo, PopupEffect, PopupInfo, PopupOptions, PopupPositionType,
    PopupService
} from "jigsaw/service/popup.service";

@Component({
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss']
})
export class DialogMiscDemoComponent {

     _templateRef: PopupInfo;
     _modalDialogInfo: PopupInfo;
     _dialogInfo: PopupInfo;

    public title: string = 'Title of the dialog';
    public buttons: Array<ButtonInfo> = [
        {
            role: 'confirm',
            label: 'confirm',
            clazz: ""
        },
        {
            role: 'cancel',
            label: 'cancel',
            clazz: ""
        }
    ];

    constructor(private _popupService: PopupService) {
    }

    /*
    * popup component
    * */
    popup() {
        const popupInfo = this._popupService.popup(UserDialogComponent, this._getModalOptions());
        if(popupInfo.popupRef instanceof ComponentRef){
            popupInfo.popupRef.instance.answer.subscribe(answer => {
                this.disposeAnswer(answer, popupInfo)
            })
        }
    }

    /*
     * popup component at point
     * */
    popupAtPoint(event) {
        const popupInfo = this._popupService.popup(UserDialog2Component, this._getUnModalOptions(event));
        if(popupInfo.popupRef instanceof ComponentRef){
            popupInfo.popupRef.instance.answer.subscribe(answer => {
                this.disposeAnswer(answer, popupInfo)
            })
        }
    }

    /*
    * popup template
    * */
    popupModalDialogTemplate(tp){
        if(this._modalDialogInfo){
            this.closeModalDialogTemplate()
        }
        this._modalDialogInfo = this._popupService.popup(tp, this._getModalOptions());
    }

    closeModalDialogTemplate(){
        this._modalDialogInfo.dispose();
        this._modalDialogInfo = null
    }

    /*
    * popup template at point
    * */
    popupDialogTemplate(tp, event){
        if(this._dialogInfo){
            this.closeDialogTemplate()
        }
        this._dialogInfo = this._popupService.popup(tp, this._getUnModalOptions(event));
    }

    closeDialogTemplate(){
        this._dialogInfo.dispose();
        this._dialogInfo = null
    }

    disposeAnswer(answer: ButtonInfo, cb){
        if(answer){
            if(answer.role == 'confirm'){
                console.log('confirm callback success!')
            }else if(answer.role == 'cancel'){
                console.log('cancel callback success!');
                if(typeof cb == 'function'){
                    cb.call(this)
                }else{
                    cb.dispose()
                }
            }
        }else{
            if(typeof cb == 'function'){
                cb.call(this)
            }else{
                cb.dispose()
            }
        }
    }

    /*
    * popup user defined template
    * */
    popupTemplate(tp){
        this._templateRef = this._popupService.popup(tp);
    }

    closeTemplate(){
        this._templateRef.dispose();
    }

     _getModalOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
    }

     _getUnModalOptions(event): PopupOptions {
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

