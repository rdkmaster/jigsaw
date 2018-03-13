import {
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    Output,
    QueryList,
    Renderer2,
    Type,
    ViewChild,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {
    AbstractDialogComponentBase,
    DialogBase,
    DialogCallback,
    JigsawDialog,
    JigsawDialogModule
} from "../dialog/dialog";
import {JigsawButton, JigsawButtonModule} from "../button/button";
import {InternalUtils} from "../../core/utils/internal-utils";
import {TranslateHelper} from "../../core/utils/translate-helper";
import {JigsawMovableModule} from "../../directive/movable/index";
import {ButtonInfo, PopupEffect, PopupInfo, PopupOptions, PopupService} from "../../service/popup.service";
import {CommonUtils} from "../../core/utils/common-utils";
import {JigsawBlock} from "../block/block";

export enum AlertLevel {
    info, warning, error, confirm
}

@Component({
    selector: 'jigsaw-alert, j-alert',
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

    @Output()
    public close: EventEmitter<any> = new EventEmitter<any>();

    /**
     * @internal
     */
    @ContentChildren(JigsawButton)
    public _$inlineButtons: QueryList<JigsawButton>;

    /**
     * @internal
     */
    public _$alertClass = {
        'jigsaw-alert-info': true,
        'jigsaw-alert-warning': false,
        'jigsaw-alert-error': false,
        'jigsaw-alert-confirm': false
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

            case AlertLevel.confirm:
            case "confirm":
                this._level = AlertLevel.confirm;
                break;

            case AlertLevel.info:
            case "info":
            default:
                this._level = AlertLevel.info;
        }

        this._$alertClass = {
            'jigsaw-alert-info': this._level == AlertLevel.info,
            'jigsaw-alert-warning': this._level == AlertLevel.warning,
            'jigsaw-alert-error': this._level == AlertLevel.error,
            'jigsaw-alert-confirm': this._level == AlertLevel.confirm
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
                case AlertLevel.confirm:
                    this._icon = "fa-question";
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
        this.caption = value.title ? value.title : this._getDefaultTitle();
        this.buttons = value.buttons ? value.buttons : this.buttons;
    }

    public abstract get dialog(): JigsawDialog;
    public abstract set dialog(value: JigsawDialog);

    public message: string;
    public buttons: ButtonInfo[] = [{label: 'alert.button.ok'}];
    public level: AlertLevel = AlertLevel.info;

    public static showAlert(what: Type<JigsawCommonAlert>,
                            message: string,
                            callback?: DialogCallback,
                            buttons?: ButtonInfo[],
                            caption?: string,
                            modal: boolean = true,
                            popupOptions?: PopupOptions): PopupInfo {
        const po = popupOptions ? popupOptions : {
            modal: modal, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
        const popupInfo = PopupService.instance.popup(what, po,
            {message: message, title: caption, buttons: buttons});
        popupInfo.answer.subscribe(answer => {
            CommonUtils.safeInvokeCallback(null, callback, [answer]);
            popupInfo.answer.unsubscribe();
            popupInfo.dispose();
        });
        return popupInfo;
    }

    private _getDefaultTitle(): string {
        switch (this.level) {
            case AlertLevel.warning:
                return 'alert.title.warning';

            case AlertLevel.error:
                return 'alert.title.error';

            case AlertLevel.confirm:
                return 'alert.title.confirm';

            case AlertLevel.info:
            default:
                return 'alert.title.info';
        }
    }

    constructor(protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super();
        this._renderer.addClass(this._elementRef.nativeElement, 'jigsaw-common-alert');
    }
}

@Component({
    templateUrl: 'common-alert.html',
    selector: 'jigsaw-info-alert, j-info-alert'
})
export class JigsawInfoAlert extends JigsawCommonAlert {
    constructor(protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super(_renderer, _elementRef);
    }

    @ViewChild(JigsawAlert) dialog: JigsawDialog;
    @Input() public message: string;
    @Input() public caption: string;
    @Input() public level: AlertLevel = AlertLevel.info;
    @Input() public buttons: ButtonInfo[] = [{label: 'alert.button.ok', 'type': 'primary'}];

    public static show(message: string,
                       callback?: DialogCallback,
                       buttons?: ButtonInfo[],
                       caption?: string,
                       modal: boolean = true,
                       popupOptions?: PopupOptions): PopupInfo {
        return JigsawCommonAlert.showAlert(JigsawInfoAlert, message, callback, buttons, caption, modal, popupOptions);
    }
}

@Component({
    templateUrl: 'common-alert.html',
    selector: 'jigsaw-warning-alert, j-warning-alert'
})
export class JigsawWarningAlert extends JigsawCommonAlert {
    constructor(protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super(_renderer, _elementRef);
    }

    @ViewChild(JigsawAlert) dialog: JigsawDialog;
    @Input() public message: string;
    @Input() public caption: string;
    @Input() public level: AlertLevel = AlertLevel.warning;
    @Input() public buttons: ButtonInfo[] = [{label: 'alert.button.ok', 'type': 'warning'}];

    public static show(message: string,
                       callback?: DialogCallback,
                       buttons?: ButtonInfo[],
                       caption?: string,
                       modal: boolean = true,
                       popupOptions?: PopupOptions): PopupInfo {
        return JigsawCommonAlert.showAlert(JigsawWarningAlert, message, callback, buttons, caption, modal, popupOptions);
    }
}

@Component({
    templateUrl: 'common-alert.html',
    selector: 'jigsaw-error-alert, j-error-alert',
})
export class JigsawErrorAlert extends JigsawCommonAlert {
    constructor(protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super(_renderer, _elementRef);
    }

    @ViewChild(JigsawAlert) dialog: JigsawDialog;
    @Input() public message: string;
    @Input() public caption: string;
    @Input() public level: AlertLevel = AlertLevel.error;
    @Input() public buttons: ButtonInfo[] = [{label: 'alert.button.ok', 'type': 'error'}];

    public static show(message: string,
                       callback?: DialogCallback,
                       buttons?: ButtonInfo[],
                       caption?: string,
                       modal: boolean = true,
                       popupOptions?: PopupOptions): PopupInfo {
        return JigsawCommonAlert.showAlert(JigsawErrorAlert, message, callback, buttons, caption, modal, popupOptions);
    }
}

@Component({
    templateUrl: 'common-alert.html',
    selector: 'jigsaw-confirm-alert, j-confirm-alert'
})
export class JigsawConfirmAlert extends JigsawCommonAlert {
    constructor(protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super(_renderer, _elementRef);
    }

    @ViewChild(JigsawAlert) dialog: JigsawDialog;
    @Input() public message: string;
    @Input() public caption: string;
    @Input() public level: AlertLevel = AlertLevel.confirm;
    @Input() public buttons: ButtonInfo[] = [{label: 'alert.button.yes', 'type': 'primary'}, {label: 'alert.button.no'}];

    public static show(message: string,
                       callback?: DialogCallback,
                       buttons?: ButtonInfo[],
                       caption?: string,
                       modal: boolean = true,
                       popupOptions?: PopupOptions): PopupInfo {
        return JigsawCommonAlert.showAlert(JigsawConfirmAlert, message, callback, buttons, caption, modal, popupOptions);
    }
}

@NgModule({
    imports: [JigsawDialogModule, JigsawMovableModule, JigsawButtonModule, CommonModule, TranslateModule.forRoot()],
    declarations: [JigsawAlert, JigsawInfoAlert, JigsawWarningAlert, JigsawErrorAlert, JigsawConfirmAlert],
    exports: [
        JigsawDialogModule, JigsawMovableModule, JigsawAlert, JigsawInfoAlert, JigsawWarningAlert,
        JigsawErrorAlert, JigsawConfirmAlert
    ],
    providers: [TranslateService],
    entryComponents: [JigsawInfoAlert, JigsawWarningAlert, JigsawErrorAlert, JigsawBlock]
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
