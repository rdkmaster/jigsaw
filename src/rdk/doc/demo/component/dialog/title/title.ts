/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef} from '@angular/core';
import {PopupDisposer, PopupRef, PopupService} from "../../../../../service/popup.service";

@Component({
    templateUrl: 'title.html',
})
export class DialogTitleDemo  {

    private _dialogRef: PopupRef;
    private _dialogDisposer: PopupDisposer;

    private _dialogRef1: PopupRef;
    private _dialogDisposer1: PopupDisposer;

    constructor(private popupService : PopupService){

    }

    popupDialog1(ele:TemplateRef<any>){
       this._dialogRef = this.popupService.popup(ele);
       this._dialogDisposer = () => this._dialogRef.destroy();
    }

    popupDialog2(ele:TemplateRef<any>){
        this._dialogRef1 = this.popupService.popup(ele);
        this._dialogDisposer1 = () => this._dialogRef1.destroy();
    }

}
