import {
    Directive,
    Input,
} from "@angular/core";

import {SimpleTreeData} from "../../core/data/tree-data";
import {JigsawFloat} from "../float";
import {MenuComponent} from "./menu";
import {PopupOptions} from "../../service/popup.service";


export  type menuListSettings = {
    width?: number;
    height?: number;
    maxHeight?: number;
    disabled?: boolean;
    valid?: boolean;
    basicClass?: string;
    selectedItemsChange?: any
}

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
    public get menuData(): SimpleTreeData {
        return this.jigsawFloatInitData.menuData;
    }

    public set menuData(value: SimpleTreeData) {
        if (!this.jigsawFloatInitData) {
            this.jigsawFloatInitData = {} as any;
        }
        this.jigsawFloatInitData.menuData = value;
    }

    /*
    * menuListSettings表示菜单栏中对list的设置，包含list的输入和输出属性
    * */
    @Input()
    get menuListSettings(): menuListSettings {
        return this.jigsawFloatInitData.menuListSettings;
    }

    set menuListSettings(value: menuListSettings) {
        if (!this.jigsawFloatInitData) {
            this.jigsawFloatInitData = {} as any;
        }
        this.jigsawFloatInitData.menuListSettings = value;
    }

    @Input()
    get jigsawCascadingMenuOptions(): PopupOptions {
        return this.jigsawFloatInitData.options;
    }

    set jigsawCascadingMenuOptions(value: PopupOptions) {
        if (!this.jigsawFloatInitData) {
            this.jigsawFloatInitData = {} as any;
        }
        this.jigsawFloatInitData.options = value;
    }

    ngOnInit() {
        super.ngOnInit();
        this.jigsawFloatTarget = MenuComponent as any;
    }

}
