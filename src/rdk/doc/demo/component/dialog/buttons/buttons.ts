/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ButtonInfo, PopupDisposer, PopupInfo, PopupService} from "../../../../../service/popup.service";

@Component({
    templateUrl: 'buttons.html',
    styleUrls :['buttons.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogButtonsDemo  {

    private _dialogInfo: PopupInfo;
    private _dialogDisposer: PopupDisposer;

    constructor(private popupService : PopupService){

    }

    private buttons: Array<ButtonInfo> = [
        {
            label: 'confirm',
            callback: () => {
                this.showInfo();
            },
            clazz: "red"
        },{
            label: 'ok',
            callback: () => {
                console.log('ok callback success!')
            },
            clazz: ""
        },
        {
            label: 'cancel',
            callback: () => {

            },
            clazz: ""
        }
    ];

    message:String;
    showInfo(){
        this.message = "confirm callback";
    }

    popupDialog1(ele:TemplateRef<any>){
        this._dialogInfo = this.popupService.popup(ele);
        this._dialogDisposer = () => this._dialogInfo.dispose();
    }


}
