import {Component, ElementRef, Input, NgModule, Renderer2, ViewChild} from "@angular/core";
import {AbstractDialogComponentBase, DialogBase, JigsawDialog, JigsawDialogModule} from "../dialog/dialog";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "../button/button";
import {JigsawDraggableModule} from "../draggable/draggable";
import {SharedModule} from "../../core/shared/shared.module";
import {TranslateService} from "@ngx-translate/core";
export enum AlertLevel {
    info, warning, error, confirm
}

@Component({
    selector: 'jigsaw-alert',
    templateUrl: 'alert.html',
    styleUrls: ['alert.scss']
})
export class JigsawAlert extends AbstractDialogComponentBase {
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

    public _$alertClass = {
        'jigsaw-alert-info': true,
        'jigsaw-alert-warning': false,
        'jigsaw-alert-error': false
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

        this._$alertClass = {
            'jigsaw-alert-info': this._level == AlertLevel.info,
            'jigsaw-alert-warning': this._level == AlertLevel.warning,
            'jigsaw-alert-error': this._level == AlertLevel.error
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
        const iconEl = this.elementRef.nativeElement.querySelector('.jigsaw-alert-icon');
        this.renderer.addClass(iconEl, this.icon);
        super.init();
    }
}

export abstract class JigsawCommonAlert extends DialogBase {
    @Input()
    public set initData(value: any) {
        if (!value) {
            return;
        }
        this.message = value.message ? value.message : 'the "message" property in the initData goes here.';
        this.title = value.title ? value.title : this._getDefaultTitle();
    }

    public abstract get dialog(): JigsawDialog;
    public abstract set dialog(value: JigsawDialog);

    public message: string;
    public buttons = [{label: JigsawAlert.OK_LABEL}];
    public level: AlertLevel = AlertLevel.info;

    private _getDefaultTitle(): string {
        switch (this.level) {
            case AlertLevel.warning:
                return JigsawAlert.WARNING_TITLE;

            case AlertLevel.error:
                return JigsawAlert.ERROR_TITLE;

            case AlertLevel.info:
            default:
                return JigsawAlert.INFO_TITLE;
        }
    }

}

@Component({
    templateUrl: 'common-alert.html',
    styleUrls: ['common-alert.scss'],
    selector: 'jigsaw-info-alert',
})
export class JigsawInfoAlert extends JigsawCommonAlert {
    @ViewChild(JigsawAlert) dialog: JigsawDialog;
    public level: AlertLevel = AlertLevel.info;
}

@Component({
    templateUrl: 'common-alert.html',
    styleUrls: ['common-alert.scss'],
    selector: 'jigsaw-warning-alert',
})
export class JigsawWarningAlert extends JigsawCommonAlert {
    @ViewChild(JigsawAlert) dialog: JigsawDialog;
    public level: AlertLevel = AlertLevel.warning;
}

@Component({
    templateUrl: 'common-alert.html',
    styleUrls: ['common-alert.scss'],
    selector: 'jigsaw-error-alert',
})
export class JigsawErrorAlert extends JigsawCommonAlert {
    @ViewChild(JigsawAlert) dialog: JigsawDialog;
    public level: AlertLevel = AlertLevel.error;
}

@NgModule({
    imports: [JigsawDialogModule, JigsawDraggableModule, JigsawButtonModule, CommonModule, SharedModule],
    declarations: [JigsawAlert, JigsawInfoAlert, JigsawWarningAlert, JigsawErrorAlert],
    exports: [JigsawDialogModule, JigsawDraggableModule, JigsawAlert, JigsawInfoAlert, JigsawWarningAlert, JigsawErrorAlert],
    providers: [TranslateService],
    entryComponents: [JigsawInfoAlert, JigsawWarningAlert, JigsawErrorAlert]
})
export class JigsawAlertModule {
}
