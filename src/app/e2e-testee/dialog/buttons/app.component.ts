/**
 * Created by 10177553 on 2017/4/13.
 */

import {
    Component, TemplateRef, ViewEncapsulation,
    Renderer2, ViewContainerRef
} from '@angular/core';
import {ButtonInfo, PopupDisposer, PopupInfo, PopupService} from "jigsaw/service/popup.service";

@Component({
    templateUrl: './app.component.html',
    styleUrls :['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogButtonsDemo  {

     _dialogInfo: PopupInfo;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2,
                private popupService : PopupService){
    }

    buttons: Array<ButtonInfo> = [
        {
            label: 'confirm',
            clazz: "red"
        },{
            label: 'ok',
            clazz: ""
        },
        {
            label: 'cancel',
            clazz: ""
        }
    ];

    message:String;
    showInfo(buttonInfo:ButtonInfo) {
        if(buttonInfo){
            this.message = `${buttonInfo.label} button clicked!`;
        }else{
            this.message = `dialog close bar clicked!`;
        }
        this._dialogInfo.dispose();
    }

    popupDialog1(ele:TemplateRef<any>){
        this._dialogInfo = this.popupService.popup(ele);
    }


}
