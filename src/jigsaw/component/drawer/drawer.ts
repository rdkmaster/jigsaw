import {Component, Input, NgModule, Output, EventEmitter, OnInit, ElementRef, ViewChild, HostBinding} from "@angular/core";
import {AbstractJigsawComponent} from "../common";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {CommonUtils} from "../../core/utils/common-utils";

/**
 * 本组件模拟了一个类似抽屉的效果，用于收纳UI上重要性不高的视图。
 *
 * $since = v1.1.7
 */
@Component({
    selector: 'jigsaw-drawer, j-drawer',
    templateUrl: './drawer.html',
    host: {
        '[class.jigsaw-drawer-in-dom]': '!floating'
    }
})
export class JigsawDrawer extends AbstractJigsawComponent implements OnInit {
    constructor(private _elementRef: ElementRef) {
        super();
    }

    private _position: "left" | "right" | "top" | "bottom" = "left";

    /**
     * 用于设置抽屉的位置，支持上下左右4个方向。
     *
     * $demo = drawer/basic
     */
    @Input()
    public get position(): "left" | "right" | "top" | "bottom" {
        return this._position;
    }

    public set position(value: "left" | "right" | "top" | "bottom") {
        if (!value) return;
        this._position = value;
        this._update();
        this._setContainer();
    }

    private _open: boolean = false;

    /**
     * 代表了抽屉的状态，`true`为打开状态，`false`为关闭状态。在双绑模式下，改变此属性的值可以打开或者关闭抽屉。
     *
     * $demo = drawer/basic
     */
    @Input()
    public get open(): boolean {
        return this._open;
    }

    public set open(value: boolean) {
        this._open = value;
        this._update();
    }

    /**
     * 当抽屉的状态发生变化时，Jigsaw发出此事件
     *
     * $demo = drawer/basic
     *
     * @type {EventEmitter<boolean>}
     */
    @Output()
    public openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * 容器的selector，支持'.className'、'#id'、'[attr]'、'tagName'
     * 向上寻找离抽屉最近的匹配节点作为抽屉的容器
     *
     * $demo = drawer/with-div
     * $demo = drawer/with-scrollbar
     * $demo = drawer/with-tab
     */
    @Input()
    public container: string;

    private _offsetTop: string;
    private _offsetLeft: string;
    private _offsetRight: string;
    private _offsetBottom: string;

    /**
     * $demo = drawer/with-div
     */
    @Input()
    get offsetTop(): string {
        return this._offsetTop;
    }

    set offsetTop(value: string) {
        this._offsetTop = CommonUtils.getCssValue(value);
        this._update();
    }

    /**
     * $demo = drawer/with-div
     */
    @Input()
    get offsetLeft(): string {
        return this._offsetLeft;
    }

    set offsetLeft(value: string) {
        this._offsetLeft = CommonUtils.getCssValue(value);
        this._update();
    }

    /**
     * $demo = drawer/with-div
     */
    @Input()
    get offsetRight(): string {
        return this._offsetRight;
    }

    set offsetRight(value: string) {
        this._offsetRight = CommonUtils.getCssValue(value);
        this._update();
    }

    /**
     * $demo = drawer/with-div
     */
    @Input()
    get offsetBottom(): string {
        return this._offsetBottom;
    }

    set offsetBottom(value: string) {
        this._offsetBottom = CommonUtils.getCssValue(value);
        this._update();
    }

    /**
     * $demo = drawer/with-div
     */
    @Input()
    public get width(): string {
        return this._width;
    }

    public set width(value: string) {
        this._width = CommonUtils.getCssValue(value);
        this._update();
    }

    /**
     * $demo = drawer/with-div
     */
    @Input()
    public get height(): string {
        return this._height;
    }

    public set height(value: string) {
        this._height = CommonUtils.getCssValue(value);
        this._update();
    }

    /**
     * $demo = drawer/in-dom
     */
    @Input()
    public floating: boolean = true;

    @ViewChild('drawer')
    private _drawerEl: ElementRef;

    @HostBinding('style.width')
    private _$hostWidth: string;

    @HostBinding('style.height')
    private _$hostHeight: string;

    private _setHostSize() {
        this._$hostWidth = this._calcHostWidth();
        this._$hostHeight = this._calcHostHeight();
    }

    /**
     * host(jigsaw-drawer)宽高的计算方法：
     * 浮动模式下：不做任何处理。
     * 文档流模式下：
     * host是inline-block的模式，所以width和height属性没值时，默认按内容计算尺寸；
     * 有值时则为width和height的属性值
     */
    private _calcHostWidth(): string {
        if (this.floating) return null;
        let width = this._calcWidth();
        if (this.position == "top" || this.position == "bottom") {
            // 上下抽屉宽度为固定值
            return width ? width : this._drawerEl.nativeElement.offsetWidth + "px";
        } else if (this.open) {
            return width ? width : this._drawerEl.nativeElement.offsetWidth + 14 + "px";
        } else {
            return "14px";
        }
    }

    private _calcHostHeight(): string {
        if (this.floating) return null;
        let height = this._calcHeight();
        if (this.position == "left" || this.position == "right") {
            // 左右抽屉height为固定值
            return height ? height : this._drawerEl.nativeElement.offsetHeight + "px";
        } else if (this.open) {
            return height ? height : this._drawerEl.nativeElement.offsetHeight + 14 + "px";
        } else {
            return "14px";
        }
    }

    /**
     * @internal
     */
    public _$handleStyle = {};

    private _setStyle() {
        const styleTemp = this.floating ? {
            position: this.container ? 'absolute' : 'fixed',
            left: (this.position == "top" || this.position == "bottom") && this.offsetLeft ? this.offsetLeft : null,
            right: (this.position == "top" || this.position == "bottom") && this.offsetRight ? this.offsetRight : null,
            top: (this.position == "left" || this.position == "right") && this.offsetTop ? this.offsetTop : null,
            bottom: (this.position == "left" || this.position == "right") && this.offsetBottom ? this.offsetBottom : null,
        } : {};
        this._$handleStyle = {
            width: this._calcDrawerWidth(),
            height: this._calcDrawerHeight(),
            ...styleTemp
        }
    }

    /**
     * 抽屉(div.jigsaw-drawer)宽高的计算方法：
     *
     * 在浮动模式下：
     * 有width和height属性值时，按照width和height的值；
     * 否则position为top或bottom时，宽度为100%，跟随容器的宽度，高度为auto，按内容撑开；
     * position为left或right时，宽度为auto，按内容撑开，高度为100%，跟随容器的宽度；
     *
     * 在文档流模式下：
     * 当有width和height属性值时，因为width和height是设置在host上的，所以采用计算值calc(100% - 14px)
     * 当没有width和height属性值时，则宽高设置为auto，按照内容撑开
     */

    private _calcWidth(): string | undefined {
        if(this.width && this.width != "auto") {
            return this.width;
        }
        if(this.width == "auto") {
            if(this.offsetLeft) {
                return `calc(100% - ${this.offsetLeft})`;
            }else if(this.offsetRight) {
                return `calc(100% - ${this.offsetRight})`;
            }
        }
        return undefined;
    }

    private _calcDrawerWidth() {
        let width = this._calcWidth();
        if (this.floating) {
            return width ? width : (this.position == 'left' || this.position == 'right' ? 'auto' : '100%');
        } else {
            return width ? (this.position == 'left' || this.position == 'right' ? 'calc(100% - 14px)' : '100%') : 'auto';
        }
    }

    private _calcHeight(): string | undefined {
        if(this.height && this.height != "auto") {
            return this.height;
        }
        if(this.height == "auto") {
            if(this.offsetTop) {
                return `calc(100% - ${this.offsetTop})`;
            }else if(this.offsetBottom) {
                return `calc(100% - ${this.offsetBottom})`;
            }
        }
        return undefined;
    }

    private _calcDrawerHeight() {
        let height = this._calcHeight();
        if (this.floating) {
            return height ? height : (this.position == 'top' || this.position == 'bottom' ? 'auto' : '100%');
        } else {
            return height ? (this.position == 'top' || this.position == 'bottom' ? 'calc(100% - 14px)' : '100%') : 'auto';
        }
    }

    /**
     * @internal
     */
    public _$handleClass = {};

    /**
     * @internal
     */
    public _$onAnimation: boolean;

    private _setClass() {
        this._$handleClass = {
            'jigsaw-drawer-left': this.position == 'left',
            'jigsaw-drawer-top': this.position == 'top',
            'jigsaw-drawer-right': this.position == 'right',
            'jigsaw-drawer-bottom': this.position == 'bottom',
            'jigsaw-drawer-left-center': this.floating && this.position == 'left' && !this.offsetTop && !this.offsetBottom,
            'jigsaw-drawer-right-center': this.floating && this.position == 'right' && !this.offsetTop && !this.offsetBottom,
            'jigsaw-drawer-top-center': this.floating && this.position == 'top' && !this.offsetLeft && !this.offsetRight,
            'jigsaw-drawer-bottom-center': this.floating && this.position == 'bottom' && !this.offsetLeft && !this.offsetRight,
        }
    }

    public _$toggleOpen(e) {
        e.preventDefault();
        e.stopPropagation();
        this.open = !this.open;
        this.openChange.emit(this.open);
    }

    private _setContainer() {
        if (this.container && this.floating) {
            const containerEl = CommonUtils.getParentNodeBySelector(this._elementRef.nativeElement, this.container);
            if (containerEl) {
                const containerStyle = getComputedStyle(containerEl);
                if (!containerStyle.position || containerStyle.position == 'static') {
                    containerEl.style.position = 'relative';
                }
                if ((this.position == 'left' || this.position == 'right') && containerStyle.overflowX != 'hidden') {
                    containerEl.style.overflowX = 'hidden';
                }
                if ((this.position == 'top' || this.position == 'bottom') && containerStyle.overflowY != 'hidden') {
                    containerEl.style.overflowY = 'hidden';
                }
            } else {
                console.error('Can not find drawer container.');
            }
        }
    }

    private _update() {
        if (!this.initialized) return;
        this._setStyle();
        this._setClass();
        this.callLater(() => {
            // 等待抽屉的尺寸渲染完毕
            this._setHostSize();
        })
    }

    ngOnInit() {
        super.ngOnInit();
        this._update();
        this.callLater(() => {
            // 等待视图初始化完成，获取computedStyle
            this._setContainer();
            // 异步添加动画，为了初始化时没有拉伸的动作
            this._$onAnimation = true;
        });
    }
}

@NgModule({
    imports: [CommonModule, PerfectScrollbarModule],
    declarations: [JigsawDrawer],
    exports: [JigsawDrawer]
})
export class JigsawDrawerModule {

}
