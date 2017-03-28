import {Component, Renderer2, ElementRef} from '@angular/core';

import {IPopupable} from '../../core/service/popup.service';
import {fadeIn} from '../animations/fadeIn';
import {flyIn} from '../animations/fly-in';

@Component({
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.scss'],
    animations: [
        fadeIn
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

