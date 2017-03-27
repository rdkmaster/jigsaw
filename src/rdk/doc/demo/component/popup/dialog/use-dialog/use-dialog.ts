import {Component, ElementRef, Renderer2} from '@angular/core';

import {PopupService, IPopupable} from '../../../../../../core/service/popup.service';
import {fadeIn} from '../../../../../../component/animations/fadeIn';

@Component({
    templateUrl: 'use-dialog.html',
    animations: [
        fadeIn
    ]
})
export class Dialog1Component implements IPopupable{
    set initData(newValue: any){
        this.test = newValue.test;
    }
    renderer: Renderer2;
    el: ElementRef;
    cmpType: string = '预编译';

    constructor(private _popupService: PopupService){
    }

    test: () => void;
}

