import {Component, Renderer2, ElementRef} from '@angular/core';

import {IPopupable} from '../../core/service/popup.service';
import {fadeIn} from '../animations/fade-in';
import {flyIn} from '../animations/fly-in';
import {bubbleIn} from '../animations/bubble-in';

@Component({
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.scss'],
    animations: [
        fadeIn,
        flyIn,
        bubbleIn
    ]
})
export class RdkTooltip implements IPopupable {
    set initData(newValue: any){
        this._message = newValue.message;
    }
    public renderer: Renderer2;
    public el: ElementRef;

    private _message: string;

    constructor(private _renderer: Renderer2, private _el: ElementRef) {
        this.renderer = _renderer;
        this.el = _el;
    }
}

