import {Component, ElementRef, Input, NgModule, Renderer2, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {AbstractDialogComponentBase, DialogBase, JigsawDialog, JigsawDialogModule} from "../dialog/dialog";
import {JigsawButtonModule} from "../button/button";
import {InternalUtils} from "../../core/utils/internal-utils";
import {TranslateHelper} from "../../core/utils/translate-helper";
import {JigsawMovableModule} from "../../directive/movable/index";

export enum AlertLevel {
    info, warning, error, confirm
}

@Component({
    selector: 'jigsaw-alert',
    templateUrl: 'alert.html',
    host: {
        '[class.jigsaw-alert-host]': 'true'
    }
})
export class JigsawAlert extends AbstractDialogComponentBase {
    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super();
        this.renderer = renderer;
        this.elementRef = elementRef;
    }

    /**
     * @internal
     */
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
        return this.elementRef.nativeElement.parentElement;
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
    public buttons = [{label: 'alert.button.ok'}];
    public level: AlertLevel = AlertLevel.info;

    private _getDefaultTitle(): string {
        switch (this.level) {
            case AlertLevel.warning:
                return 'alert.title.warning';

            case AlertLevel.error:
                return 'alert.title.error';

            case AlertLevel.info:
            default:
                return 'alert.title.info';
        }
    }
}

@Component({
    templateUrl: 'common-alert.html',
    selector: 'jigsaw-info-alert',
    host: {
        '[class.jigsaw-common-alert]': 'true'
    }
})
export class JigsawInfoAlert extends JigsawCommonAlert {
    @ViewChild(JigsawAlert) dialog: JigsawDialog;
    public level: AlertLevel = AlertLevel.info;
    public buttons = [{label: 'alert.button.ok', 'type': 'primary'}];
}

@Component({
    templateUrl: 'common-alert.html',
    selector: 'jigsaw-warning-alert',
    host: {
        '[class.jigsaw-common-alert]': 'true'
    }
})
export class JigsawWarningAlert extends JigsawCommonAlert {
    @ViewChild(JigsawAlert) dialog: JigsawDialog;
    public level: AlertLevel = AlertLevel.warning;
    public buttons = [{label: 'alert.button.ok', 'type': 'warning'}];
}

@Component({
    templateUrl: 'common-alert.html',
    selector: 'jigsaw-error-alert',
    host: {
        '[class.jigsaw-common-alert]': 'true'
    }
})
export class JigsawErrorAlert extends JigsawCommonAlert {
    @ViewChild(JigsawAlert) dialog: JigsawDialog;
    public level: AlertLevel = AlertLevel.error;
    public buttons = [{label: 'alert.button.ok', 'type': 'error'}];
}

@NgModule({
    imports: [JigsawDialogModule, JigsawMovableModule, JigsawButtonModule, CommonModule, TranslateModule.forRoot()],
    declarations: [JigsawAlert, JigsawInfoAlert, JigsawWarningAlert, JigsawErrorAlert],
    exports: [JigsawDialogModule, JigsawMovableModule, JigsawAlert, JigsawInfoAlert, JigsawWarningAlert, JigsawErrorAlert],
    providers: [TranslateService],
    entryComponents: [JigsawInfoAlert, JigsawWarningAlert, JigsawErrorAlert]
})
export class JigsawAlertModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, 'alert', {
            zh: {
                button: {
                    ok: "确定",
                    cancel: "取消",
                    yes: "是",
                    no: "否",
                    abort: "终止",
                    ignore: "忽略",
                    retry: "重试"
                },
                title: {
                    info: "提示",
                    warning: "警告",
                    error: "错误",
                    confirm: "确认"
                }
            },
            en: {
                button: {
                    ok: "OK",
                    cancel: "Cancel",
                    yes: "Yes",
                    no: "No",
                    abort: "Abort",
                    ignore: "Ignore",
                    retry: "Retry"
                },
                title: {
                    info: "Information",
                    warning: "Warning",
                    error: "Error",
                    confirm: "Confirm"
                }
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
        TranslateHelper.languageChangEvent.subscribe(langInfo => {
            translateService.use(langInfo.curLang);
        });
    }
}
