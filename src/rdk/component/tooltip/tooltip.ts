import {Component, Renderer2, ElementRef, Input, AfterContentInit, OnDestroy} from '@angular/core';

import {IPopupable, PopupOptions, PopupService} from '../../service/popup.service';
import {bubbleIn} from '../animations/bubble-in';

@Component({
    selector: 'rdk-tooltip',
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.scss'],
    animations: [
        bubbleIn
    ]
})
export class RdkTooltip implements IPopupable, AfterContentInit {
    disposer: () => void;
    options: PopupOptions;

    private _state: string = 'active';

    @Input()
    public popupId: number;

    @Input()
    set initData(newValue: any){

    }

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef, private _popupService: PopupService) {
    }

    ngAfterContentInit(){
        // this._popupService.setPopupPos(this.popupId, this._renderer, this._elementRef.nativeElement);
    }

    public close(){
        this._state = 'void';
    }

    private _animationDone($event){
        if($event.toState == 'void'){
            // this._popupService.removePopup(this.popupId);
        }
    }
}

