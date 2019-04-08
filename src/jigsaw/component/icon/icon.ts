import {Component, Input, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractJigsawComponent} from '../common';
import {DomSanitizer} from "@angular/platform-browser";
import {CommonUtils} from "../../core/utils/common-utils";

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
    }
})
export class JigsawIcon extends AbstractJigsawComponent {
    public _$secureUrl;
    private _href: string = 'javascript:void(0);';

    /**
     * 为true    生成的html是 <a class="fa fa-edit">some text</a> 不改变图标的颜色，只将鼠标cursor改为pointer
     * 为false   生成的html是 <span class="fa fa-edit">some text</span>
     */
    @Input() public isLinkButton: boolean = false;

    /**
     * 图标类型 fa fa-xxx
     */
    @Input() public icon: string;
    /**
     * 图标字号，单位是px
     */
    @Input() public iconSize: number = 14;
    /**
     * 图标颜色
     */
    @Input() public iconColor: string = 'inherit';

    /**
     * 图标的文本
     */
    @Input() public text: string = '';
    /**
     * 文字的字号，单位是px
     */
    @Input() public textSize: number = 14;
    /**
     * 文字的颜色
     */
    @Input() public textColor: string = 'inherit';
    /**
     * 图标相对于文字的位置，left为左侧，默认值：top为上方
     */
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
    }

    /**
     * 图标的文本
     */
    @Input() public target: string = '_blank';

    @Input() public title: string = '';

    constructor(private _sanitizer: DomSanitizer) {
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
