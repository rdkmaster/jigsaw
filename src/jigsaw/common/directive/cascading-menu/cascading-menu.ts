import {Directive, EventEmitter, Input, Output} from "@angular/core";
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
export class JigsawCascadingMenu extends JigsawFloat {
    @Input()
    public jigsawCascadingMenuData: SimpleTreeData;
    @Input()
    public jigsawCascadingMenuWidth: string | number = 200;
    @Input()
    public jigsawCascadingMenuHeight: string | number = 120;
    @Input()
    public jigsawCascadingMenuMaxHeight: string | number = 120;
    @Input()
    public jigsawCascadingMenuPopupOptions: PopupOptions;
    @Output()
    public jigsawCascadingMenuSelect = new EventEmitter<SimpleNode>();

    public jigsawFloatInitData: any;

    ngOnInit() {
        super.ngOnInit();
        this.jigsawFloatTarget = JigsawMenuComponent;
    }

}
