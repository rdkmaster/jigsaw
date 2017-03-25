import {Component, ElementRef, Renderer} from '@angular/core';

import {PopupService, IPopupable} from '../../../../../core/service/popup.service';
import {fadeIn} from '../../../../../component/animations/fadeIn';


@Component({
    templateUrl: 'insert.html',
    styleUrls: ['insert.scss'],
    animations: [
        fadeIn
    ]
})
export class InsertComponent implements IPopupable{
    renderer: Renderer;
    el: ElementRef;
    cmpType: string = '预编译';

    constructor(private _popupService: PopupService){
    }

    close(){
        this._popupService.close();
    }
}

