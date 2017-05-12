import {
    Component, Renderer2, ElementRef, Input, AfterContentInit, OnDestroy, AfterViewInit,
    OnInit
} from '@angular/core';

import {IPopupable, PopupDisposer, PopupOptions, PopupService} from '../../service/popup.service';
import {bubbleIn} from '../animations/bubble-in';

export interface ITooltip extends IPopupable {
    tooltip: RdkTooltip;
}

export abstract class TooltipBase implements ITooltip, AfterViewInit, OnInit {

    public initData: any;

    abstract get tooltip(): RdkTooltip;
    abstract set tooltip(value: RdkTooltip);

    private _disposer: PopupDisposer;

    public get disposer(): PopupDisposer {
        return this._disposer;
    }

    public set disposer(value: PopupDisposer) {
        this._disposer = value;
        if (this.tooltip) {
            this.tooltip.disposer = value;
        }
    }

    private _options: PopupOptions;

    public get options(): PopupOptions {
        return this._options;
    }

    public set options(value: PopupOptions) {
        this._options = value;
        if (this.tooltip) {
            this.tooltip.options = value;
        }
    }

    public dispose(): void {
        if (this.tooltip) {
            this.tooltip.dispose();
        }
    }

    public ngOnInit() {
        if (this.tooltip) {
            this.tooltip.disposer = this.disposer;
            this.tooltip.options = this.options;
        }
    }

    public ngAfterViewInit() {
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
    disposer: PopupDisposer;
    initData: any;
    options: PopupOptions;

    private _state: string = 'active';

    protected popupElement: HTMLElement;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef, private _popupService: PopupService) {
    }

    ngAfterContentInit(){
        this.popupElement = this.getPopupElement();
        let posType: string = PopupService.getPositionType(this.options.posType);
        let position = PopupService.getPositionValue(this.options, this.popupElement);
        this._renderer.setStyle(this.popupElement, 'position', posType);
        this._renderer.setStyle(this.popupElement, 'top', position.top);
        this._renderer.setStyle(this.popupElement, 'left', position.left);
    }

    protected getPopupElement(): HTMLElement {
        return this._elementRef.nativeElement.querySelector('.rdk-tooltip');
    }

    public dispose(){
        this._state = 'void';
    }

    private _animationDone($event){
        if($event.toState == 'void'){
            this.disposer();
        }
    }
}

