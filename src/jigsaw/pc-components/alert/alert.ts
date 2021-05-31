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
    Directive,
    NgZone,
    ChangeDetectionStrategy,
    Injector
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
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {TranslateHelper} from "../../common/core/utils/translate-helper";
import {JigsawMovableModule} from "../../common/directive/movable/index";
import {ButtonInfo, PopupEffect, PopupInfo, PopupOptions, PopupService} from "../../common/service/popup.service";
import {CommonUtils} from "../../common/core/utils/common-utils";

export enum AlertLevel {
    info, warning, error, confirm
}

export type AlertMessage = {message?: string, header: string};

@Component({
    selector: 'jigsaw-alert, j-alert',
    templateUrl: 'alert.html',
    host: {
        '[class.jigsaw-alert-host]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawAlert extends AbstractDialogComponentBase {
    constructor(protected renderer: Renderer2, protected elementRef: ElementRef, protected _zone: NgZone,
                // @RequireMarkForCheck 需要用到，勿删
                protected  _injector: Injector) {
        super(renderer, elementRef, _zone, _injector);
    }

    @Output()
    public close: EventEmitter<any> = new EventEmitter<any>();

    /**
     * @internal
     */
    @ContentChildren(JigsawButton, {descendants: true})
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

    /**
     * @NoMarkForCheckRequired
     */
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

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get icon(): string {
        if (!this._icon) {
            switch (this._level) {
                case AlertLevel.info:
                    this._icon = "iconfont-e9f9";
                    break;
                case AlertLevel.warning:
                    this._icon = "iconfont-e437";
                    break;
                case AlertLevel.error:
                    this._icon = "iconfont-e9b9";
                    break;
                case AlertLevel.confirm:
                    this._icon = "iconfont-e9ef";
                    break;
                default:
                    this._icon = "iconfont-ea39";
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
        if (!!iconEl) {
            this.renderer.addClass(iconEl, this.icon);
        }
        super.init();
    }
}

@Directive()
export abstract class JigsawCommonAlert extends DialogBase {
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public set initData(value: any) {
        if (!value) {
            return;
        }
        this.caption = value.title ? value.title : this._getDefaultTitle();
        this.header = value.header ? value.header : this.caption;
        this.message = value.message ? value.message : '';
        this.buttons = value.buttons ? value.buttons : this.buttons;
    }

    public abstract get dialog(): JigsawDialog;
    public abstract set dialog(value: JigsawDialog);

    public message: string;
    public header: string;
    public buttons: ButtonInfo[] = [{label: 'alert.button.ok'}];
    public level: AlertLevel = AlertLevel.info;

    public static showAlert(what: Type<JigsawCommonAlert>,
                            message: string | AlertMessage,
                            callback?: DialogCallback,
                            buttons?: ButtonInfo[],
                            caption?: string,
                            modal: boolean = true,
                            popupOptions?: PopupOptions): PopupInfo {
        const msg: AlertMessage = typeof message == 'string' ? {header: message} : message;
        const po: PopupOptions = popupOptions ? popupOptions : {
            modal: modal, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut,
            shadowType: 'alert',
            borderRadius: '3px'
        };
        const popupInfo = PopupService.instance.popup(what, po,
            {message: msg.message, header: msg.header, title: caption, buttons});
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

    protected constructor(protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super();
        this._renderer.addClass(this._elementRef.nativeElement, 'jigsaw-common-alert');
    }
}

@Component({
    templateUrl: 'common-alert.html',
    selector: 'jigsaw-info-alert, j-info-alert',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawInfoAlert extends JigsawCommonAlert {
    constructor(protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super(_renderer, _elementRef);
    }

    @ViewChild(JigsawAlert, {static: true})
    public dialog: JigsawDialog;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public message: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public header: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public caption: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public level: AlertLevel = AlertLevel.info;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public buttons: ButtonInfo[] = [{label: 'alert.button.ok', 'type': 'primary'}];

    public static show(info: string | AlertMessage,
                       callback?: DialogCallback,
                       buttons?: ButtonInfo[],
                       caption?: string,
                       modal: boolean = true,
                       popupOptions?: PopupOptions): PopupInfo {
        return JigsawCommonAlert.showAlert(JigsawInfoAlert, info, callback, buttons, caption, modal, popupOptions);
    }
}

@Component({
    templateUrl: 'common-alert.html',
    selector: 'jigsaw-warning-alert, j-warning-alert',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawWarningAlert extends JigsawCommonAlert {
    constructor(protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super(_renderer, _elementRef);
    }

    @ViewChild(JigsawAlert, {static: true})
    public dialog: JigsawDialog;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public message: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public header: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public caption: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public level: AlertLevel = AlertLevel.warning;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public buttons: ButtonInfo[] = [{label: 'alert.button.ok', 'type': 'warning'}];

    public static show(info: string | AlertMessage,
                       callback?: DialogCallback,
                       buttons?: ButtonInfo[],
                       caption?: string,
                       modal: boolean = true,
                       popupOptions?: PopupOptions): PopupInfo {
        return JigsawCommonAlert.showAlert(JigsawWarningAlert, info, callback, buttons, caption, modal, popupOptions);
    }
}

@Component({
    templateUrl: 'common-alert.html',
    selector: 'jigsaw-error-alert, j-error-alert',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class JigsawErrorAlert extends JigsawCommonAlert {
    constructor(protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super(_renderer, _elementRef);
    }

    @ViewChild(JigsawAlert, {static: true})
    public dialog: JigsawDialog;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public message: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public header: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public caption: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public level: AlertLevel = AlertLevel.error;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public buttons: ButtonInfo[] = [{label: 'alert.button.ok', 'type': 'error'}];

    public static show(info: string | AlertMessage,
                       callback?: DialogCallback,
                       buttons?: ButtonInfo[],
                       caption?: string,
                       modal: boolean = true,
                       popupOptions?: PopupOptions): PopupInfo {
        return JigsawCommonAlert.showAlert(JigsawErrorAlert, info, callback, buttons, caption, modal, popupOptions);
    }
}

@Component({
    templateUrl: 'common-alert.html',
    selector: 'jigsaw-confirm-alert, j-confirm-alert',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawConfirmAlert extends JigsawCommonAlert {
    constructor(protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super(_renderer, _elementRef);
    }

    @ViewChild(JigsawAlert, {static: true})
    public dialog: JigsawDialog;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public message: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public header: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public caption: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public level: AlertLevel = AlertLevel.confirm;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public buttons: ButtonInfo[] = [{label: 'alert.button.yes', 'type': 'primary'}, {label: 'alert.button.no'}];

    public static show(info: string | AlertMessage,
                       callback?: DialogCallback,
                       buttons?: ButtonInfo[],
                       caption?: string,
                       modal: boolean = true,
                       popupOptions?: PopupOptions): PopupInfo {
        return JigsawCommonAlert.showAlert(JigsawConfirmAlert, info, callback, buttons, caption, modal, popupOptions);
    }
}

@NgModule({
    imports: [JigsawDialogModule, JigsawMovableModule, JigsawButtonModule, CommonModule, TranslateModule.forChild()],
    declarations: [JigsawAlert, JigsawInfoAlert, JigsawWarningAlert, JigsawErrorAlert, JigsawConfirmAlert],
    exports: [
        JigsawDialogModule, JigsawMovableModule, JigsawAlert, JigsawInfoAlert, JigsawWarningAlert,
        JigsawErrorAlert, JigsawConfirmAlert
    ],
    providers: [TranslateService]
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
