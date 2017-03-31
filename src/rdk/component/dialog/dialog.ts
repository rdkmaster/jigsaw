import {Component, Renderer2, ElementRef, Input, OnDestroy, AfterContentInit} from '@angular/core';

import {PopupService, PopupOptions, IDialog, ButtonOptions} from '../../core/service/popup.service';

import {fadeIn} from '../animations/fade-in';
import {bubbleIn} from '../animations/bubble-in';
import {AbstractRDKComponent} from "../../core/api/component-api";

@Component({
    selector: 'rdk-dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss'],
    animations: [
        fadeIn,
        bubbleIn
    ]
})
export class RdkDialog extends AbstractRDKComponent implements IDialog, AfterContentInit, OnDestroy {
    @Input()
    public popupId: number;

    private _topPlace: string;
    private _popupEl: HTMLElement;
    private _windowResize: Function;
    private _options: PopupOptions;

    public initData: any;

    @Input()
    public title: string;

    //设置距离顶部高度
    @Input()
    public get topPlace(): string {
        return this._topPlace
    }

    public set topPlace(newValue: string) {
        const match = newValue ? newValue.match(/^\s*\d+%|px\s*$/) : null;
        this._topPlace = match ? newValue : newValue + 'px';
    }

    @Input() buttons: Array<ButtonOptions>;

    constructor(private _popupService: PopupService,
                private _renderer: Renderer2,
                private _elementRef: ElementRef) {
        super();
    }

    close() {
        this._popupService.removePopup(this.popupId);
    }

    private _init() {
        this._popupEl = this._elementRef.nativeElement.querySelector('.rdk-dialog');

        //设置弹框宽度
        this.width && this._renderer.setStyle(this._popupEl, 'width', this.width);

        this._options = this._popupService.getOptions(this.popupId);

        if (this._options && !this._options.modal) {
            this._popupService.setPopupPos(this.popupId, this._renderer, this._popupEl);
        } else {
            //设置默认位置
            this._setDefaultPosition();
        }

        this._resetPosition();
    }

    private _setDefaultPosition(): void {
        //弹框居中
        this._renderer.setStyle(this._popupEl, 'left', (window.innerWidth / 2 - this._popupEl.offsetWidth / 2) + 'px');
        if (this.topPlace) {
            //居上显示
            this._renderer.setStyle(this._popupEl, 'top', this.topPlace);
        } else {
            //居中显示
            this._renderer.setStyle(this._popupEl, 'top', (window.innerHeight / 2 - this._popupEl.offsetHeight / 2) + 'px');
        }
    }

    private _resetPosition() {
        //resize居中
        this._windowResize = this._renderer.listen('window', 'resize', () => {
            this._renderer.setStyle(this._popupEl, 'left', (window.innerWidth / 2 - this._popupEl.offsetWidth / 2) + 'px');
            !this.topPlace && this._renderer.setStyle(this._popupEl, 'top', (window.innerHeight / 2 - this._popupEl.offsetHeight / 2) + 'px');
        })
    }

    ngAfterContentInit() {
        this._init();
    }

    ngOnDestroy() {
        //销毁resize事件
        this._windowResize();
    }
}

