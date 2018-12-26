import {Component, Input, NgModule, Output, EventEmitter, OnInit, ElementRef} from "@angular/core";
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
    templateUrl: './drawer.html'
})
export class JigsawDrawer extends AbstractJigsawComponent implements OnInit {
    constructor(private _elementRef: ElementRef) {
        super();
    }

    private  _position: "left" | "right" | "top" | "bottom" = "left";

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
    }

    /**
     * 代表了抽屉的状态，`true`为打开状态，`false`为关闭状态。在双绑模式下，改变此属性的值可以打开或者关闭抽屉。
     *
     * $demo = drawer/basic
     */
    @Input()
    public open: boolean = false;

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
     * 向上寻找离抽屉最近的
     */
    @Input()
    public container: string;

    private _offsetTop: string;
    private _offsetLeft: string;
    private _offsetRight: string;
    private _offsetBottom: string;

    @Input()
    get offsetTop(): string {
        return this._offsetTop;
    }

    set offsetTop(value: string) {
        this._offsetTop = CommonUtils.getCssValue(value);
        this._update();
    }

    @Input()
    get offsetLeft(): string {
        return this._offsetLeft;
    }

    set offsetLeft(value: string) {
        this._offsetLeft = CommonUtils.getCssValue(value);
        this._update();
    }

    @Input()
    get offsetRight(): string {
        return this._offsetRight;
    }

    set offsetRight(value: string) {
        this._offsetRight = CommonUtils.getCssValue(value);
        this._update();
    }

    @Input()
    get offsetBottom(): string {
        return this._offsetBottom;
    }

    set offsetBottom(value: string) {
        this._offsetBottom = CommonUtils.getCssValue(value);
        this._update();
    }

    @Input()
    public get width(): string {
        return this._width;
    }

    public set width(value: string) {
        this._width = CommonUtils.getCssValue(value);
        this._update();
    }

    @Input()
    public get height(): string {
        return this._height;
    }

    public set height(value: string) {
        this._height = CommonUtils.getCssValue(value);
        this._update();
    }

    private _update() {
        if (!this.initialized) return;
        this._setStyle();
        this._setClass();
        this._setContainer();
    }

    /**
     * @internal
     */
    public _$handleStyle = {};

    private _setStyle() {
        this._$handleStyle = {
            position: this.container ? 'absolute' : 'fixed',
            width: this.width ? this.width : ((this.position == "left" || this.position == "right") ? "auto" : "100%"),
            height: this.height ? this.height : ((this.position == "top" || this.position == "bottom") ? "auto" : "100%"),
            left: (this.position == "top" || this.position == "bottom") && this.offsetLeft ? this.offsetLeft : null,
            right: (this.position == "top" || this.position == "bottom") && this.offsetRight ? this.offsetRight : null,
            top: (this.position == "left" || this.position == "right") && this.offsetTop ? this.offsetTop : null,
            bottom: (this.position == "left" || this.position == "right") && this.offsetBottom ? this.offsetBottom : null,
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
            'jigsaw-drawer-left-center': this.position == 'left' && !this.offsetTop  && !this.offsetBottom,
            'jigsaw-drawer-right-center': this.position == 'right' && !this.offsetTop  && !this.offsetBottom,
            'jigsaw-drawer-top-center': this.position == 'top' && !this.offsetLeft  && !this.offsetRight,
            'jigsaw-drawer-bottom-center': this.position == 'bottom' && !this.offsetLeft  && !this.offsetRight,
        }
    }

    public _$toggleOpen(e) {
        e.preventDefault();
        e.stopPropagation();
        this.open = !this.open;
        this.openChange.emit(this.open);
    }

    private _setContainer() {
        if(this.container) {
            const containerEl = CommonUtils.getParentNodeBySelector(this._elementRef.nativeElement, this.container);
            if(containerEl) {
                console.log(containerEl, containerEl.style.position, containerEl.style.overflow, containerEl.style.overflowX, containerEl.style.overflowY);
                if(!containerEl.style.position || containerEl.style.position == 'static') {
                    containerEl.style.position = 'relative';
                }
                if((this.position == 'left' || this.position == 'right') && containerEl.style.overflowX != 'hidden' &&
                    containerEl.style.overflowX != 'scroll' && containerEl.style.overflowX != 'auto') {
                    containerEl.style.overflowX = 'hidden';
                }
                if((this.position == 'top' || this.position == 'bottom') && containerEl.style.overflowY != 'hidden' &&
                    containerEl.style.overflowY != 'scroll' && containerEl.style.overflowY != 'auto') {
                    containerEl.style.overflowY = 'hidden';
                }
            } else {
                console.error('Can not find drawer container.');
            }
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this._update();
        // 异步添加动画，为了初始化时没有拉伸的动作
        this.callLater(() => {
            this._$onAnimation = true;
        })
    }
}

@NgModule({
    imports: [CommonModule, PerfectScrollbarModule],
    declarations: [JigsawDrawer],
    exports: [JigsawDrawer]
})
export class JigsawDrawerModule {

}
