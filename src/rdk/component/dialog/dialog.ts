import {Component, Renderer2, ElementRef, Input} from '@angular/core';

import {PopupService, IPopupable} from '../../core/service/popup.service';

@Component({
    selector: 'rdk-dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss']
})
export class RdkDialog implements IPopupable{
    @Input()
    set initData(newValue: any){
        this.test = newValue.test;
    }
    renderer: Renderer2;
    el: ElementRef;
    cmpType: string = '预编译';

    constructor(private _popupService: PopupService){
    }

    close(){
        this._popupService.close();
    }

    test: () => void;
}

