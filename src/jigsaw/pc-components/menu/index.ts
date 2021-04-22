import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawListModule} from "../list-and-tile/list";
import {JigsawMenu, JigsawMenuHelper} from "./menu";
import {JigsawNavigationMenu} from "./navigation-menu";
import {JigsawCascadingMenu} from "../../common/directive/menu/cascading-menu";
import { JigsawTooltipModule } from 'jigsaw/common/directive/tooltip/tooltip';

@NgModule({
    declarations: [JigsawMenu, JigsawCascadingMenu, JigsawMenuHelper, JigsawNavigationMenu],
    exports: [JigsawMenu, JigsawCascadingMenu, JigsawNavigationMenu],
    imports: [JigsawListModule, CommonModule, PerfectScrollbarModule, JigsawTooltipModule]
})
export class JigsawMenuModule {
}

export * from "../../common/directive/menu/cascading-menu";
export * from "./menu";
export * from "./navigation-menu";
