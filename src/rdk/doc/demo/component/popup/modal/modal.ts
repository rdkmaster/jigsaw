import {Component, ElementRef, Renderer2} from '@angular/core';

import {PopupService, IPopupable} from '../../../../../core/service/popup.service';
import {fadeIn} from '../../../../../component/animations/fadeIn';

@Component({
    templateUrl: 'modal.html',
    styleUrls: ['modal.scss'],
    animations: [
        fadeIn
    ]
})
export class InsertComponent implements IPopupable{
    set initData(newValue: any){

    }
    renderer: Renderer2;
    el: ElementRef;
    cmpType: string = '预编译';

    constructor(private _popupService: PopupService){
    }

    close(){
        this._popupService.close();
    }
}

