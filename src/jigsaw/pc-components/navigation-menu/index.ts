import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawFloatModule} from "../../common/directive/float";
import {JigsawNavigationMenu, PopupMenuItem} from "./navigation-menu";

@NgModule({
    declarations: [JigsawNavigationMenu, PopupMenuItem],
    exports: [JigsawNavigationMenu],
    imports: [CommonModule, PerfectScrollbarModule, JigsawFloatModule],
    entryComponents: [JigsawNavigationMenu]
})
export class JigsawNavigationMenuModule {
}

export * from "./navigation-menu";
