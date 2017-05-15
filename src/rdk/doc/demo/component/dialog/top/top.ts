/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ButtonInfo, PopupDisposer, PopupService} from "../../../../../service/popup.service";

@Component({
    templateUrl: 'top.html'
})
export class DialogTopDemo  {

    public _disposer : PopupDisposer;

    constructor(private popupService : PopupService){

    }

    popupDialog1(ele:TemplateRef<any>){
        this._disposer = this.popupService.popup(ele);
    }

    closeTemplate(event){
        console.log(event);
    }


}
