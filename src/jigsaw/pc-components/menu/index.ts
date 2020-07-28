import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawListModule} from "../list-and-tile/list";
import {JigsawMenu, JigsawMenuHelper} from "./menu";
import {JigsawNavigationMenu, PopupMenuItem} from "./navigation-menu";
import {JigsawFloatModule} from "../../common/directive/float/float";
import {JigsawCascadingMenu} from "../../common/directive/menu/cascading-menu";

@NgModule({
    declarations: [JigsawMenu, JigsawCascadingMenu, JigsawMenuHelper],
    exports: [JigsawMenu, JigsawCascadingMenu],
    imports: [JigsawListModule, JigsawFloatModule, CommonModule, PerfectScrollbarModule],
    entryComponents: [JigsawMenu]
})
export class JigsawMenuModule {
}

@NgModule({
    declarations: [JigsawNavigationMenu, PopupMenuItem],
    exports: [JigsawNavigationMenu],
    imports: [CommonModule, PerfectScrollbarModule, JigsawFloatModule],
    entryComponents: [JigsawNavigationMenu]
})
export class JigsawNavigationMenuModule {
}

export * from "../../common/directive/menu/cascading-menu";
export * from "./menu";
export * from "./navigation-menu";
