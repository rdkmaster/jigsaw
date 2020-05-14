import {Directive, EventEmitter, Input, OnInit, Output, AfterViewInit, OnDestroy} from "@angular/core";
import {SimpleNode, SimpleTreeData} from "../../core/data/tree-data";
import {PopupOptions} from "../../service/popup.service";
import {JigsawFloat} from "../float";
import {JigsawMenuComponent} from "../../../pc-components/menu/menu";

@Directive({
    selector: '[jigsaw-cascading-menu],[j-cascading-menu],[jigsawCascadingMenu]',
    host: {
        '(mouseenter)': "_$openByHover($event)",
        '(mouseleave)': "_$closeByHover($event, 1)",
        '(click)': "_$onHostClick()"
    }
})
export class JigsawCascadingMenu extends JigsawFloat implements OnInit, AfterViewInit, OnDestroy {
    @Input()
    public jigsawCascadingMenuData: SimpleTreeData;

    @Input()
    public jigsawCascadingMenuWidth: string | number = 200;

    @Input()
    public jigsawCascadingMenuHeight: string | number;

    @Input()
    public jigsawCascadingMenuMaxHeight: string | number;

    @Input()
    public jigsawCascadingMenuPopupOptions: PopupOptions;

    @Input()
    public jigsawCascadingMenuBackgroundColor: string;

    @Input()
    public jigsawCascadingMenuSelectedColor: string;

    @Output()
    public jigsawCascadingMenuSelect = new EventEmitter<SimpleNode>();

    /**
     * @internal
     */
    public jigsawFloatInitData: any = {};

    ngOnInit() {
        super.ngOnInit();
        this.jigsawFloatTarget = JigsawMenuComponent;
        this.jigsawFloatInitData.data = this.jigsawCascadingMenuData;
        this.jigsawFloatInitData.width = this.jigsawCascadingMenuWidth;
        this.jigsawFloatInitData.height = this.jigsawCascadingMenuHeight;
        this.jigsawFloatInitData.maxHeight = this.jigsawCascadingMenuMaxHeight;
        this.jigsawFloatInitData.options = this.jigsawCascadingMenuPopupOptions;
        this.jigsawFloatInitData.backgroundColor = this.jigsawCascadingMenuBackgroundColor;
        this.jigsawFloatInitData.selectedColor = this.jigsawCascadingMenuSelectedColor;
        this.jigsawFloatInitData.initDataSelect = this.jigsawCascadingMenuSelect;
    }

    private _removeClickHandler: any

    ngAfterViewInit() {
        if (!this._removeClickHandler) {
            this._removeClickHandler = this.jigsawCascadingMenuSelect.subscribe(node => {
                if (!node.nodes || node.nodes.length == 0) {
                    const popups = this._popupService.popups;
                    this._closeAll(popups);
                }
            })
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeClickHandler) {
            this._removeClickHandler.unsubscribe();
            this._removeClickHandler = null;
        }
    }
}
