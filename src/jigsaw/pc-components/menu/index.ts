import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawListModule} from "../list-and-tile/list";
import {JigsawMenu} from "./menu";
import {JigsawFloatModule} from "../../common/directive/float/index";
import {JigsawCascadingMenu} from "../../common/directive/menu/cascading-menu";

@NgModule({
    declarations: [JigsawMenu, JigsawCascadingMenu],
    exports: [JigsawMenu, JigsawCascadingMenu],
    imports: [JigsawListModule, JigsawFloatModule, CommonModule, PerfectScrollbarModule],
    entryComponents: [JigsawMenu]
})
export class JigsawMenuModule {
}

export * from "../../common/directive/menu/cascading-menu";
export * from "./menu";
