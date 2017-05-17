import {Component, ElementRef, Input, NgModule, Renderer2, ViewChild} from "@angular/core";
import {AbstractDialogComponentBase, DialogBase, RdkDialog, RdkDialogModule} from "../dialog/dialog";
import {CommonModule} from "@angular/common";
import {RdkButtonModule} from "../button/button";
import {RdkDraggableModule} from "../draggable/draggable";
import {SharedModule} from "../../core/shared/shared.module";
import {TranslateService} from "@ngx-translate/core";
export enum AlertLevel {
    info, warning, error, confirm
}

@Component({
    selector: 'rdk-alert',
    templateUrl: 'alert.html',
    styleUrls: ['alert.scss']
})
export class RdkAlert extends AbstractDialogComponentBase {
    //TODO label需要国际化
    public static OK_LABEL: string = 'OK';
    public static CANCEL_LABEL: string = 'Cancel';
    public static YES_LABEL: string = 'Yes';
    public static NO_LABEL: string = 'No';
    public static ABORT_LABEL: string = 'Abort';
    public static IGNORE_LABEL: string = 'Ignore';
    public static RETRY_LABEL: string = 'Retry';

    public static INFO_TITLE: string = 'Information';
    public static WARNING_TITLE: string = 'Warning';
    public static ERROR_TITLE: string = 'Error';
    public static CONFIRM_TITLE: string = 'Confirm';

    constructor(renderer: Renderer2,
                elementRef: ElementRef) {
        super();
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
            case AlertLevel.warning:
            case "warning":
                this._level = AlertLevel.warning;
                break;

            case AlertLevel.error:
            case "error":
                this._level = AlertLevel.error;
                break;

            case AlertLevel.info:
            case "info":
            default:
                this._level = AlertLevel.info;
        }

        this._alertClass = {
            'rdk-alert-info': this._level == AlertLevel.info,
            'rdk-alert-warning': this._level == AlertLevel.warning,
            'rdk-alert-error': this._level == AlertLevel.error
        }
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
        return this.elementRef.nativeElement;
    }

    protected init() {
        const iconEl = this.elementRef.nativeElement.querySelector('.rdk-alert-icon');
        this.renderer.addClass(iconEl, this.icon);
        super.init();
    }
}

abstract class RdkCommonAlert extends DialogBase {
    @Input()
    public set initData(value: any) {
        if (!value) {
            return;
        }
        this.message = value.message ? value.message : 'the "message" property in the initData goes here.';
        this.title = value.title ? value.title : this._getDefaultTitle();
    }

    public abstract get dialog(): RdkDialog;
    public abstract set dialog(value: RdkDialog);

    public message: string;
    public buttons = [{label: RdkAlert.OK_LABEL}];
    public level: AlertLevel = AlertLevel.info;

    private _getDefaultTitle(): string {
        switch (this.level) {
            case AlertLevel.warning:
                return RdkAlert.WARNING_TITLE;

            case AlertLevel.error:
                return RdkAlert.ERROR_TITLE;

            case AlertLevel.info:
            default:
                return RdkAlert.INFO_TITLE;
        }
    }

}

@Component({
    templateUrl: 'common-alert.html',
    styleUrls: ['common-alert.scss'],
    selector: 'rdk-info-alert',
})
export class RdkInfoAlert extends RdkCommonAlert {
    @ViewChild(RdkAlert) dialog: RdkDialog;
    public level: AlertLevel = AlertLevel.info;
}

@Component({
    templateUrl: 'common-alert.html',
    styleUrls: ['common-alert.scss'],
    selector: 'rdk-warning-alert',
})
export class RdkWarningAlert extends RdkCommonAlert {
    @ViewChild(RdkAlert) dialog: RdkDialog;
    public level: AlertLevel = AlertLevel.warning;
}

@Component({
    templateUrl: 'common-alert.html',
    styleUrls: ['common-alert.scss'],
    selector: 'rdk-error-alert',
})
export class RdkErrorAlert extends RdkCommonAlert {
    @ViewChild(RdkAlert) dialog: RdkDialog;
    public level: AlertLevel = AlertLevel.error;
}

@NgModule({
    imports: [RdkDialogModule, RdkDraggableModule, RdkButtonModule, CommonModule, SharedModule],
    declarations: [RdkAlert, RdkInfoAlert, RdkWarningAlert, RdkErrorAlert],
    exports: [RdkDialogModule, RdkDraggableModule, RdkAlert, RdkInfoAlert, RdkWarningAlert, RdkErrorAlert],
    providers: [TranslateService]
})
export class RdkAlertModule {
}
