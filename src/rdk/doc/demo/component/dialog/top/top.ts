/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ButtonInfo, PopupDisposer, PopupRef, PopupService} from "../../../../../service/popup.service";

@Component({
    templateUrl: 'top.html'
})
export class DialogTopDemo  {

    private _dialogRef: PopupRef;
    private _dialogDisposer: PopupDisposer;

    private top = "20%";

    constructor(private popupService : PopupService){

    }

    popupDialog1(ele:TemplateRef<any>){
        this._dialogRef = this.popupService.popup(ele);
        this._dialogDisposer = ()=> this._dialogRef.destroy();
    }

    closeTemplate(event){
        console.log(event);
    }


}
