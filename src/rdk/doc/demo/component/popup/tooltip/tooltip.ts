import {Component, Renderer2, ElementRef} from '@angular/core';

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
    public renderer: Renderer2;
    public el: ElementRef;

    message: string = 'This is message!';

    constructor(private _renderer: Renderer2, private _el: ElementRef) {
        this.renderer = _renderer;
        this.el = _el;
    }
}

