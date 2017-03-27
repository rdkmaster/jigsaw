import {Component, ElementRef, Renderer2} from '@angular/core';

import {PopupService, IPopupable} from '../../../../../../core/service/popup.service';
import {fadeIn} from '../../../../../../component/animations/fadeIn';

@Component({
    templateUrl: 'use-dialog.html',
    styleUrls: ['use-dialog.scss'],
    animations: [
        fadeIn
    ]
})
export class UseDialogComponent implements IPopupable{
    private _initDate: any;
    get initDate(){return this._initDate}
    set initData(newValue: any){
        this._initDate = newValue;
        this.test = newValue.test;
    }
    renderer: Renderer2;
    el: ElementRef;
    cmpType: string = '预编译';

    constructor(private _popupService: PopupService){
    }

    test: () => void;
}

