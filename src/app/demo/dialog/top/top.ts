/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef} from "@angular/core";
import {PopupInfo, PopupService} from "jigsaw/service/popup.service";

@Component({
    templateUrl: 'top.html',
    styleUrls: ['top.scss']
})
export class DialogTopDemo  {
    message: string;
     _dialogInfo: PopupInfo;

     top = "20%";

    constructor(private popupService : PopupService){
    }

    close() {
        this._dialogInfo.dispose();
    }

    popupDialog1(ele:TemplateRef<any>){
        this._dialogInfo = this.popupService.popup(ele);
    }
}
