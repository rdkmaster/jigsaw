import {
    Component, Renderer2, ElementRef, Input, AfterContentInit, OnDestroy, AfterViewInit,
    OnInit, EventEmitter, Output, NgModule
} from '@angular/core';

import {IPopupable, PopupDisposer, PopupOptions, PopupService} from '../../service/popup.service';
import {bubbleIn} from '../animations/bubble-in';
import {CommonModule} from "@angular/common";

export interface ITooltip extends IPopupable {
    tooltip: RdkTooltip;
}

export abstract class TooltipBase implements ITooltip {

    public initData: any;

    @Output()
    public close: EventEmitter<any> = new EventEmitter<any>();

    abstract get tooltip(): RdkTooltip;
    abstract set tooltip(value: RdkTooltip);

    public dispose(): void {
        if (this.tooltip) {
            this.tooltip.dispose();
        }
    }

}

@Component({
    selector: 'rdk-tooltip',
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.scss'],
    animations: [
        bubbleIn
    ]
})
export class RdkTooltip implements IPopupable, AfterContentInit {
    public initData: any;
    @Output()
    public close: EventEmitter<any> = new EventEmitter<any>();

    protected popupElement: HTMLElement;

    constructor(private _elementRef: ElementRef) {
    }

    ngAfterContentInit() {
        this.popupElement = this.getPopupElement();
    }

    protected getPopupElement(): HTMLElement {
        return this._elementRef.nativeElement.querySelector('.rdk-tooltip');
    }

    public dispose() {
        this.close.emit();
    }

}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkTooltip],
    exports: [RdkTooltip]
})
export class RdkTooltipModule {

}
