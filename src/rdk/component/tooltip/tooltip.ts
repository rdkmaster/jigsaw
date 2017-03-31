import {Component, Renderer2, ElementRef, Input, AfterContentInit} from '@angular/core';

import {IPopupable, PopupService} from '../../core/service/popup.service';
import {fadeIn} from '../animations/fade-in';
import {flyIn} from '../animations/fly-in';
import {bubbleIn} from '../animations/bubble-in';

@Component({
    selector: 'rdk-tooltip',
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.scss'],
    animations: [
        fadeIn,
        flyIn,
        bubbleIn
    ]
})
export class RdkTooltip implements IPopupable, AfterContentInit {
    @Input()
    public popupId: number;

    @Input()
    set initData(newValue: any){

    }

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef, private _popupService: PopupService) {

    }

    ngAfterContentInit(){
        this._popupService.setPopupPos(this.popupId, this._renderer, this._elementRef.nativeElement);
    }
}

