import {
    Component, Renderer2, ElementRef,
    Input, OnDestroy, AfterContentInit,
    EventEmitter, Output
} from '@angular/core';

import {
    PopupService, PopupOptions,
    IDialog, ButtonInfo
} from '../../service/popup.service';

import {fadeIn} from '../animations/fade-in';
import {bubbleIn} from '../animations/bubble-in';
import {AbstractRDKComponent} from '../core';

export enum AlertLevel {
    info, warning, error
}

@Component({
    selector: 'rdk-alert',
    templateUrl: 'alert.html',
    styleUrls: ['alert.scss'],
    animations: [
        fadeIn,
        bubbleIn
    ]
})
export class RdkAlert extends AbstractRDKComponent implements IDialog, AfterContentInit, OnDestroy {

    constructor(private _popupService: PopupService,
                private _renderer: Renderer2,
                private _elementRef: ElementRef) {
        super();
    }

    private _level: AlertLevel;
    @Input()
    public get level(): AlertLevel {
        return this._level;
    }

    public set level(value: AlertLevel) {
        this._level = value;
        this._setAlertClass(this._level);
    }

    private _title: string;
    @Input()
    public get title(): string {
        if (this._title === undefined || this._title == null) {
            switch (this._level) {
                case AlertLevel.info:
                    //TODO 需要考虑国际化
                    this._title = "Information";
                    break;
                case AlertLevel.warning:
                    //TODO 需要考虑国际化
                    this._title = "Warning";
                    break;
                case AlertLevel.error:
                    //TODO 需要考虑国际化
                    this._title = "Error";
                    break;
                default:
                    //TODO 需要考虑国际化
                    this._title = "Information";
                    break;
            }
        }
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }

    private _icon: string;
    @Input()
    public get icon(): string {
        return this._icon;
    }

    public set icon(value: string) {
        this._icon = value;
    }

    private _topPlace: string;
    @Input()
    public get topPlace(): string {
        return this._topPlace
    }

    public set topPlace(newValue: string) {
        const match = newValue ? newValue.match(/^\s*\d+%|px\s*$/) : null;
        this._topPlace = match ? newValue : newValue + 'px';
    }

    @Input()
    public popupId: number;

    @Input()
    public buttonClass:string;

    @Input() buttons: Array<ButtonInfo>=[];
    @Output()
    public closeCallFunc: EventEmitter<any> = new EventEmitter<any>();

    private _popupEl: HTMLElement;
    private _iconEl: HTMLElement;
    private _iconButton: HTMLElement;
    private _windowResize: Function;
    private _options: PopupOptions;
    private _state: string = 'active';

    public initData: any;

    public close() {
        this._state = 'void';
        this.closeCallFunc.emit();
    }

    private getDefaultIcon() {
        if (this._icon === undefined || this._icon == null) {
            switch (this._level) {
                case AlertLevel.info:
                    this._icon = "fa-info-circle";
                    break;
                case AlertLevel.warning:
                    this._icon = "fa-info-circle";
                    break;
                case AlertLevel.error:
                    this._icon = "fa-times-circle";
                    break;
                default:
                    this._icon = "fa-check-circle";
                    break;
            }
        }
    }

    private _init() {
        this._iconEl = this._elementRef.nativeElement.querySelector('.rdk-alert-icon');
        this.getDefaultIcon();
        this._icon && this._renderer.addClass(this._iconEl, this._icon);

        this._popupEl = this._elementRef.nativeElement.querySelector('.rdk-alert');
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

    private _animationDone($event) {
        if ($event.toState == 'void') {
            this._popupService.removePopup(this.popupId);
        }
    }

    private _alertClass: {};

    private _setAlertClass(value: AlertLevel) {

        this._alertClass = {
            'rdk-alert-info': value == AlertLevel.info ? true : false,
            'rdk-alert-warning': value == AlertLevel.warning ? true : false,
            'rdk-alert-error': value == AlertLevel.error ? true : false
        }
    }

    ngAfterContentInit() {
        this._init();
    }

    ngOnDestroy() {
        //销毁resize事件
        this._windowResize();
    }
}

