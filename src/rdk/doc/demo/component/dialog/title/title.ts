/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef} from '@angular/core';
import {PopupDisposer, PopupService} from "../../../../../service/popup.service";

@Component({
    templateUrl: 'title.html',
})
export class DialogTitleDemo  {

    private _disposer : PopupDisposer;

    private _disposer2 : PopupDisposer;

    constructor(private popupService : PopupService){

    }

    popupDialog1(ele:TemplateRef<any>){
        this._disposer = this.popupService.popup(ele);
    }

    popupDialog2(ele:TemplateRef<any>){
        this._disposer2 = this.popupService.popup(ele);
    }

}
