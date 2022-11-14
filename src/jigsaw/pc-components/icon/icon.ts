import {
    Component,
    Input,
    NgModule,
    ChangeDetectionStrategy,
    Injector,
    OnInit,
    Renderer2,
    ElementRef,
    Optional
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {AbstractJigsawComponent, WingsTheme} from '../../common/common';
import {CommonUtils} from "../../common/core/utils/common-utils";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {TranslateHelper} from "../../common/core/utils/translate-helper";

const defaultHrefValue = 'javascript:void(0);';
export type StatusType = 'success' | 'warning' | 'error' | 'finish' | 'disabled' | 'process' | 'custom';
/**
 * 图标控件，支持输入@rdkmaster/icon-font等符号图标
 *
 * $demo = button/basic
 */
@WingsTheme('icon.scss')
@Component({
    selector: 'jigsaw-icon, j-icon',
    templateUrl: 'icon.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-icon-host]': 'true',
        '[class.jigsaw-icon-disabled]': 'disabled',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class JigsawIcon extends AbstractJigsawComponent implements OnInit {
    constructor(private _sanitizer: DomSanitizer, private _renderer: Renderer2, private _element: ElementRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector,
                @Optional() private _translateService: TranslateService) {
        super();
        this._$secureUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._href);
    }

    /**
     * @internal
     */
    public _$secureUrl: SafeResourceUrl;
    private _href: string = defaultHrefValue;
    private _target: string = '_blank';

    @RequireMarkForCheck()
    @Input()
    public title: string = '';

    /**
     * 为true时：生成的html是 <a class="iconfont iconfont-xxxx">some text</a> 不改变图标的颜色，只将鼠标cursor改为pointer
     * 为false时：生成的html是 <span class="iconfont iconfont-xxxx">some text</span>
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public isLinkButton: boolean = false;

   /**
     * 设置icon不可交互状态的开关，为true则不可交互，为false则可交互。
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public disabled: boolean = false;

    /**
     * 图标类型 iconfont iconfont-xxx
     */
    @RequireMarkForCheck()
    @Input()
    public icon: string;

    /**
     * 图标字号，单位是px
     */
    @RequireMarkForCheck()
    @Input()
    public iconSize: number | 'inherit';

    /**
     * 图标颜色
     */
    @RequireMarkForCheck()
    @Input()
    public iconColor: string;

    /**
     * 图标的文本
     */
    @RequireMarkForCheck()
    @Input()
    public text: string;

    /**
     * 文字的字号，单位是px
     */
    @RequireMarkForCheck()
    @Input()
    public textSize: number | 'inherit' = 'inherit';

    /**
     * 文字的颜色
     */
    @RequireMarkForCheck()
    @Input()
    public textColor: string = 'inherit';

    /**
     * 图标相对于文字的位置，默认值：top为上方
     */
    @RequireMarkForCheck()
    @Input()
    public iconPosition: 'left' | 'top' | 'right' | 'bottom' = 'left';

    /**
     * 超链接 href
     */
    @Input()
    @RequireMarkForCheck()
    public set href(value: any) {
        if (this._href == value || CommonUtils.isUndefined(value)) {
            if (CommonUtils.isUndefined(this._$secureUrl)) {
                this._$secureUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._href);
            }
            return;
        }
        this._href = value;
        this._$secureUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._href);
    }

    /**
     * 规定在何处打开超链
     */
    @Input()
    @RequireMarkForCheck()
    public get target(): string {
        return (this._href == defaultHrefValue || CommonUtils.isUndefined(this._$secureUrl)) ? '_self' : this._target;
    }

    public set target(value: string) {
        if (this._target == value) {
            return;
        }
        this._target = value;
    }

    /**
     * @internal
     */
        public _status: StatusType;

    /**
     * 预设状态 'success' , 'warning' , 'error' , 'finish' , 'disabled' , 'process', 'custom'
     */
    @Input()
    @RequireMarkForCheck()
    public get status(): StatusType {
        return this._status;
    }

    public set status(value: StatusType) {
        if (CommonUtils.isUndefined(value)) {
            return;
        }
        this._status = value;
        this.updateStatus(value, this.initialized ? null : this.text, this.initialized ? null : this.icon);
    }

    public updateStatus(newStatus: StatusType, text?: string, icon?: string): void {
        if (CommonUtils.isUndefined(newStatus)) {
            return;
        }
        this._status = newStatus;
        const defaultStatus = this._getDefaultStatus(newStatus);
        this.text = CommonUtils.isDefined(text) ? text : defaultStatus.text;
        this.icon = CommonUtils.isDefined(icon) ? icon : defaultStatus.icon;
        this.iconColor = defaultStatus.color;
        this.iconSize = !!this.iconSize ? this.iconSize : 10;

        for (const cn of this._element.nativeElement.classList) {
            if (/^jigsaw-status-\w+$/.test(cn)) {
                this._renderer.removeClass(this._element.nativeElement, cn);
            }
        }
        this._renderer.addClass(this._element.nativeElement, defaultStatus.className);
    }

    private _getDefaultStatus(status: StatusType): {icon: string, color: string, text: string, className: string} {
        switch (status) {
            case 'success':
                return {
                    color: 'var(--success-default)', text: `icon.success`,
                    className: 'jigsaw-status-success', icon: 'iconfont iconfont-e9f1'
                };
            case 'warning':
                return {
                    color: 'var(--danger-default)', text: `icon.warning`,
                    className: 'jigsaw-status-warning', icon: 'iconfont iconfont-e9f1'
                };
            case 'error':
                return {
                    color: 'var(--error-default)', text: `icon.error`,
                    className: 'jigsaw-status-error', icon: 'iconfont iconfont-e9f1'
                };
            case 'finish':
                return {
                    color: 'var(--primary-default)', text: `icon.finish`,
                    className: 'jigsaw-status-finish', icon: 'iconfont iconfont-e9f1'
                };
            case 'disabled':
                return {
                    color: 'var(--font-color-disabled)', text: `icon.disabled`,
                    className: 'jigsaw-status-disabled', icon: 'iconfont iconfont-e9f1'
                };
            case 'process':
                return {
                    color: 'var(--process-default)', text: `icon.process`,
                    className: 'jigsaw-status-process', icon: 'iconfont iconfont-e9f1'
                };
            case 'custom':
            default:
                return {
                    color: 'inherit', text: `icon.custom`,
                    className: 'jigsaw-status-custom', icon: 'iconfont iconfont-e9f1'
                };
        }
    }

    ngOnInit () {
        super.ngOnInit();
        this.iconSize = !!this.iconSize ? this.iconSize : 'inherit';
        this.iconColor = !!this.iconColor ? this.iconColor : 'inherit';
        this.text = !!this.text ? this.text : '';
    }
}

@NgModule({
    imports: [CommonModule, TranslateModule.forChild()],
    declarations: [JigsawIcon],
    exports: [JigsawIcon]
})
export class JigsawIconModule {
    constructor() {
        TranslateHelper.initI18n("icon", {
            zh: {
                success: "成功",
                warning: "警告",
                error: "错误",
                finish: "完成",
                disabled: "停用",
                process: "运行中",
                custom: "自定义"
            },
            en: {
                success: "Success",
                warning: "Warning",
                error: "Error",
                finish: "Finish",
                disabled: "Disabled",
                process: "Process",
                custom: "Custom"
            }
        });
    }
}
