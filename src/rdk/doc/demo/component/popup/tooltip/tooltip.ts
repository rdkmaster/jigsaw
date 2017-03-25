import {Component, Renderer, ElementRef} from '@angular/core';

import {PopupService, IPopupable} from '../../../../../core/service/popup.service';
import {fadeIn} from '../../../../../component/animations/fadeIn';

@Component({
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.scss'],
    animations: [
        fadeIn
    ]
})
export class RdkToolTip implements IPopupable {
    public renderer: Renderer;
    public el: ElementRef;

    message: string = 'This is message!';

    constructor(private _popupService: PopupService, private _renderer: Renderer, private _el: ElementRef) {
        this.renderer = _renderer;
        this.el = _el;
    }

    close() {
        this._popupService.close();
    }
}

