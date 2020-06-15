import {Component, Input, NgModule,ChangeDetectionStrategy, ChangeDetectorRef, Injector} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractJigsawComponent} from '../../common/common';
import {DomSanitizer} from "@angular/platform-browser";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {GenerateGetterSetter} from "../../common/decorator/input.setters";

const defaultHrefValue = 'javascript:void(0);';

/**
 * 图标控件，支持输入fontawesome的图标
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
export class JigsawIcon extends AbstractJigsawComponent {
    /**
     * @internal
     */
    public _$secureUrl;
    private _href: string = defaultHrefValue;
    private _target: string = '_blank';

    /**
     * 为true    生成的html是 <a class="fa fa-edit">some text</a> 不改变图标的颜色，只将鼠标cursor改为pointer
     * 为false   生成的html是 <span class="fa fa-edit">some text</span>
     */
    @Input() public isLinkButton: boolean = false;

    /**
     * 图标类型 fa fa-xxx
     */
    @Input()
    @GenerateGetterSetter()
    public icon: string;

    /**
     * 图标字号，单位是px
     */
    @GenerateGetterSetter()
    @Input() public iconSize: number | 'inherit' = 'inherit';
    /**
     * 图标颜色
     */
    @GenerateGetterSetter()
    @Input() public iconColor: string = 'inherit';

    /**
     * 图标的文本
     */
    @GenerateGetterSetter()
    @Input() public text: string = '';
    /**
     * 文字的字号，单位是px
     */
    @GenerateGetterSetter()
    @Input() public textSize: number | 'inherit' = 'inherit';
    /**
     * 文字的颜色
     */
    @GenerateGetterSetter()
    @Input() public textColor: string = 'inherit';
    /**
     * 图标相对于文字的位置，left为左侧，默认值：top为上方
     */
    @GenerateGetterSetter()
    @Input() public iconPosition: 'left' | 'top' = 'left';

    /**
     * 超链接 href
     */
    @Input()
    public set href(value: any) {
        if (this._href == value || CommonUtils.isUndefined(value)) {
            if (CommonUtils.isUndefined(this._$secureUrl)) {
                this._$secureUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._href);
            }
            return;
        }
        this._href = value;
        this._$secureUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._href);
        this._changeDetector.markForCheck();
    }

    /**
     * 规定在何处打开超链
     */
    @Input()
    public get target(): string {
        return (this._href == defaultHrefValue || CommonUtils.isUndefined(this._$secureUrl)) ? '_self' : this._target;
    }

    public set target(value: string) {
        if (this._target != value) {
            this._target = value;
            this._changeDetector.markForCheck();
        }
    }

    @GenerateGetterSetter()
    @Input() public title: string = '';

    constructor(private _sanitizer: DomSanitizer, private _injector: Injector, private _changeDetector: ChangeDetectorRef) {
        super();
        this._$secureUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._href);
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawIcon],
    exports: [JigsawIcon]
})
export class JigsawIconModule {

}
