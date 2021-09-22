import {Component, Input, NgModule,ChangeDetectionStrategy, Injector, OnInit, Renderer2, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractJigsawComponent} from '../../common/common';
import {DomSanitizer} from "@angular/platform-browser";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

const defaultHrefValue = 'javascript:void(0);';
type StatusType = 'success' | 'warning' | 'error' | 'finish' | 'disabled' | 'process' | 'custom';
/**
 * 图标控件，支持输入@rdkmaster/icon-font等符号图标
 *
 * $demo = button/basic
 */
@Component({
    selector: 'jigsaw-icon, j-icon',
    templateUrl: 'icon.html',
    host: {
        '[class.jigsaw-icon]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height'
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
                this.text = !!this.text ? this.text : '成功';
                this._renderer.addClass(this.element.nativeElement, 'jigsaw-status-success');
                break;
            case 'warning':
                this._setStautsStyle();
                this.iconColor = !!this.iconColor ? this.iconColor : 'var(--danger-default)';
                this.text = !!this.text ? this.text : '警告';
                this._renderer.addClass(this.element.nativeElement, 'jigsaw-status-warning');
                break;
            case 'error':
                this._setStautsStyle();
                this.iconColor = !!this.iconColor ? this.iconColor : 'var(--error-default)';
                this.text = !!this.text ? this.text : '错误';
                this._renderer.addClass(this.element.nativeElement, 'jigsaw-status-error');
                break;
            case 'finish':
                this._setStautsStyle();
                this.iconColor = !!this.iconColor ? this.iconColor : 'var(--primary-default)';
                this.text = !!this.text ? this.text : '完成';
                this._renderer.addClass(this.element.nativeElement, 'jigsaw-status-finish');
                break;
            case 'disabled':
                this._setStautsStyle();
                this.iconColor = !!this.iconColor ? this.iconColor : 'var(--font-color-disabled)';
                this.text = !!this.text ? this.text : '停用';
                this._renderer.addClass(this.element.nativeElement, 'jigsaw-status-disabled');
                break;
            case 'process':
                this._setStautsStyle();
                this.iconColor = !!this.iconColor ? this.iconColor : 'var(--process-default)';
                this.text = !!this.text ? this.text : '运行中';
                this._renderer.addClass(this.element.nativeElement, 'jigsaw-status-process');
                break;
            case 'custom':
                this._setStautsStyle();
                this.text = !!this.text ? this.text : '自定义';
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
                private _injector: Injector) {
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
}
