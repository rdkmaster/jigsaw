import {Component, Input, NgModule,Output,EventEmitter, OnInit} from "@angular/core";
import {AbstractJigsawComponent} from "../common";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

/**
 * 本组件模拟了一个类似抽屉的效果，用于收纳UI上重要性不高的视图。
 */
@Component({
    selector: 'jigsaw-drawer, j-drawer',
    templateUrl: './drawer.html'
})
export class JigsawDrawer extends AbstractJigsawComponent implements OnInit {


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
        if (this.initialized) {
            this._setStyle();
            this._setClass();
        }
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
     * @internal
     */
    public _$handleStyle = {};

    private _setStyle() {
        this._$handleStyle = {
            position: 'fixed',
            width: this.width ? this.width : ((this.position == "left" || this.position == "right") ? "auto" : "100%"),
            height: this.height ? this.height : ((this.position == "top" || this.position == "bottom") ? "auto" : "100%"),
            left: (this.position == "left" || this.position == "top" || this.position == "bottom") ? 0 : 'auto',
            top: (this.position == "left" || this.position == "top" || this.position == "right") ? 0 : 'auto',
            right: this.position == "right" ? 0 : 'auto',
            bottom: this.position == "bottom" ? 0 : 'auto'
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
        }
    }

    public _$toggleOpen(e) {
        e.preventDefault();
        e.stopPropagation();
        this.open = !this.open;
        this.openChange.emit(this.open);
    }

    ngOnInit() {
        super.ngOnInit();
        this._setStyle();
        this._setClass();
        // 异步添加动画，为了初始化时没有拉伸的动作
        setTimeout(() => {
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
