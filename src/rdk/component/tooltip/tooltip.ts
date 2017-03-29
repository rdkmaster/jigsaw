import {Component, Renderer2, ElementRef, OnInit, Input} from '@angular/core';

import {IPopupable, PopupOptions, PopupService} from '../../core/service/popup.service';
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
export class RdkTooltip implements IPopupable, OnInit {
    @Input()
    public id: number;


    @Input()
    public options: PopupOptions;

    @Input()
    set initData(newValue: any){

    }

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef, private _popupservice: PopupService) {

    }

    ngOnInit(): void {
        if (this.options && !this.options.modal) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'position', this._popupservice.getPosType(this.options.posType));
            this._renderer.setStyle(this._elementRef.nativeElement, 'top', this._popupservice.getPosition(this.options).top);
            this._renderer.setStyle(this._elementRef.nativeElement, 'left', this._popupservice.getPosition(this.options).left);
        }

    }
}

