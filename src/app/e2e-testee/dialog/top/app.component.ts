/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, TemplateRef, Renderer2, ViewContainerRef} from "@angular/core";
import {PopupInfo, PopupService} from "jigsaw/service/popup.service";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class DialogTopDemo  {
    message: string;
     _dialogInfo: PopupInfo;

     top = "20%";

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2,
                private popupService : PopupService){
    }

    close() {
        this._dialogInfo.dispose();
    }

    popupDialog1(ele:TemplateRef<any>){
        this._dialogInfo = this.popupService.popup(ele);
    }
}
