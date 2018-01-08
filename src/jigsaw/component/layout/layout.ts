import {
    AfterViewInit, Component, ElementRef, Input, NgModule, QueryList, Renderer2, ViewChildren
} from "@angular/core";
import {JigsawBoxBase} from "../box/box";
import {CallbackRemoval} from "../../core/utils/common-utils";
import {TreeData} from "../../core/data/tree-data";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'jigsaw-layout, j-layout',
    templateUrl: './layout.html',
    host: {
        '[class.jigsaw-layout]': 'true',
        '[class.jigsaw-box]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        '[style.width]': 'width',
        '[style.height]': 'height',
    }
})
export class JigsawLayout extends JigsawBoxBase implements AfterViewInit {
    constructor(elementRef: ElementRef, renderer: Renderer2) {
        super(elementRef, renderer);
    }

    private _dataCallbackRemoval: CallbackRemoval;

    private _data: TreeData;

    @Input()
    get data(): TreeData {
        return this._data;
    }

    set data(value: TreeData) {
        this._data = value;
        if (this._dataCallbackRemoval) {
            this._dataCallbackRemoval();
        }
        this._dataCallbackRemoval = this._data.onRefresh(()=>{}, this);
    }

    @ViewChildren(JigsawLayout)
    protected childrenBox: QueryList<JigsawLayout>;

    ngAfterViewInit() {
        setTimeout(() => {
            this.checkFlex();
        });
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawLayout],
    exports: [JigsawLayout]
})
export class JigsawLayoutModule {

}
