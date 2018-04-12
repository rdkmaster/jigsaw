import {Component, Input, NgModule,Output,EventEmitter, OnInit} from "@angular/core";
import {AbstractJigsawComponent} from "../common";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@Component({
    selector: 'jigsaw-drawer, j-drawer',
    templateUrl: './drawer.html'
})
export class JigsawDrawer extends AbstractJigsawComponent implements OnInit {
    private _position: string = 'left';

    @Input()
    public get position(): string {
        return this._position;
    }

    public set position(value: string) {
        if (!value) return;
        this._position = value;
        if (this.initialized) {
            this._setStyle();
            this._setClass();
        }
    }

    @Input()
    public open: boolean = false;
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
