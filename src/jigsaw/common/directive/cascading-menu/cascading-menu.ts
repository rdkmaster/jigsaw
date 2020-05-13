import {Directive, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SimpleNode, SimpleTreeData} from "../../core/data/tree-data";
import {PopupOptions} from "../../service/popup.service";
import {JigsawFloat} from "../float";
import {JigsawMenuComponent} from "./menu";


@Directive({
    selector: '[jigsaw-cascading-menu],[j-cascading-menu],[jigsawCascadingMenu]',
    host: {
        '(mouseenter)': "_$openByHover($event)",
        '(mouseleave)': "_$closeByHover($event, 1)",
        '(click)': "_$onHostClick()"
    }
})
export class JigsawCascadingMenu extends JigsawFloat implements OnInit {

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
        this.jigsawFloatInitData.select = this.jigsawCascadingMenuSelect;
    }

}
