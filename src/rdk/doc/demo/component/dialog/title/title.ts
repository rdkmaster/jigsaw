/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef} from '@angular/core';
import {PopupDisposer, PopupInfo, PopupService} from "../../../../../service/popup.service";

@Component({
    templateUrl: 'title.html',
})
export class DialogTitleDemo  {

    private _dialogInfo: PopupInfo;
    private _dialogDisposer: PopupDisposer;

    private _dialogInfo1: PopupInfo;
    private _dialogDisposer1: PopupDisposer;

    constructor(private popupService : PopupService){

    }

    popupDialog1(ele:TemplateRef<any>){
       this._dialogInfo = this.popupService.popup(ele);
       this._dialogDisposer = () => this._dialogInfo.dispose();
    }

    popupDialog2(ele:TemplateRef<any>){
        this._dialogInfo1 = this.popupService.popup(ele);
        this._dialogDisposer1 = () => this._dialogInfo1.dispose();
    }

}
