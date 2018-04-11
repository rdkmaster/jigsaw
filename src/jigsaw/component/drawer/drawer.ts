import {Component, Input, NgModule, OnInit} from "@angular/core";
import {AbstractJigsawComponent} from "../common";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@Component({
    selector: 'jigsaw-drawer, j-drawer',
    templateUrl: './drawer.html',
    host: {
        '[class.jigsaw-drawer-host]': 'true'
    }
})
export class JigsawDrawer extends AbstractJigsawComponent implements OnInit {
    private _position: string = 'left';

    @Input()
    public get position(): string {
        return this._position;
    }

    public set position(value: string) {
        if(!value) return;
        this._position = value;
        if(this.initialized) {
            this._setStyle();
            this._setClass();
        }
    }

    @Input()
    public close: boolean = true;

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
            bottom: this.position == "bottom"  ? 0 : 'auto'
        }
    }

    /**
     * @internal
     */
    public _$handleClass = {};

    private _setClass() {
        this._$handleClass = {
            'jigsaw-drawer-left': this.position == 'left',
            'jigsaw-drawer-top': this.position == 'top',
            'jigsaw-drawer-right': this.position == 'right',
            'jigsaw-drawer-bottom': this.position == 'bottom',
        }
    }

    public _$toggleClose(e) {
        e.preventDefault();
        e.stopPropagation();
        this.close = !this.close;
    }

    ngOnInit() {
        super.ngOnInit();
        this._setStyle();
        this._setClass();
    }
}

@NgModule({
    imports: [CommonModule, PerfectScrollbarModule],
    declarations: [JigsawDrawer],
    exports: [JigsawDrawer]
})
export class JigsawDrawerModule {

}
