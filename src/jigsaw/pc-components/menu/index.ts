import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawListModule} from "../list-and-tile/list";
import {JigsawMenuComponent} from "./menu";
import {JigsawFloatModule} from "../../common/directive/float/index";
import {JigsawCascadingMenu} from "./cascading-menu";

@NgModule({
    declarations: [JigsawMenuComponent, JigsawCascadingMenu],
    exports: [JigsawMenuComponent, JigsawCascadingMenu],
    imports: [JigsawListModule, JigsawFloatModule, CommonModule, PerfectScrollbarModule],
    entryComponents: [JigsawMenuComponent]
})
export class JigsawMenuModule {
}
