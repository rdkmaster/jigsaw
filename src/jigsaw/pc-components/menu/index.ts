import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawListModule} from "../list-and-tile/list";
import {JigsawMenu, JigsawMenuHelper} from "./menu";
import {JigsawNavigationMenu, PopupMenuItem} from "./navigation-menu";
import {JigsawFloatModule} from "../../common/directive/float/float";
import {JigsawCascadingMenu} from "../../common/directive/menu/cascading-menu";

@NgModule({
    declarations: [JigsawMenu, JigsawCascadingMenu, JigsawMenuHelper, JigsawNavigationMenu, PopupMenuItem],
    exports: [JigsawMenu, JigsawCascadingMenu, JigsawNavigationMenu],
    imports: [JigsawListModule, JigsawFloatModule, CommonModule, PerfectScrollbarModule]
})
export class JigsawMenuModule {
}

export * from "../../common/directive/menu/cascading-menu";
export * from "./menu";
export * from "./navigation-menu";
