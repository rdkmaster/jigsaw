import {Component, ElementRef, Input, Renderer2} from "@angular/core";

import {PopupService} from "../../service/popup.service";

import {fadeIn} from "../animations/fade-in";
import {bubbleIn} from "../animations/bubble-in";
import {DialogBase} from "../dialog/dialog";

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
export class RdkAlert extends DialogBase {

    constructor(popupService: PopupService,
                renderer: Renderer2,
                elementRef: ElementRef) {
        super();
        this.popupService = popupService;
        this.renderer = renderer;
        this.elementRef = elementRef;
    }

    private _alertClass = {
        'rdk-alert-info': true,
        'rdk-alert-warning': false,
        'rdk-alert-error': false
    };
    private _level: AlertLevel = AlertLevel.info;
    @Input()
    public get level(): AlertLevel | string {
        return this._level;
    }

    public set level(value: AlertLevel | string) {
        switch (value) {
            case "info": this._level = AlertLevel.info; break;
            case "warning": this._level = AlertLevel.warning; break;
            case "error": this._level = AlertLevel.error; break;
            default: typeof value === 'string' ? this._level = AlertLevel.info : this._level = value as AlertLevel;
        }

        this._alertClass = {
            'rdk-alert-info': this._level == AlertLevel.info,
            'rdk-alert-warning': this._level == AlertLevel.warning,
            'rdk-alert-error': this._level == AlertLevel.error
        }
    }

    private _title: string;
    @Input()
    public get title(): string {
        if (!this._title) {
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
        if (!this._icon) {
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
        return this._icon;
    }

    public set icon(value: string) {
        this._icon = value;
    }

    protected getPopupElement(): HTMLElement {
        return this.elementRef.nativeElement.querySelector('.rdk-alert');
    }

    protected init() {
        const iconEl = this.elementRef.nativeElement.querySelector('.rdk-alert-icon');
        this.renderer.addClass(iconEl, this.icon);
        super.init();
    }
}

