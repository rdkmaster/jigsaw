import {Component, Input, NgModule,ChangeDetectionStrategy, Injector, OnInit, Renderer2, ElementRef, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractJigsawComponent, WingsTheme} from '../../common/common';
import {DomSanitizer} from "@angular/platform-browser";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import { TranslateService } from '@ngx-translate/core';
import { InternalUtils } from '../../common/core/utils/internal-utils';

const defaultHrefValue = 'javascript:void(0);';
export type StatusType = 'success' | 'warning' | 'error' | 'finish' | 'disabled' | 'process' | 'custom';
/**
 * 图标控件，支持输入@rdkmaster/icon-font等符号图标
 *
 * $demo = button/basic
 */
@WingsTheme('jigsaw-icon')
@Component({
    selector: 'jigsaw-icon, j-icon',
    templateUrl: 'icon.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-icon-host]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class JigsawIcon extends AbstractJigsawComponent implements OnInit {
    /**
     * @internal
     */
    public _$secureUrl;
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
        switch (value) {
            case 'success':
                this._setStautsStyle();
                this.iconColor = !!this.iconColor ? this.iconColor : 'var(--success-default)';
                this.text = !!this.text ? this.text : this._translateService.instant(`icon.success`);
                this._renderer.addClass(this.element.nativeElement, 'jigsaw-status-success');
                break;
            case 'warning':
                this._setStautsStyle();
                this.iconColor = !!this.iconColor ? this.iconColor : 'var(--danger-default)';
                this.text = !!this.text ? this.text : this._translateService.instant(`icon.warning`);
                this._renderer.addClass(this.element.nativeElement, 'jigsaw-status-warning');
                break;
            case 'error':
                this._setStautsStyle();
                this.iconColor = !!this.iconColor ? this.iconColor : 'var(--error-default)';
                this.text = !!this.text ? this.text : this._translateService.instant(`icon.error`);
                this._renderer.addClass(this.element.nativeElement, 'jigsaw-status-error');
                break;
            case 'finish':
                this._setStautsStyle();
                this.iconColor = !!this.iconColor ? this.iconColor : 'var(--primary-default)';
                this.text = !!this.text ? this.text : this._translateService.instant(`icon.finish`);
                this._renderer.addClass(this.element.nativeElement, 'jigsaw-status-finish');
                break;
            case 'disabled':
                this._setStautsStyle();
                this.iconColor = !!this.iconColor ? this.iconColor : 'var(--font-color-disabled)';
                this.text = !!this.text ? this.text : this._translateService.instant(`icon.disabled`);
                this._renderer.addClass(this.element.nativeElement, 'jigsaw-status-disabled');
                break;
            case 'process':
                this._setStautsStyle();
                this.iconColor = !!this.iconColor ? this.iconColor : 'var(--process-default)';
                this.text = !!this.text ? this.text : this._translateService.instant(`icon.process`);
                this._renderer.addClass(this.element.nativeElement, 'jigsaw-status-process');
                break;
            case 'custom':
                this._setStautsStyle();
                this.text = !!this.text ? this.text : this._translateService.instant(`icon.custom`);
                this._renderer.addClass(this.element.nativeElement, 'jigsaw-status-custom');
                break;
            default:
                break;
        }
    }

    private _setStautsStyle() {
        this.icon = !!this.icon ? this.icon : 'iconfont iconfont-e9f1';
        this.iconSize = !!this.iconSize ? this.iconSize : 10;
    }

    constructor(private _sanitizer: DomSanitizer, private _renderer: Renderer2, public element: ElementRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector,
                @Optional() private _translateService: TranslateService,) {
        super();
        this._$secureUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._href);
    }

    ngOnInit () {
        this.iconSize = !!this.iconSize ? this.iconSize : 'inherit';
        this.iconColor = !!this.iconColor ? this.iconColor : 'inherit';
        this.text = !!this.text ? this.text : '';
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawIcon],
    exports: [JigsawIcon]
})
export class JigsawIconModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, "icon", {
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
        translateService.setDefaultLang(translateService.getBrowserLang());
    }
}
